const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

const secret = process.env.SECRET;
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

const handleErrors = (err) => {
  let error = { email: "", password: "", all: "" };

  if (err.code === 11000) {
    error.email = "this email already registered";
    return error;
  }

  if (err.message === "Invalid credentials") {
    error.all = "Invalid credentials";
    return error;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const findUserByEmail = await User.findOne({ email });
    if (!findUserByEmail) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = createToken(user._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      res.status(201).json({ user, token });
    } else {
      res.status(400).json({ error: "Email already exists!!" });
    }
  } catch (err) {
    console.log(err);
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user, token });
  } catch (err) {
    // const error = handleErrors(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("Cookie cleared");
};

module.exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No such email" });
    }
    const token = createToken(user._id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.APPPASS,
      },
    });
    const mailOptions = {
      from: {
        name: "FollowUp.",
        address: process.env.MYEMAIL,
      }, // sender address
      to: user.email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<a href="http://localhost:5000/reset-password/${user._id}">Reset Password</a>`,
      // text: `http://localhost:5000/reset-password/${user._id}`, // plain text body
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reset email sent" });
      } catch (error) {
        console.log(error);
      }
    };

    sendMail(transporter, mailOptions);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET, async (err, decode) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await User.findByIdAndUpdate(
          { _id: id },
          { password: hashedPass }
        );
        if (user) {
          return res.status(200).json({ message: "Password Updated" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occured" });
      }
    }
  });
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findById(id).select("-password -reminders");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.updateUser = async (req, res) => {
  const { username, email, phonenumber, slackId, _id } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id },
      { username, email, phonenumber, slackId }
    );
    if (!updateUser) {
      res.status(400).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.updatePass = (req, res) => {
  const { currentPassword, newPassword, _id } = req.body;
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SECRET, async (err, decode) => {
    const user = await User.findById({ _id });
    if (err) {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      try {
        const auth = await bcrypt.compare(currentPassword, user.password);
        if (auth) {
          const salt = await bcrypt.genSalt(10);
          const hashedPass = await bcrypt.hash(newPassword, salt);
          const updateUserPass = await User.findByIdAndUpdate(
            { _id },
            { password: hashedPass }
          );
          if (updateUserPass) {
            return res.status(200).json({ message: "Password Updated" });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occured" });
      }
    }
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.updateProfilePicture = async (req, res) => {
  const { profilePicture, _id } = req.body;
  try {
    const uploadProfilePicture = await User.findByIdAndUpdate(
      { _id },
      { profilePicture }
    );
    if (!uploadProfilePicture) {
      res.status(400).json({ message: "The picture was not uploaded." });
    }
    res.status(200).json({ message: "The ProfilePicture updated." });
  } catch (err) {
    console.log(err);
  }
};

module.exports.googleRequestUrl = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = "http://localhost:8000/api/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
};

async function getUserData(access_token) {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  return res.data;
}

module.exports.oauth = async (req, res, next) => {
  const code = req.query.code;
  console.log(code);
  try {
    const redirectURL = "http://localhost:8000/api/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const result = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(result.tokens);
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    const userData = await getUserData(user.access_token);
    try {
      const { name, picture, email } = userData;
      const findUserByEmail = await User.findOne({ email });
      if (!findUserByEmail) {
        const user = await User.create({
          username: name,
          profilePicture: picture,
          email,
        });
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: maxAge * 1000 });
        res.status(201).json({ user, token });
      }
      // res.status(201).json({user,token})
      res.status(200).json({ findUserByEmail });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } catch (error) {
    console.log("Error logging in with OAuth user", error);
  }
  // res.redirect(303, "http://localhost:5000/");
};

module.exports.getUserDetailData = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId })
      .populate("members")
      .populate("reminders");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// module.exports.getUserId = (req, res) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.status(401).json({ message: "No token,authorization denied." });
//   }
//   try {
//     jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("id", decodedToken.id);
//         res.status(200).json({ decodedToken });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports.updateUserSlackId = (req, res) => {
  const { slackId } = req.body;
  console.log(slackId);
};



// module.exports.sendUserId = (req, res) => {
//   const { _userId } = req.body;
//   userId = _userId;
//   try {
//     console.log(_userId);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error });
//   }
// };


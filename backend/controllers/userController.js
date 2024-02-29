const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

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
      const user = await User.create({ username, email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      res.status(201).json({ user, token });
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
    // const { username, email: userEmail, reminders } = user;
    // const userData = { username, userEmail, reminders };
    res.status(200).json({ user, token });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
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

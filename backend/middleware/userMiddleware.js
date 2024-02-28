const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        const user = await User.findById(decodedToken.id).select(
          "-password -reminders -createdAt -updatedAt"
        );
        // const { username, email, reminders } = user;
        // const userData = { username, email, reminders };
        if (user) {
          return res.json({ user: user, token });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

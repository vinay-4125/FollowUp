const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (!token) {
    // return res.redirect(401, "/login");
    return res.json({ message: "No token, authorization denied" });
  }
  try {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.clearCookie("token");
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      } else {
        // console.log(decodedToken);
        const user = await User.findById(decodedToken.id).select(
          "-password -reminders -createdAt -updatedAt"
        );
        // console.log("middleware!!");
        // const { username, email, reminders } = user;
        // const userData = { username, email, reminders };
        // if (user) {
        // return res.json({ user: user, token });
        req.userData = user;
        next();
        // }
      }
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied" });
  }
};

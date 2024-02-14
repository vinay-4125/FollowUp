const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
    const user = await User.create({username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

  module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).send("Cookie cleared");
};

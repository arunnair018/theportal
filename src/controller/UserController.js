"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.register = async (req, res) => {
  var newUser = new User(req.body);
  const user = await newUser.save().catch((err) => {
    res.status(400).json({ error: err.message });
  });
  if (user) {
    res.json({ status: "added successfully", user: user });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByCredentials(username, password);
  if (user.error) {
    res.status(400).json(user);
  } else {
    const token = await user.generateAuthToken();
    const username = user.username;
    const role = user.role;
    res.json({ token: token, username: username, role: role });
  }
};

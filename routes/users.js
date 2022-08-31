// import all the packages required
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const generateAccessToken = require('../helperFunctions/generate-access-token')
const generateRefreshToken = require('../helperFunctions/generate-refresh-token')
// creating express route handler
const router = express.Router();

// import the Url database model
const User = require("../models/usersModel");

//add the dotenv package
dotenv.config();

router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });
  await user.save();
  return res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  
  if (user == null) res.status(404).send("User does not exist!");

  if (await bcrypt.compare(req.body.password, user.password)) {
    const accessToken = generateAccessToken({ user: user });
    const refreshToken = generateRefreshToken({ user: user });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).send("Password Incorrect!");
  }
});

module.exports = router;

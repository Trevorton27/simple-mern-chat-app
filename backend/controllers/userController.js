const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwtService = require('../config/jwtService');
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please Enter all the Feilds');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This user already exists.');
  }

  matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  const user = await User.create({
    name,
    email,
    password,
    pic
  });

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: jwtService(user._id)
    });
  } else {
    res.status(400);
    throw new Error('This user was not found');
  }
});

module.exports = { registerUser };

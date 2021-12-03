const Users = require('../models/user');
const textToHash = require('../util/textToHashed');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res, next) => {
  const data = req.body;

  try {
    const { email, name, password } = data;

    const findUser = await Users.findOne({ email: email });
    if (findUser) {
      res.status(400).json({
        success: false,
        error: 'Student with specified email already exists!',
      });
      return;
    } else {
      const hashedPassword = textToHash(password);
      const createdUser = await Users.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: 'User account registered successfully!',
        userData: createdUser,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;

  try {
    const { email, password } = data;

    const findUser = await Users.findOne({ email });

    if (!findUser) {
      res
        .status(404)
        .json({ success: false, error: 'No user with this email found!' });
      return;
    }

    const matchPass = bcrypt.compareSync(password, findUser.password);

    if (!matchPass) {
      res
        .status(400)
        .json({ success: false, error: 'Wrong credentials entered' });
      return;
    }

    req.session.isAuth = true;
    req.session.bearerToken = 'User';

    res.status(200).json({
      success: true,
      message: 'User Logged in successfully and session created!',
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        success: true,
        message: 'Session destroyed successfully! and User logged Out',
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getConfidentialUserInfo = async (req, res, next) => {
  try {
    const getAllUsers = await Users.find();

    if (!getAllUsers) {
      res
        .status(400)
        .json({ success: false, error: 'Users Collection is empty!' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'All users fetched successfully!',
      data: getAllUsers,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

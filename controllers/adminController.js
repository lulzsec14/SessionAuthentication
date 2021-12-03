const Admin = require('../models/admin');
const textToHash = require('../util/textToHashed');
const bcrypt = require('bcryptjs');

exports.registerAdmin = async (req, res, next) => {
  const data = req.body;

  try {
    const { email, name, password } = data;

    const findAdmin = await Admin.findOne({ email: email });
    if (findAdmin) {
      res.status(400).json({
        success: false,
        error: 'Student with specified email already exists!',
      });
      return;
    } else {
      const hashedPassword = textToHash(password);
      const createdAdmin = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: 'User account registered successfully!',
        adminData: createdAdmin,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.loginAdmin = async (req, res, next) => {
  const data = req.body;

  try {
    const { email, password } = data;

    const findAdmin = await Admin.findOne({ email });

    if (!findAdmin) {
      res.status(404).json({
        success: false,
        error: 'No admin with given email exists!',
      });
      return;
    }

    const matchPass = bcrypt.compareSync(password, findAdmin.password);

    if (!matchPass) {
      res.status(400).json({
        success: false,
        error: 'Wrong credentials entered',
      });
      return;
    }

    req.session.isAuth = true;
    req.session.bearerToken = 'Admin';

    res.status(200).json({
      success: true,
      message: 'Admin logged in successfully and session created!',
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.logOutAdmin = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        success: true,
        message: 'Session destroyed successfully! and Admin logged out',
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getConfidentialAdminInfo = async (req, res, next) => {
  try {
    const getAllAdmins = await Admin.find();

    if (!getAllAdmins) {
      res.status(400).json({
        success: false,
        error: 'Admin Collection is empty!',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'All admin fetched successfully!',
      data: getAllAdmins,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

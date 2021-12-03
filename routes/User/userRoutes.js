const express = require('express');

const {
  registerUser,
  loginUser,
  getConfidentialUserInfo,
  logoutUser,
} = require('../../controllers/userController');
const { checkUser } = require('../../middleware/userMiddleware');

const userRouter = express.Router();

userRouter.route('/createUser').post(registerUser);
userRouter.route('/loginUser').post(loginUser);
userRouter
  .route('/getConfidentialUserInfo')
  .get(checkUser, getConfidentialUserInfo);
userRouter.route('/logoutUser').delete(checkUser, logoutUser);

module.exports = userRouter;

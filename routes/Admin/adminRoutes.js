const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getConfidentialAdminInfo,
  logOutAdmin,
} = require('../../controllers/adminController');
const { checkAdmin } = require('../../middleware/adminMiddleware');

const adminRouter = express.Router();

adminRouter.route('/createAdmin').post(registerAdmin);
adminRouter.route('/loginAdmin').post(loginAdmin);
adminRouter
  .route('/getConfidentialAdminInfo')
  .get(checkAdmin, getConfidentialAdminInfo);
adminRouter.route('/logoutAdmin').delete(checkAdmin, logOutAdmin);

module.exports = adminRouter;

const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  showUserProfile,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/Usercontroller");

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
 
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get( isAuthenticatedUser, showUserProfile);
router.route("/me/password/update").put( isAuthenticatedUser, updatePassword );
router.route("/me/update").put( isAuthenticatedUser, updateUserProfile );

router.route("/admin/users").get( isAuthenticatedUser, authorizeRoles("admin"), getAllUsers );
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
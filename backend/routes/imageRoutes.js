const express = require("express");
const {
  uploadImage,
  getAllImages,
  getImage,
  deleteImage,
} = require("../controllers/ImagesController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/images").get(getAllImages);
router.route("/image/new").post(isAuthenticatedUser, uploadImage);
router.route("/image/:id").get(getImage);
router.route("/image/:id").delete(isAuthenticatedUser, deleteImage);

module.exports = router;

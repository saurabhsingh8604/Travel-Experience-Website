const express = require("express");
const {
  uploadVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
} = require("../controllers/VideosController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/videos").get(getAllVideos);
router.route("/video/new").post(isAuthenticatedUser, uploadVideo);
router.route("/video/:id").get(getVideo);
router.route("/video/:id").delete(isAuthenticatedUser, deleteVideo);

module.exports = router;

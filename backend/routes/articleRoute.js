const express  = require('express');
const {
  createArticle,
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  commentArticle,
  likeArticle,
  UpvoteArticle,
  downvoteArticle,
  sharesArticle,
  saveArticle,
  getAllComments,
  deleteComment,
} = require("../controllers/articleController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/articles").get(getAllArticles);
router.route("/article/new").post(isAuthenticatedUser, createArticle);
router.route("/article/:id").get(getArticle);
router.route("/article/:id").put(isAuthenticatedUser, updateArticle);
router.route("/article/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteArticle);
router.route("/article/comment").post(isAuthenticatedUser,commentArticle)
router.route("/article/like").post( isAuthenticatedUser, likeArticle );
router.route("/article/upvote").post( isAuthenticatedUser, UpvoteArticle );
router.route("/article/downvote").post( isAuthenticatedUser, downvoteArticle );
router.route("/article/share").post( isAuthenticatedUser, sharesArticle );
router.route("/article/save").post( isAuthenticatedUser, saveArticle );

router.route("/comments").get(getAllComments).delete(isAuthenticatedUser, deleteComment );


module.exports = router
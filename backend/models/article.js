const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please enter title"],
      minlength: 3,
    },
    location: {
      type: String,
      trim: true,
      required: [true, "please give user location"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "please give city"],
    },
    author: {
      type: String,
      trim: true,
      required: [true, "please give author name"],
    },
    body: { type: String, required: true },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        avatar: {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
        name:{
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    upvote: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    downvotes: {
      type: Number,
      default: 0,
    },
    downvote: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    like: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    shares: {
      type: Number,
      default: 0,
    },
    share: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    saved: {
      type: Number,
      default: 0,
    },
    saves: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("article", articleSchema);
module.exports = Article;

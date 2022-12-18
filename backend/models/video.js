const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please enter title"],
      minlength: 3,
    },
    videos: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
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
    comments: {
      type: Number,
      default: 0,
    },
    comment: [
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", VideoSchema);
module.exports = Video;

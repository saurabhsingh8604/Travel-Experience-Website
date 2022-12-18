const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please enter title"],
      minlength: 3,
    },
    images: [
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

const Image = mongoose.model("image", ImageSchema);
module.exports = Image;

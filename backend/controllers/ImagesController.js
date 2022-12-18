const Image = require("../models/image");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");
const isAuthenticatedUser = require("../middleware/auth");
const User = require("../models/user");

// upload a image
exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof(req.body.images) === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      overwrite: true,
      invalidate: true,
      folder: "Images",
      width: 800,
      height: 500,
      crop: "scale",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const image = await Image.create(req.body);
  res.status(201).json({
    success: true,
    image,
  });
});

//get all images
exports.getAllImages = catchAsyncErrors(async (req, res, next) => {
  const imagesPerPage = 8;
  const imagesCount = await Image.countDocuments();

  const apifeature = new ApiFeatures(Image.find(), req.query).search().filter().pagination(imagesPerPage);
  const images = await apifeature.query;

  res.status(200).json({
    success: true,
    images,
    imagesPerPage,
    imagesCount,
  });
});

//get single image
exports.getImage = catchAsyncErrors(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(
      new ErrorHandler(`image does not exists with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    image,
  });
});

//Delete image
exports.deleteImage = catchAsyncErrors(async (req, res, next) => {
  //we will remove cloudinary later

  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(
      new ErrorHandler(`image does not exists with Id: ${req.params.id}`, 400)
    );
  }

  await image.remove();

  res.status(200).json({
    success: true,
    message: "image deleted successfully",
  });
});

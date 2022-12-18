const Video = require("../models/video");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");

// upload a Video
exports.uploadVideo = catchAsyncErrors(async (req, res, next) => {
 let videos = [];

 if (typeof req.body.videos === "string") {
   videos.push(req.body.videos);
 } else {
   videos = req.body.videos;
 }
 const videosLinks = [];

 for (let i = 0; i < videos.length; i++) {
   const result = await cloudinary.v2.uploader.upload(
     videos[i],
     {
       resource_type: "video",
       folder: "Videos",
     },
     function (error, result) {
       console.log(result, error);
     }
   );
   videosLinks.push({
     public_id: result.public_id,
     url: result.secure_url,
   });
 }
 req.body.videos = videosLinks;
 req.body.user = req.user.id;

 const video = await Video.create(req.body);
 res.status(201).json({
   success: true,
   video,
 });
});

//get all Videos
exports.getAllVideos = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const videos = await Video.find();

  res.status(200).json({
    success: true,
    videos,
    resultPerPage
  });
});

//get single Video
exports.getVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return next(
      new ErrorHandler(`Video does not exists with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    video,
  });
});

//Delete Video
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  //we will remove cloudinary later

  const video = await Video.findById(req.params.id);

  if (!video) {
    return next(
      new ErrorHandler(`Video does not exists with Id: ${req.params.id}`, 400)
    );
  }

  await video.remove();

  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  });
});

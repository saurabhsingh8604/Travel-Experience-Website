//user credentials user ki details ,user service user APIs
const User = require("../models/user");
require("dotenv").config({ path: "backend/config/config.env" });
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');

const cloudinary = require('cloudinary')

// Register a user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:500,
        crop:"scale",
    })
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        user:req.user,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });
    sendToken(user,201,res);
});

//Login user
exports.loginUser = catchAsyncErrors( async (req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and password",400))

    }

    const user  = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))

    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))

    }

   sendToken(user, 200, res);
})

//Logout User
exports.logoutUser = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})

//Forget Password
exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));

    }

    //get resetPassword token
    const resetToken = user.getresetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your Password reset token is : \n\n ${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it`;

    try{

        await sendEmail({
            email:user.email,
            subject:`Travel Expriences password recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordUrl = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }
})

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
    const resetPasswordToken = await crypto.createHash("sha256").update(req?.params?.token).digest("hex");

    const user  = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expires",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordUrl = undefined;
    await user.save();

    sendToken(user,200,res);
})

// show user details
exports.showUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const user  = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })
})


//update Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user  = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword) ;

    if (!isPasswordMatched) {
      return next(new ErrorHandler("old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
})


//update User Profile
exports.updateUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        // avatar:req?.body?.avatar,
        // password:req.body.password,
    }

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 500,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators: true,
        userFindAndModify:false,
    })

    res.status(200).json({
        success:true,
    })
})


//get all users
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    })
})


//get single user (admin)
exports.getUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exists with Id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success:true,
        user,
    })
})


//Delete user (admin)
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    //we will remove cloudinary later

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exists with Id: ${req.params.id}`,400))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"user deleted successfully",
    })
})


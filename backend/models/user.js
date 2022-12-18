const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "please give email id"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid emial"],
  },
  password: {
    type: String,
    required: [true, "please give password"],
    minlength: [8, "password should be greater than 8 characters"],
    select: false,
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
  role: {
    type: String,
    default: "user",
  },
  usersImages: [
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
  usersVideos: [
    {
      videosrc: String,
    },
  ],
  usersArticles: [
    {
      articleId: mongoose.Schema.ObjectId,
    },
  ],
  likedArticles: [
    {
      articleId: mongoose.Schema.ObjectId,
    },
  ],
  savedArticles: [
    {
      articleId: mongoose.Schema.ObjectId,
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
})


// JWT token
userSchema.methods.getJWTToken = function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  })
} 


//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
} 

// generating password resset tokem
userSchema.methods.getresetPasswordToken = function (){
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 15*60*1000;

  return resetToken;
}

const User = mongoose.model("user", userSchema);
module.exports = User;

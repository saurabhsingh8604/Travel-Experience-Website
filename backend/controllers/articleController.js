const Article = require("../models/article");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const isAuthenticatedUser = require('../middleware/auth');
const User = require("../models/user");


// create article
exports.createArticle = catchAsyncErrors(async (req, res, next) => {
    
  const article = await Article.create(req.body);

  const user = await User.findById(req.user._id);

  user.usersArticles.push({ articleId:article._id });
  await user.save({ validatorBeforeSave: false });

  res.status(201).json({
    success: true,
    article,
  });
});

// get all articles
exports.getAllArticles = catchAsyncErrors(async (req, res,next) => {
  const articlesPerPage = 8;
  const articlesCount = await Article.countDocuments();

  const apifeature = new ApiFeatures(Article.find(), req.query)
    .search()
    .filter()
    .pagination(articlesPerPage);

  const articles = await apifeature.query;

  res.status(200).json({
    success: true,
    articles,
    articlesPerPage,
    articlesCount,
  });
});

// get article by id one by one
exports.getArticle = catchAsyncErrors(async (req, res, next) => {
  let article = await Article.findById(req.params.id);

  if (!article) {
    return next(new ErrorHandler("Article not found", 404));
  }
  res.status(200).json({
    success: true,
    article,
  });
});

// update article
exports.updateArticle = catchAsyncErrors(async (req, res, next) => {
  let article = await Article.findById(req.params.id);

  if (!article) {
    return next(new ErrorHandler("Article not found", 500));
  }

  article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    article,
  });
});

// delete article
exports.deleteArticle = catchAsyncErrors(async (req, res, next) => {
  let article = await Article.findById(req.params.id);

  if (!article) {
    return next(new ErrorHandler("Article not found", 404));
  }

  await article.remove();

  res.status(200).json({
    success: true,
    message: "article deleted",
  });
});


// give comment to article
exports.commentArticle = catchAsyncErrors(async (req, res, next) => {
  
    const { articleId, comment } = req.body;
    const newComment = {
      user: req.user._id,
      avatar:req.user.avatar,
      name:req.user.name,
      comment,
    }; 

    const article = await Article.findById(articleId);

    article.comments.push(newComment);

    await article.save({validatorBeforeSave:false});

    res.status(200).json({
      success:true,
      message:"commented"
    })
});

// upvote article
exports.UpvoteArticle = catchAsyncErrors(async (req, res, next) => {

  const {articleId } = req.body;

  const article = await Article.findById(articleId);

  const isupvoted = article.upvote.find(
    (up) => up.user.toString() === req.user._id.toString()
  )

  if(!isupvoted){
    article.upvote.push({
      user:req.user._id
    })
    article.upvotes = article.upvote.length;
    article.rating += 1; 
  }

  await article.save({validatorBeforeSave:false});
  res.status(200).json({
    success: true,
    message: "upvoted",
  });
});

// downvote article
exports.downvoteArticle = catchAsyncErrors(async (req, res, next) => {

  const {articleId } = req.body;

  const article = await Article.findById(articleId);

  const isdownvoted = article.downvote.find(
    (down) => down.user.toString() === req.user._id.toString()
  )

  if(!isdownvoted){
    article.downvote.push({
      user:req.user._id
    })
    article.downvotes = article.downvote.length;
     article.rating -= 2; 
  }
 

  await article.save({validatorBeforeSave:false});
  res.status(200).json({
    success: true,
    message: "downvoted",
  });
});

// like article
exports.likeArticle = catchAsyncErrors(async (req, res, next) => {

  const { articleId } = req.body;

  const article = await Article.findById(articleId);

  const isliked = article.like.find(
    (e) => e.user.toString() === req.user._id.toString()
  );

  if (!isliked) {
    article.like.push({
      user: req.user._id,
    });
    article.likes = article.like.length;
    article.rating += 1;

    const user = await User.findById(req.user._id);

    user.likedArticles.push({articleId});
    await user.save({ validatorBeforeSave: false });
  }
  

  await article.save({ validatorBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "liked",
  });
});

// saved article
exports.saveArticle = catchAsyncErrors(async (req, res, next) => {

  const { articleId } = req.body;

  const article = await Article.findById(articleId);

  const issaved = article.saves.find(
    (e) => e.user.toString() === req.user._id.toString()
  );

  if (!issaved) {
    article.saves.push({
      user: req.user._id,
    });
    article.saved = article.saves.length;
    
    const user = await User.findById(req.user._id);

    user.savedArticles.push({articleId});
    await user.save({ validatorBeforeSave: false });
  }

  await article.save({ validatorBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "saved",
  });
});

// shared article
exports.sharesArticle = catchAsyncErrors(async (req, res, next) => {

 
  const { articleId } = req.body;

  const article = await Article.findById(articleId);

  const isshared= article.share.find(
    (e) => e.user.toString() === req.user._id.toString()
  );

  if (!isshared) {
    article.share.push({
      user: req.user._id,
    });
    article.shares = article.share.length;
  }

  await article.save({ validatorBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "shared",
  });
});


// get all comments 
exports.getAllComments = catchAsyncErrors(async (req,res,next)=>{
  const article = await Article.findById(req.query.id);

  if(!article){
    return next(new ErrorHandler("Article not found",404));
  
  }

  res.status(200).json({
    success:true,
    comments:article.comments,
  })
})

// delete comments 
exports.deleteComment = catchAsyncErrors(async (req,res,next)=>{
  const article = await Article.findById(req.query.articleid);

  if(!article){
    return next(new ErrorHandler("Article not found",404));
  
  }

  const comments = article.comments.filter((com )=> com._id.toString()!==req.query.id.toString())

  await Article.findByIdAndUpdate(req.query.articleid, {
    comments,
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true, 
    comments:article.comments,
  })
})
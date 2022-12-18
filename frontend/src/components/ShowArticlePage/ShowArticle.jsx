import React, { useState } from 'react'
import Headings from '../HomePage/Headings'
import './ShowArticle.css'
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getArticle, newcomment, newdownvote, newlike, newsave, newshare, newupvote } from "../../actions/articleAction";
import { useMatch, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import {clearErrors} from "../../actions/articleAction";
import { NEW_COMMENT_RESET } from '../../contants/articleConstants';
import {Button} from "@mui/material";
import "react-share";

import '../HomePage/Header.css'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailShareButton,

  // Comment to sepaate, overwriting codesandbox behavior
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  WhatsappIcon,
  EmailIcon,

  FacebookShareCount,
  GooglePlusShareCount,
  PinterestShareCount,
  VKShareCount,
  WhatsappShareCount,
  LinkedinShareCount,
  TwitterShareCount,
  EmailShareCount,

} from "react-share"; // https://github.com/nygardk/react-share/


const ShowArticle = () => { 
  const dispatch = useDispatch();
  const alert = useAlert();
  let match = useMatch("/article/:id");

  const {error,article, loading} = useSelector(
    (state) => state.articleDetails
  );

  const {
    error: commentError,
    success,
  } = useSelector((state) => state.newComment);
  
  const [comment, setcomment] = useState("");
  const [upvote, setupvote] = useState(article.upvotes);
  const [downvote, setdownvote] = useState(article.downvotes);
  const [share, setshare] = useState(article.shares);
  const [like, setlike] = useState(article.likes);
  const [save, setsave] = useState(article.saved);
  const [open, setOpen] = useState(false);

const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true);
};
  const history = useNavigate();

  const addCommentHandler= ()=>{
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    myForm.set("comment",comment);

    dispatch(newcomment(myForm));
  }
  const upvoteHandler= (e)=>{
    if (e.target.style.color === "rgb(27, 113, 243)") {
      e.target.style.color = "rgba(0, 0, 0, 0.716)";
    } else {
      e.target.style.color = "rgb(27, 113, 243)";
    }
    setupvote(upvote+1);
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    dispatch(newupvote(myForm));
    history(`/article/${match.params.id}`);
  }
  const downvoteHandler= (e)=>{
    if (e.target.style.color === "rgb(27, 113, 243)") {
      e.target.style.color = "rgba(0, 0, 0, 0.716)";
    } else {
      e.target.style.color = "rgb(27, 113, 243)";
    }
    setdownvote(downvote + 1);
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    dispatch(newdownvote(myForm));
    history(`/article/${match.params.id}`);
  }
  const shareHandler= (e)=>{
    if (e.target.style.color === "rgb(196, 138, 2)") {
      e.target.style.color = "rgba(0, 0, 0, 0.716)";
    } else {
      e.target.style.color = "rgb(196, 138, 2)";
    }
    setshare(share + 1);
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    dispatch(newshare(myForm));
    history(`/article/${match.params.id}`);
  }
  const saveHandler= (e)=>{
    if (e.target.style.color === "rgb(27, 113, 243)") {
      e.target.style.color = "rgba(0, 0, 0, 0.716)";
    } else {
      e.target.style.color = "rgb(27, 113, 243)";
    }
    setsave(save + 1);
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    dispatch(newsave(myForm));
    history(`/article/${match.params.id}`);
  }
  
  const likeHandler= (e)=>{
    if (e.target.style.color === "red") {
        e.target.style.color = "rgba(0, 0, 0, 0.716)";
    }else{
      e.target.style.color = "red";
    }
    setlike(like + 1);
    const myForm = new FormData();
    myForm.set("articleId",match?.params?.id);
    dispatch(newlike(myForm));
    history(`/article/${match.params.id}`);
  }

  const shareLink = `http://localhost:3000/article/${match.params.id}`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (commentError) {
      alert.error(commentError);
      dispatch(clearErrors());
    }
    history(`/article/${match.params.id}`);
    if(success){
      alert.success("Comment Added Successfully")
      dispatch({type:NEW_COMMENT_RESET});
    }
    dispatch(getArticle(match.params.id));
  }, [dispatch, match?.params?.id,history,error,commentError,alert,success]); 

  // const mySafeHTML = DOMPurify.sanitize(article.body);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="showarticle_div">
            <Headings title={article.title} />
            <div className="article_detials">
              <div className="left">
                <p className="location">Location : {article.location}</p>
                <p className="city">City : {article.city}</p>
              </div>
              <div className="right">
                <p className="author" style={{ textAlign: "right" }}>
                  Author : {article.author}
                </p>
                <p className="date" style={{ textAlign: "right" }}>
                  Date : {article?.createdAt?.substr(0, 10)}
                </p>
              </div>
            </div>
            <div
              className="article_div"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
            <div className="article_footer">
              <div className="up_down_vote">
                <div onClick={upvoteHandler}>
                  <i
                    style={{ fontSize: "150%" }}
                    className="fa-solid fa-chevron-up article_icons"
                    id="article_save"
                  ></i>
                  <p>{upvote}</p>
                </div>
                <div onClick={downvoteHandler}>
                  <i
                    style={{ fontSize: "150%" }}
                    className="fa-solid fa-chevron-down article_icons"
                    id="article_save"
                  ></i>
                  <p>{downvote}</p>
                </div>
              </div>
              <div className="like_sare_save">
                <div
                  onClick={() => {
                    shareHandler();
                    submitReviewToggle();
                  }}
                  className="article_icons"
                  id="article_post"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <i
                    className="fa-solid fa-share"
                    style={{ fontSize: "2.2rem" }}
                  ></i>
                  {/* <p style={{ fontSize: "1.5rem" }}>{share}</p> */}
                </div>
                <div
                  className="article_icons"
                  id="article_like"
                  onClick={likeHandler}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <i
                    className="fa-solid fa-heart"
                    style={{ fontSize: "2rem" }}
                  ></i>
                  {/* <p style={{ fontSize: "1.5rem" }}>{like}</p> */}
                </div>
                <div
                  className="article_icons"
                  id="article_save"
                  onClick={saveHandler}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <i
                    className="fa-solid fa-bookmark"
                    style={{ fontSize: "2rem" }}
                  ></i>
                  {/* <p style={{ fontSize: "1.5rem" }}>{save}</p> */}
                </div>
              </div>
            </div>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Share Article</DialogTitle>
              <DialogContent
                className="submitDialog"
                style={{ padding: "2rem", display: "flex", gap: "2rem" }}
              >
                <FacebookShareButton
                  url={shareLink}
                  title={article.title}
                  className="network__share-button"
                >
                  <FacebookIcon size={"4rem"} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareLink}
                  title={article.title}
                  className="network__share-button"
                >
                  <TwitterIcon size={"4rem"} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={shareLink}
                  title={article.title}
                  separator=":: "
                  className="network__share-button"
                >
                  <WhatsappIcon size={"4rem"} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  url={shareLink}
                  title={article.title}
                  windowWidth={750}
                  windowHeight={600}
                  className="network__share-button"
                >
                  <LinkedinIcon size={"4rem"} round />
                </LinkedinShareButton>
                {/* <PinterestShareButton
                url={String(window.location)}
                media={`${shareImage}`}
                windowWidth={1000}
                windowHeight={730}
                className="network__share-button"
              >
                <PinterestIcon size={"2rem"} round />
              </PinterestShareButton> */}
                 <EmailShareButton
                  url={shareLink}
                  subject={article.title}
                  body="body"
                  className="network__share-button"
                >
                  <EmailIcon size={"4rem"} round />
                </EmailShareButton>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={submitReviewToggle}
                  color="secondary"
                  style={{ fontSize: "larger" }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog> 
            <div className="comment_section">
              <h2 style={{ fontSize: "250%" }}>Comments</h2>
              <div className="add_comment">
                <input
                  className="comment_input"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  type="text"
                />
                <Button id="comment_btn" onClick={addCommentHandler}>
                  Add Comment
                </Button>
              </div>
              <div className="comment_block">
                {article.comments &&
                  article.comments.map((com) => (
                    <div className="comment_div">
                      <img
                        class="comment_profile_images"
                        src={com?.avatar?.url}
                        alt="avatar"
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <h3>{com.name}</h3>
                        <p style={{ fontSize: "120%" }}>{com.comment}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ShowArticle
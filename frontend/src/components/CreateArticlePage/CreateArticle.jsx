import React, { useState, useRef, useEffect } from "react";
import './CreateArticle.css';
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import {Button} from '@mui/material'
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createarticle } from "../../actions/articleAction";
import { useAlert } from "react-alert";

import DOMPurify from "dompurify";
import { NEW_ARTICLE_RESET } from "../../contants/articleConstants";
import ShowUploadImages from "./ShowUploadImages";
import ShowUploadVideos from "./ShowUploadVideos"

const CreateArticle = () => {
 const [value, setValue] = useState("");
const dispatch = useDispatch();
const alert = useAlert();
const { error, loading, success } = useSelector((state) => state.newArticle);

const [title,setTitle] = useState("")
const [location,setLocation] = useState("")
const [city,setCity] = useState("")
const [author,setAuthor] = useState("")
const history = useNavigate();

useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }

  if(success){
    alert.success("Article posted successfully");
    history("/account");
    dispatch({type:NEW_ARTICLE_RESET});
  }
}, [dispatch, alert, error, history, success]);


 const getValue = (value) => {
   setValue(value);
 };
const myHTML = "<h1>John Doe</h1>";
const mySafeHTML = DOMPurify.sanitize(myHTML);

 const createArticleSubmitHandler=(e)=>{
  e.preventDefault();
  const myForm = new FormData();

  myForm.set("title", title);
  myForm.set("location", location);
  myForm.set("city", city);
  myForm.set("author", author);
  myForm.set("body", value);

  dispatch(createarticle(myForm));

 }

 
const [showarticle, setshowarticle] = useState(true);
const [showuploadimage, setshowuploadimage] = useState(false);
const [showuploadvideo, setshowuploadvideo] = useState(false);

  return (
    <>
      <div className="create_container">
        <div className="create_options">
          <Button
            style={{
              color: "black",
              width: "15rem",
              height: "4rem",
              fontSize: "larger",
              border: "none",
              borderBottom: showarticle ? "5px solid #137DAA" : "none",
              borderRadius: "0",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              setshowarticle(true);
              setshowuploadimage(false);
              setshowuploadvideo(false);
            }}
            disabled={loading ? true : false}
          >
            Create Article
          </Button>
          <Button
            style={{
              color: "black",
              width: "15rem",
              height: "4rem",
              fontSize: "larger",
              border: "none",
              borderBottom: showuploadimage ? "5px solid #137DAA" : "none",
              borderRadius: "0",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              setshowarticle(false);
              setshowuploadimage(true);
              setshowuploadvideo(false);
            }}
            disabled={loading ? true : false}
          >
            Upload Images
          </Button>
          <Button
            style={{
              color: "black",
              width: "15rem",
              height: "4rem",
              fontSize: "larger",
              border: "none",
              borderBottom: showuploadvideo ? "5px solid #137DAA" : "none",
              borderRadius: "0",
              transition: "all 0.3s ease",
            }}
            onClick={() => {
              setshowarticle(false);
              setshowuploadimage(false);
              setshowuploadvideo(true);
            }}
            disabled={loading ? true : false}
          >
            Upload Videos
          </Button>
        </div>
        <div className="content_container">
          {showarticle ? (
            <form
              className="createArtcileForm"
              encType="multipart/form-data"
              onSubmit={createArticleSubmitHandler}
            >
              <div className="img_and_form">
                <div className="create_img_div">
                  <img
                    className="create_img"
                    src="/images/createIllustration.svg"
                    alt="create_illustration"
                  />
                </div>
                <div className="input_field_form">
                  <div className="input_row">
                    <label >Title:</label>
                    <input
                      className="create_inputs"
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter Title of your Article"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input_row">
                    <label >Location/Monument:</label>
                    <input
                      className="create_inputs"
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Enter Location/Monument name"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input_row">
                    <label>City:</label>
                    <input
                      className="create_inputs"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input_row">
                    <label >Author:</label>
                    <input
                      className="create_inputs"
                      type="text"
                      name="author"
                      id="author"
                      placeholder="Enter Author's name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text_editor_container">
                <div>
                  <div
                    // className="col-md-6"
                    style={{ marginTop: "60px" }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "larger",
                        marginBottom: "20px",
                      }}
                    >
                      <h3>Rich Text Editor</h3>
                    </div>
                    <div className="textediteonctainer">
                      <RichTextEditor
                        initialValue=""
                        getValue={getValue}
                        placeholder={"start typing"}
                      />
                    </div>

                    <br />
                    {/* <div>{value}</div> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
                  </div>
                </div>
                <Button
                  id="createArticleBtn"
                  style={{
                    background: "#137DAA",
                    color: "white",
                    width: "15rem",
                    height: "4rem",
                    border: "none",
                    fontSize: "larger",
                    borderRadius: "0.5rem",
                  }}
                  type="submit"
                  disabled={loading ? true : false}>
                  POST
                </Button>
              </div>
            </form>
          ) : null}
          {showuploadimage ? <ShowUploadImages /> : null}
          {showuploadvideo ? <ShowUploadVideos /> : null}
        </div>
      </div>
    </>
  );
}

export default CreateArticle





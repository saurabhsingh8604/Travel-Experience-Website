import React, { useEffect, useState } from "react";
import "./ShowUploadVideos.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createvideo } from "../../actions/videoActions";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NEW_VIDEO_RESET } from "../../contants/videoConstants";

const ShowUploadVideos = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newvideo);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [author, setAuthor] = useState("");
  const [videos, setVideos] = useState([]);
  const [videosPreview, setVideosPreview] = useState([]);

  const history = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Videos Uploaded Successfully");
      history("/account");
      dispatch({ type: NEW_VIDEO_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createVideoSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("location", location);
    myForm.set("city", city);
    myForm.set("author", author);

    videos.forEach((video) => {
      myForm.append("videos", video);
    });
    dispatch(createvideo(myForm));
  };

  const createProductVideosChange = (e) => {
    const files = Array.from(e.target.files);

    setVideos([]);
    setVideosPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setVideosPreview((old) => [...old, reader.result]);
          setVideos((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="create_article_div">
        <div className="uploadImages_top_container">
          <div className="create_img_div">
            <img
              className="create_vid"
              src="/images/uploadVideosIllustration.svg"
              alt="create_illustration"
            />
          </div>

          <div className="create_form">
            <form
              className="createArticleForm"
              encType="multipart/form-data"
              onSubmit={createVideoSubmitHandler}
            >
              <div className="input_row">
                <label for="title">Title:</label>
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
                <label for="location">Location/Monument:</label>
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
                <label for="city">City:</label>
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
                <label for="author">Author:</label>
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
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="video/*"
                  onChange={createProductVideosChange}
                  multiple
                />
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
                  marginBottom: "10px",
                }}
                type="submit"
                disabled={loading ? true : false}
              >
                POST
              </Button>
            </form>
          </div>
        </div>
        <div id="createProductFormVideo">
          {videosPreview.map((video, index) => (
            <video controls key={index} src={video} alt="Product Preview" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowUploadVideos;

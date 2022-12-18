import React, { useEffect, useState } from "react";
import "./ShowUploadImages.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createimage } from "../../actions/imageAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NEW_IMAGE_RESET } from "../../contants/imageConstants";

const ShowUploadImages = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newimage);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const history = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Images Uploaded Successfully");
      history("/account");
      dispatch({ type: NEW_IMAGE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createImageSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("location", location);
    myForm.set("city", city);
    myForm.set("author", author);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createimage(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
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
              className="create_img"
              src="/images/uploadImagesIllustration.svg"
              alt="create_illustration"
            />
          </div>

          <div className="create_form">
            <form
              className="uploadArticleForm"
              encType="multipart/form-data"
              onSubmit={createImageSubmitHandler}
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
                  accept="image/*"
                  onChange={createProductImagesChange}
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
        <div id="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Product Preview" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowUploadImages;

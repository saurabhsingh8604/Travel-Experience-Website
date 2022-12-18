import React, { useEffect, useState } from "react";
import Headings from "../HomePage/Headings";
import FilterPannel from "../TravelExperiencePage/FilterPannel";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { clearErrors } from "../../actions/userAction";
import { getAllimages } from "../../actions/imageAction";
import "./VideoGallery.css";

const VideoGallery = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);

  const [city, setcity] = useState("");
  const setCity = (e) => {
    setcity(e);
  };

  const [location, setlocation] = useState("");
  const setLocation = (e) => {
    setlocation(e);
  };
  const [rating, setrating] = useState(-100000);
  const setRating = (e) => {
    setrating(e);
  };

  const { loading, error, videos } = useSelector((state) => state.videos);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  let match = useMatch("/videos/:keyword");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getAllimages(match?.params?.keyword, currentPage, city, location, rating)
    );
  }, [
    dispatch,
    error,
    alert,
    match?.params?.keyword,
    currentPage,
    city,
    location,
    rating,
  ]);

  return (
    <>
      <div className="video_gallery_div">
        <div className="video_gallery">
          {/* {videos?.map((video) =>
            video?.videos?.map((vid) => (
              <a href={vid?.url} target="__prashant">
                <img className="gal_img" src={vid?.url} alt="img1" />
              </a>
            ))
          )} */}
          <div className="videos">
            <iframe
              width="380"
              height="250"
              src="https://www.youtube.com/embed/49HTIoCccDY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="videos">
            <iframe
              width="380"
              height="250"
              src="https://www.youtube.com/embed/lR6F_Edxabw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="videos">
            <iframe
              width="380"
              height="250"
              src="https://www.youtube.com/embed/t3YWyzcq4Mo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          {/* <video
            controls
            className="videos"
            src="images/tajmahal.mp4"
            alt="video1"
          />
          <video
            controls
            className="videos"
            src="images/redfort.mp4"
            alt="video2"
          />
          <video
            controls
            className="videos"
            src="images/hawamahal.mp4"
            alt="video3"
          /> */}
        </div>
      </div>
    </>
  );
};

export default VideoGallery;

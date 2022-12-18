import React, { useEffect, useState } from "react";
import Headings from "../HomePage/Headings";
import FilterPannel from "../TravelExperiencePage/FilterPannel";
import VideoGallery from "../HomePage/VideoGallery";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { clearErrors } from "../../actions/userAction";
import { getAllimages } from "../../actions/imageAction";

const TravelVideos = () => {
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

  const { loading, error, videos,} = useSelector(
    (state) => state.videos
  );

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
      <Headings title="Travel Videos" />
      <FilterPannel />
      <div style={{ marginTop: "5rem" }}></div>
        <VideoGallery />
    </>
  );
};

export default TravelVideos;

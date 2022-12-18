import React, { useEffect, useState } from 'react'
import Headings from '../HomePage/Headings'
import FilterPannel from '../TravelExperiencePage/FilterPannel'
import ImageGallery from '../HomePage/ImageGallery'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { clearErrors } from '../../actions/userAction';
import { getAllimages } from '../../actions/imageAction';
import Pagination from "react-js-pagination";

const TravelImages = () => {
  const alert = useAlert();
  const dispatch = useDispatch ();
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

  const { loading, error, images, imagesPerPage, imagesCount } =
    useSelector((state) => state.images);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  let count = 0;
  
  images?.map((image)=>(
    count += image.images.length
  ))

  let match = useMatch("/images/:keyword");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getAllimages(
        match?.params?.keyword,
        currentPage,
        city,
        location,
        rating
      )
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
      <div className="travelimages_div" style={{marginTop:"10rem"}}>
        <Headings title="Travel Images" />
        <FilterPannel
          setCity={setCity}
          setLocation={setLocation}
          setRating={setRating}
        />
        <div style={{ marginTop: "5rem" }}>
          <div className="images_gallery_div">
            <div className="images_gallery">
              {images?.map((image) =>
                image?.images?.map((imag) => (
                  <a href={imag?.url} target="__prashant">
                    <img className="gal_img" src={imag?.url} alt="img1" />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
        {/* <ImageGallery
        images={images}
        imagesPerPage={imagesPerPage}
        imagesCount={imagesCount}
      /> */}

        {/* {imagesPerPage < count && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={imagesPerPage}
            totalItemsCount={count}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )} */}
      </div>
    </>
  );
};

export default TravelImages
import React, { useState } from "react";
import "./TravelExperience.css";
import Headings from "../HomePage/Headings";
import FilterPannel from "./FilterPannel";
import { Fragment, useEffect } from "react";
import { clearErrors, getAllArticles } from "../../actions/articleAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ArticlePost from "./ArticlePost";
import Loader from "../layout/Loader/Loader";
import { useMatch } from "react-router-dom";
import Pagination from "react-js-pagination";

const TravelExperience = () => {
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

  const { loading, error, articles, articlesPerPage, articlesCount } =
    useSelector((state) => state.articles);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  let match = useMatch("/experience/:keyword");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getAllArticles(
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
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        <div className="travelexp_div">
          <Headings title="Travel Experience" />
          <FilterPannel
            setCity={setCity}
            setLocation={setLocation}
            setRating={setRating}
          />
          <div className="Articles">
            {/* <ArticlePost
            title="Taj MAHAL"
            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          /> */}
            {articles &&
              articles.map((article) => (
                <ArticlePost key={article._id} article={article} />
              ))}
          </div>

          {articlesPerPage < articlesCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={articlesPerPage}
                totalItemsCount={articlesCount}
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
          )}
        </div>
      </Fragment>
      {/* )} */}
    </>
  );
};

export default TravelExperience;

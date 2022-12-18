import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/experience/${keyword}`);
    } else {
      history("/experience");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a article ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;

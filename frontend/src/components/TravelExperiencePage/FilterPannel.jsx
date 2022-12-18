import React, { useState } from "react";
import './FilterPannel.css'

const FilterPannel = (props) => {

  const [CITY, setCITY] = useState("Select City");
  const [LOC, setLOC] = useState("");
  const [RAT, setRAT] = useState("");

  const SetCityvalue=(val)=>{
    setCITY(val)
    props.setCity(val);
  }
  const SetLocationvalue = (val) => {
    setLOC(val)
    props.setLocation(val);
  };
  const SetRatingvalue = (val) => {
    setRAT(val)
    props.setRating(val);
  };
  return (
    <>
      <div className="filter_div">
        <h2 style={{ fontSize: "200%", fontWeight: "300" }}>Filters :</h2>
        <select
          className="filters"
          id="city"
          name="city"
          placeholder={CITY}
          value={CITY}
          onChange={(e) => {
            SetCityvalue(e.target.value);
          }}
        >
          <option value="" selected>
            Select City
          </option>
          <option value="Agra">Agra</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Konark">Konark</option>
          <option value="Jaipur">Jaipur</option>
        </select>
        <select
          className="filters"
          id="location"
          name="location"
          value={LOC}
          onChange={(e) => {
            SetLocationvalue(e.target.value);
          }}
        >
          <option value="" selected>
            Select Location
          </option>
          <option value="Taj Mahal">Taj Mahal</option>
          <option value="Red Fort">Red Fort</option>
          <option value="Sun Temple">Sun Temple</option>
          <option value="Golden Temple">Golden Temple</option>
        </select>
        <select
          className="filters"
          id="rating"
          name="rating"
          value={RAT}
          onChange={(e) => {
            SetRatingvalue(e.target.value);
          }}
        >
          <option value="0" selected>
            Select Ratings
          </option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
    </>
  );
};

export default FilterPannel;

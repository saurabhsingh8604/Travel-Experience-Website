import React from 'react'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <>
        <div className="landing_div">
          <img
            src="images/landing_image.jpg"
            alt=""
            srcset=""
            className="landing_image"
          />
          <div className="skewed"></div>
        </div>
        <div className="quote">
          <div className="quote_heading">
            <h2>
              “We take photos as a return ticket to a moment otherwise gone”
            </h2>
            <p>– Katie Thurmes</p>
          </div>
        </div>
    </>
  );
}

export default LandingPage
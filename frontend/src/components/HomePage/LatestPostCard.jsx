import React from 'react'
import Button from './Button'
import './Latest_post_card.css'
import { Link } from 'react-router-dom'

const LatestPostCard = (props) => {
  return (
    <>
      <div className="card_div">
        <div className="card_content_div">
          <img
            className="card_image"
            src={props?.imgsrc}
            width="500px"
            height="210px"
            crop="scale"
            alt="tajmahal"
          />
          <div className="card_content">
            <h2 className="title">{props.title}</h2>
            <p className="desc">{props.desc}</p>
            <Link to={`/article/${props._id}`}>
              <Button name="Explore" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestPostCard;
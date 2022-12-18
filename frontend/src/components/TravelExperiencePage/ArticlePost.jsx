import React from "react";
import Button from "../HomePage/Button";
import "../HomePage/Latest_post_card.css";
import './ArticlePost.css'
import {Link} from "react-router-dom";

const ArticlePost = ({article}) => {

  const str = article?.body;
  const el = document.createElement("html");
  el.innerHTML = str;
  const im = el.getElementsByTagName("img");

  return (
    <>
      <div className="card_div">
        <Link to={`/article/${article._id}`} className="card_content_div">
          <img
            className="card_image"
            src={im[0]?.src}
            width="500px"
            height="210px"
            crop="scale"
            alt="tajmahal"
          />
          <div className="card_content">
            <h2 className="title">{article?.location}</h2>
            <p className="desc">{article?.body?.replace(/<[^>]+>/g, "")}</p>

            <Button
              className="read_full_article_btn"
              name="Read Full Article"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ArticlePost;

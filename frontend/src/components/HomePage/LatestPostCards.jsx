import React from 'react'
import { useSelector } from 'react-redux';
import LatestPostCard from './LatestPostCard'

const LatestPostCards = ({articles,articlesCount}) => {
  let images = [];
  articles?.map((article,index)=>{
    const str = article.body;
    const el = document.createElement("html");
    el.innerHTML = str;
    const im = el.getElementsByTagName("img");
    images.push(im[0]?.src);
  })
  return (
    <div style={{ display: "flex", flexDirection: "row", margin:"auto", width:"100vw"}}>
      <div
        style={{
          width:"100vw",
          display: "flex",
          flexDirection: "row",
          flexWrap:"wrap",
          margin: "auto",
          justifyContent:"center",
          alignItems:"center",
          gap: "0%",
        }}
      >
        <LatestPostCard
          title={articles[articlesCount - 1]?.location}
          imgsrc={images[articlesCount - 1]}
          desc={articles[articlesCount - 1]?.body.replace(/<[^>]+>/g, "")}
          _id={articles[articlesCount - 1]?._id}
        />
        <LatestPostCard
          title={articles[articlesCount - 2]?.location}
          imgsrc={images[articlesCount - 2]}
          desc={articles[articlesCount - 2]?.body.replace(/<[^>]+>/g, "")}
          _id={articles[articlesCount - 2]?._id}
        />
        <LatestPostCard
          title={articles[articlesCount - 3]?.location}
          imgsrc={images[articlesCount - 3]}
          desc={articles[articlesCount - 3]?.body.replace(/<[^>]+>/g, "")}
          _id={articles[articlesCount - 3]?._id}
        />
        <LatestPostCard
          title={articles[articlesCount - 4]?.location}
          imgsrc={images[articlesCount - 4]}
          desc={articles[articlesCount - 4]?.body.replace(/<[^>]+>/g, "")}
          _id={articles[articlesCount - 4]?._id}
        />
      </div>
    </div>
  );
}

export default LatestPostCards
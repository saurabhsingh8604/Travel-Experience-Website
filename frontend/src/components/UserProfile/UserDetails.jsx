import React, { useEffect, useState } from 'react'
import './UserDetails.css'
import Button from "../HomePage/Button";
import "./UserData.css";
import ImageGallery from "../HomePage/ImageGallery";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArticlePost from '../TravelExperiencePage/ArticlePost';
import UserArticle from './UserArticle';

const UserDetails = () => {
  const {user,loading,isAuthenticated} = useSelector((state)=>state.user)
  const {articles} = useSelector((state)=>state.articles)

  let history = useNavigate();

  const [myarticles, setmyarticles] = useState(true);
  const [myliked, setmyliked] = useState(false);
  const [mysaved, setmysaved] = useState(false);

  useEffect(() => {
    if(isAuthenticated === false){
      history("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      <div className="userDetails">
        <div className="left_portion">
          <img
            className="profile_image"
            src={user?.avatar?.url}
            alt="profile_image"
          />
        </div>
        <div className="right_portion">
          <h2 className="user_detials_heading">User Details</h2>
          {/* <p className="user_id">User Id - prashant9154</p> */}
          <p className="user_name"> Full Name -{user?.name}</p>
          <p className="user_email">Email Id - {user?.email}</p>
          {/* <p className="user_phone">Phone No. - 8517884936</p> */}
          {/* <p className="user_address">
            Address - GL-1386 D.D. Nagar Gwalior MP
          </p> */}
        </div>
      </div>
      <div className="userData">
        <div className="user_data_route_icons">
          <div
            className="profile_icons"
            id="profile_post"
            onClick={(e) => {
              setmyarticles(true);
              setmyliked(false);
              setmysaved(false);
            }}
          >
            <i class="fa-solid fa-signs-post"></i>
            <p>Your Posts</p>
          </div>
          <div
            className="profile_icons"
            id="profile_like"
            onClick={(e) => {
              setmyarticles(false);
              setmyliked(true);
              setmysaved(false);
            }}
          >
            <i class="fa-solid fa-heart"></i>
            <p>Liked</p>
          </div>
          <div
            className="profile_icons"
            id="profile_save"
            onClick={(e) => {
              setmyarticles(false);
              setmyliked(false);
              setmysaved(true);
            }}
          >
            <i class="fa-solid fa-bookmark"></i>
            <p>Saved</p>
          </div>
        </div>
        {/* <div className="user_data_categ">
          <Button name="Articles" />
          <Button name="Images" />
          <Button name="Videos" />
        </div> */}
        {myarticles ? (
          <div
            style={{ display: "flex", flexWrap: "wrap" }}
            className="myarticles_container"
          >
            {articles?.map((article) => {
              return (user?.usersArticles?.map((userarticle) => {
                if (userarticle?.articleId?.toString() === article?._id.toString())
                {
                  return <UserArticle key={article._id} article={article} />;
                }
              }))
            })}
          </div>
        ) : null}
        {myliked ? (
          <div
            style={{ display: "flex", flexWrap: "wrap" }}
            className="myarticles_container"
          >
            {articles?.map((article) => {
              return user?.likedArticles?.map((likedarticle) => {
                if (
                  likedarticle?.articleId?.toString() ===
                  article?._id.toString()
                ) {
                  return <UserArticle key={article._id} article={article} />;
                }
              });
            })}
          </div>
        ) : null}
        {mysaved ? (
          <div
            style={{ display: "flex", flexWrap: "wrap" }}
            className="myarticles_container"
          >
            {articles?.map((article) => {
              return user?.savedArticles?.map((savedarticle) => {
                if (
                  savedarticle?.articleId?.toString() ===
                  article?._id.toString()
                ) {
                  return <UserArticle key={article._id} article={article} />;
                }
              });
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UserDetails
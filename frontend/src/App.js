import React, {useEffect} from "react"
import './App.css';
import Header from "./components/HomePage/Header";
import LandingPage from './components/HomePage/LandingPage';
import Headings from "./components/HomePage/Headings";
import LatestPostCards from "./components/HomePage/LatestPostCards.jsx";
import ImageGallery from "./components/HomePage/ImageGallery";
import VideoGallery from "./components/HomePage/VideoGallery";
import Footer from "./components/HomePage/Footer.jsx";

import LoginSignup from './components/Login_Signup/LoginSignup';
import TravelExperience from './components/TravelExperiencePage/TravelExperience';
import ShowArticle from './components/ShowArticlePage/ShowArticle';
import TravelImages from './components/TravelImages/TravelImages';
import TravelVideos from './components/TravelVideos/TravelVideos'

import CreateArticle from './components/CreateArticlePage/CreateArticle'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Search from './components/TravelExperiencePage/Search';
import UserDetails from './components/UserProfile/UserDetails'

import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/UserOptions.jsx"
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/layout/Loader/Loader";
import { getAllArticles } from "./actions/articleAction";
import { getAllimages } from "./actions/imageAction";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import UpdatePassword from "./components/UserProfile/UpdatePassword ";
import ForgetPassword from "./components/UserProfile/ForgetPassword"
import ResetPassword from "./components/UserProfile/ResetPassword";
// import 'C:/Users/prash/Desktop/Travel Experience Project/travel-experience/node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  const {isAuthenticated, user} = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const { articles,articlesPerPage, articlesCount } = useSelector(
    (state) => state.articles
  );
  
  const { images, imagesPerPage, imagesCount } = useSelector(
    (state) => state.images
  );

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllArticles());
    store.dispatch( getAllimages() );
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <LandingPage />
              <Headings title="Latest Posts" />
              <LatestPostCards
                articles={articles}
                articlesCount={articlesCount}
              />
              <Headings title="Travel Gallery" />
              <ImageGallery
                images={images}
                imagesPerPage={imagesPerPage}
                imagesCount={imagesCount}
              />
              <Headings title="Latest Videos" />
              <VideoGallery />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/experience"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <TravelExperience />
              <Footer />
            </>
          }
        />
        <Route
          path="/experience/:keyword"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <TravelExperience />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/article/:id"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <ShowArticle />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/videos"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <TravelVideos />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/images"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <TravelImages />
              <Footer />
            </>
          }
        />
        <Route
          path="/images/:keyword"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <TravelImages />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/create"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <CreateArticle />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              <Header />
              <LoginSignup />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <UserDetails />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <UpdateProfile />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/me/password/update"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <UpdatePassword />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/password/forget"
          element={
            <>
              <Header />
              <ForgetPassword/>
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/password/reset/:token"
          element={
            <>
              <Header />
              <ResetPassword/>
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <>
              <Header />
              {isAuthenticated && <UserOptions user={user} />}
              <Search />
              {/* <Footer /> */}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
    // <>
    //   <Header />

    //   <LandingPage />
    //   <Headings title="Latest Posts" />
    //   <LatestPostCards />
    //   <Headings title="Travel Gallery" />
    //   <ImageGallery />
    //   <Headings title="Latest Videos" />
    //   <VideoGallery />

    //   <UserDetails />
    //   <UserData />

    //   <Signup />
    //   <Login />

    //   <TravelExperience />

    //   <TravelImages />

    //   <TravelVideos />

    //   <ShowArticle
    //     title=" Visited Taj Mahal for first time"
    //     location="Taj Mahal"
    //     city = "Agra (UP)"
    //     author="Prashant Kaushal"
    //     date="14/6/2022"
    //   />

    //   <CreateArticle />
    //   <Footer />
    // </>
  );
}

export default App;

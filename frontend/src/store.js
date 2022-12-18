import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allArticleReducer, articleReducer, newarticleReducer, newcommentReducer, newdownvoteReducer, newlikeReducer, newsaveReducer, newshareReducer, newupvoteReducer } from "./reducers/articleReducer";
import {
  newimageReducer,
  imageReducer,
  allimageReducer,
} from "./reducers/imageReducer";
import {
  newvideoReducer,
  videoReducer,
  allvideoReducer,
} from "./reducers/videoReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  articles: allArticleReducer,
  articleDetails: articleReducer,
  newArticle: newarticleReducer,
  newComment: newcommentReducer,
  newUpvote: newupvoteReducer,
  newDownvote: newdownvoteReducer,
  newShare: newshareReducer,
  newLike: newlikeReducer,
  newSave: newsaveReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  userDetails: userDetailsReducer,
  images: allimageReducer,
  newimage: newimageReducer,
  image: imageReducer,
  videos: allvideoReducer,
  newvideo: newvideoReducer,
  video: videoReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
); 

export default store;
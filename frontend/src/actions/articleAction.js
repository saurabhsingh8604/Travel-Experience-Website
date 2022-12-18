import axios from "axios";

import {
  ALL_ARTICLE_FAIL,
  ALL_ARTICLE_REQUEST,
  ALL_ARTICLE_SUCCESS,
  ADMIN_ARTICLE_REQUEST,
  ADMIN_ARTICLE_SUCCESS,
  ADMIN_ARTICLE_FAIL,
  NEW_ARTICLE_REQUEST,
  NEW_ARTICLE_SUCCESS,
  NEW_ARTICLE_FAIL,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DETAILS_SUCCESS,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_UPVOTE_REQUEST,
  NEW_UPVOTE_SUCCESS,
  NEW_UPVOTE_RESET,
  NEW_UPVOTE_FAIL,
  NEW_DOWNVOTE_REQUEST,
  NEW_DOWNVOTE_SUCCESS,
  NEW_DOWNVOTE_RESET,
  NEW_DOWNVOTE_FAIL,
  NEW_SHARE_REQUEST,
  NEW_SHARE_SUCCESS,
  NEW_SHARE_RESET,
  NEW_SHARE_FAIL,
  NEW_LIKE_REQUEST,
  NEW_LIKE_SUCCESS,
  NEW_LIKE_RESET,
  NEW_LIKE_FAIL,
  NEW_SAVE_REQUEST,
  NEW_SAVE_SUCCESS,
  NEW_SAVE_RESET,
  NEW_SAVE_FAIL,
  ALL_COMMENT_REQUEST,
  ALL_COMMENT_SUCCESS,
  ALL_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  CLEAR_ERRORS,
} from "../contants/articleConstants";

// Get All articles
export const getAllArticles =
  (keyword = "", currentPage = 1,city, location,rating=-100000000) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ARTICLE_REQUEST });

      let link = `/api/articles?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;

      if (city) {
        link = `/api/articles?keyword=${keyword}&page=${currentPage}&city=${city}&rating[gte]=${rating}`;
      }

      if (location) {
        link = `/api/articles?keyword=${keyword}&page=${currentPage}&location=${location}&rating[gte]=${rating}`;
      }

      if (city && location) {
        link = `/api/articles?keyword=${keyword}&page=${currentPage}&city=${city}&location=${location}&rating[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ARTICLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ARTICLE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// // Get All articles For Admin
// export const getAdminarticle = () => async (dispatch) => {
//   try {
//     dispatch({ type: ADMIN_ARTICLE_REQUEST });

//     const { data } = await axios.get("/api/v1/admin/articles");

//     dispatch({
//       type: ADMIN_ARTICLE_SUCCESS,
//       payload: data.articles,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_ARTICLE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Create article
export const createarticle = (articleData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ARTICLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/article/new`,
      articleData,
      config
    );

    dispatch({
      type: NEW_ARTICLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ARTICLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update article
// export const updatearticle = (id, articleData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_ARTICLE_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/article/${id}`,
//       articleData,
//       config
//     );

//     dispatch({
//       type: UPDATE_ARTICLE_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_ARTICLE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete article
// export const deletearticle = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_ARTICLE_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/article/${id}`);

//     dispatch({
//       type: DELETE_ARTICLE_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_ARTICLE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get articles Details
export const getArticle = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/article/${id}`);
    console.log(data);
    dispatch({
      type: ARTICLE_DETAILS_SUCCESS,
      payload: data.article,
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW COMMENT
export const newcomment = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/comment`, commentData, config);

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW UPVOTE
export const newupvote = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_UPVOTE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/upvote`, commentData, config);

    dispatch({
      type: NEW_UPVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_UPVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW DOWNVOTE
export const newdownvote = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DOWNVOTE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/downvote`, commentData, config);

    dispatch({
      type: NEW_DOWNVOTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_DOWNVOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW SHARE
export const newshare = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SHARE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/share`, commentData, config);

    dispatch({
      type: NEW_SHARE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_SHARE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW LIKE
export const newlike = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_LIKE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/like`, commentData, config);

    dispatch({
      type: NEW_LIKE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_LIKE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW SAVE
export const newsave = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SAVE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/article/save`, commentData, config);

    dispatch({
      type: NEW_SAVE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_SAVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Get All comments of a article
// export const getAllcomments = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_COMMENT_REQUEST });

//     const { data } = await axios.get(`/api/v1/comments?id=${id}`);

//     dispatch({
//       type: ALL_COMMENT_SUCCESS,
//       payload: data.comments,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_COMMENT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete comment of a article
// export const deletecomments = (commentId, articleId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_COMMENT_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/comments?id=${commentId}&articleId=${articleId}`
//     );

//     dispatch({
//       type: DELETE_COMMENT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_COMMENT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

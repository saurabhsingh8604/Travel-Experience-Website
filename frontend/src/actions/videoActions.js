import axios from "axios";

import {
  ALL_VIDEO_FAIL,
  ALL_VIDEO_REQUEST,
  ALL_VIDEO_SUCCESS,
  ADMIN_VIDEO_REQUEST,
  ADMIN_VIDEO_SUCCESS,
  ADMIN_VIDEO_FAIL,
  NEW_VIDEO_REQUEST,
  NEW_VIDEO_SUCCESS,
  NEW_VIDEO_FAIL,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAIL,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_FAIL,
  VIDEO_DETAILS_SUCCESS,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  ALL_COMMENT_REQUEST,
  ALL_COMMENT_SUCCESS,
  ALL_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  CLEAR_ERRORS,
} from "../contants/videoConstants";

// Get All videos
export const getAllvideos =
  (keyword = "", currentPage = 1, city = "delhi", location, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_VIDEO_REQUEST });

      let link = `/api/videos?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}`;

      if (city) {
        link = `/api/videos?keyword=${keyword}&page=${currentPage}&city=${city}&ratings[gte]=${rating}`;
      }

      if (location) {
        link = `/api/videos?keyword=${keyword}&page=${currentPage}&city=${city}&location=${location}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_VIDEO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_VIDEO_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// // Get All videos For Admin
// export const getAdminvideo = () => async (dispatch) => {
//   try {
//     dispatch({ type: ADMIN_VIDEO_REQUEST });

//     const { data } = await axios.get("/api/v1/admin/videos");

//     dispatch({
//       type: ADMIN_VIDEO_SUCCESS,
//       payload: data.videos,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_VIDEO_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Create video
export const createvideo = (videoData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_VIDEO_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/video/new`, videoData, config);

    dispatch({
      type: NEW_VIDEO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Update video
// export const updatevideo = (id, videoData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_VIDEO_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/video/${id}`,
//       videoData,
//       config
//     );

//     dispatch({
//       type: UPDATE_VIDEO_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_VIDEO_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete video
// export const deletevideo = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_VIDEO_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/video/${id}`);

//     dispatch({
//       type: DELETE_VIDEO_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_VIDEO_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get videos Details
export const getvideo = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/video/${id}`);
    console.log(data);
    dispatch({
      type: VIDEO_DETAILS_SUCCESS,
      payload: data.video,
    });
  } catch (error) {
    dispatch({
      type: VIDEO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // NEW COMMENT
// export const newcomment = (commentData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_COMMENT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(`/api/v1/comment`, commentData, config);

//     dispatch({
//       type: NEW_COMMENT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_COMMENT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Get All comments of a video
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

// // Delete comment of a video
// export const deletecomments = (commentId, videoId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_COMMENT_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/comments?id=${commentId}&videoId=${videoId}`
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

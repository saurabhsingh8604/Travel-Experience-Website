import axios from "axios";

import {
  ALL_IMAGE_FAIL,
  ALL_IMAGE_REQUEST,
  ALL_IMAGE_SUCCESS,
  ADMIN_IMAGE_REQUEST,
  ADMIN_IMAGE_SUCCESS,
  ADMIN_IMAGE_FAIL,
  NEW_IMAGE_REQUEST,
  NEW_IMAGE_SUCCESS,
  NEW_IMAGE_FAIL,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
  IMAGE_DETAILS_REQUEST,
  IMAGE_DETAILS_FAIL,
  IMAGE_DETAILS_SUCCESS,
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
} from "../contants/imageConstants";

// Get All images
export const getAllimages = (keyword = "", currentPage = 1, city, location, rating = 0) => async (dispatch) => {
    try {
      dispatch({ type: ALL_IMAGE_REQUEST });

      let link = `/api/images?keyword=${keyword}&page=${currentPage}&rating[gte]=${rating}`;

      if (city) {
        link = `/api/images?keyword=${keyword}&page=${currentPage}&city=${city}&rating[gte]=${rating}`;
      }

      if (location) {
        link = `/api/images?keyword=${keyword}&page=${currentPage}&city=${city}&location=${location}&rating[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_IMAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_IMAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// // Get All images For Admin
// export const getAdminimage = () => async (dispatch) => {
//   try {
//     dispatch({ type: ADMIN_IMAGE_REQUEST });

//     const { data } = await axios.get("/api/v1/admin/images");

//     dispatch({
//       type: ADMIN_IMAGE_SUCCESS,
//       payload: data.images,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_IMAGE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Create image
export const createimage = (imageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_IMAGE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/image/new`, imageData, config);

    dispatch({
      type: NEW_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// // Update image
// export const updateimage = (id, imageData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_IMAGE_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/image/${id}`,
//       imageData,
//       config
//     );

//     dispatch({
//       type: UPDATE_IMAGE_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_IMAGE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete image
// export const deleteimage = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_IMAGE_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/image/${id}`);

//     dispatch({
//       type: DELETE_IMAGE_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_IMAGE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get images Details
export const getimage = (id) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/image/${id}`);
    console.log(data);
    dispatch({
      type: IMAGE_DETAILS_SUCCESS,
      payload: data.image,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_DETAILS_FAIL,
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

// // Get All comments of a image
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

// // Delete comment of a image
// export const deletecomments = (commentId, imageId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_COMMENT_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/comments?id=${commentId}&imageId=${imageId}`
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

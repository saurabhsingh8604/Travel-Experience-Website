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
  NEW_IMAGE_RESET,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_FAIL,
  UPDATE_IMAGE_RESET,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_RESET,
  IMAGE_DETAILS_REQUEST,
  IMAGE_DETAILS_SUCCESS,
  IMAGE_DETAILS_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_RESET,
  ALL_COMMENT_REQUEST,
  ALL_COMMENT_SUCCESS,
  ALL_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,
  CLEAR_ERRORS,
} from "../contants/imageConstants";

export const allimageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case ALL_IMAGE_REQUEST:
      return {
        loading: true,
        images: [],
      };
    case ALL_IMAGE_SUCCESS:
      return {
        loading: false,
        images: action.payload.images,
        imagesPerPage: action.payload.imagesPerPage,
        imagesCount: action.payload.imagesCount,
      };

    case ADMIN_IMAGE_SUCCESS:
      return {
        loading: false,
        images: action.payload,
      };
    case ALL_IMAGE_FAIL:
    case ADMIN_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newimageReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case NEW_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_IMAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        image: action.payload.image,
      };
    case NEW_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_IMAGE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// export const imageReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_IMAGE_REQUEST:
//     case UPDATE_IMAGE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_IMAGE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_IMAGE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_IMAGE_FAIL:
//     case UPDATE_IMAGE_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_IMAGE_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_IMAGE_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

export const imageReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case IMAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        image: action.payload,
      };
    case IMAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// export const newcommentReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NEW_COMMENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case NEW_COMMENT_SUCCESS:
//       return {
//         loading: false,
//         success: action.payload,
//       };
//     case NEW_COMMENT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case NEW_COMMENT_RESET:
//       return {
//         ...state,
//         success: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const imagecommentsReducer = (state = { comments: [] }, action) => {
//   switch (action.type) {
//     case ALL_COMMENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case ALL_COMMENT_SUCCESS:
//       return {
//         loading: false,
//         comments: action.payload,
//       };
//     case ALL_COMMENT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const commentReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_COMMENT_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_COMMENT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };
//     case DELETE_COMMENT_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_COMMENT_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

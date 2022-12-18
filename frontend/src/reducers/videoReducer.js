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
  NEW_VIDEO_RESET,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAIL,
  UPDATE_VIDEO_RESET,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_RESET,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
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
} from "../contants/videoConstants";

export const allvideoReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case ALL_VIDEO_REQUEST:
      return {
        loading: true,
        videos: [],
      };
    case ALL_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: action.payload.videos,
        resultPerPage: action.payload.resultPerPage,
        videosCount: action.payload.videosCount,
      };

    case ADMIN_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
      };
    case ALL_VIDEO_FAIL:
    case ADMIN_VIDEO_FAIL:
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

export const newvideoReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case NEW_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_VIDEO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        video: action.payload.video,
      };
    case NEW_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_VIDEO_RESET:
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

// export const videoReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_VIDEO_REQUEST:
//     case UPDATE_VIDEO_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_VIDEO_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_VIDEO_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_VIDEO_FAIL:
//     case UPDATE_VIDEO_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_VIDEO_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_VIDEO_RESET:
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

export const videoReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case VIDEO_DETAILS_SUCCESS:
      return {
        loading: false,
        video: action.payload,
      };
    case VIDEO_DETAILS_FAIL:
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

// export const videocommentsReducer = (state = { comments: [] }, action) => {
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

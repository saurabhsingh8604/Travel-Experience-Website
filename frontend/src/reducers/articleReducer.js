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
  NEW_ARTICLE_RESET,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_RESET,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  DELETE_ARTICLE_RESET,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_RESET,
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
  DELETE_COMMENT_RESET,
  CLEAR_ERRORS,
} from "../contants/articleConstants";

export const allArticleReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case ALL_ARTICLE_REQUEST:
      return {
        loading: true,
        articles: [],
      };
    case ALL_ARTICLE_SUCCESS:
      return {
        loading: false,
        articles: action.payload.articles,
        articlesPerPage:action.payload.articlesPerPage,
        articlesCount:action.payload.articlesCount,
      };

    case ADMIN_ARTICLE_SUCCESS:
      return {
        loading: false,
        articles: action.payload,
      };
    case ALL_ARTICLE_FAIL:
    case ADMIN_ARTICLE_FAIL:
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

export const newarticleReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case NEW_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ARTICLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        article: action.payload.article,
      };
    case NEW_ARTICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_ARTICLE_RESET:
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

// export const articleReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_ARTICLE_REQUEST:
//     case UPDATE_ARTICLE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case DELETE_ARTICLE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isDeleted: action.payload,
//       };

//     case UPDATE_ARTICLE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     case DELETE_ARTICLE_FAIL:
//     case UPDATE_ARTICLE_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case DELETE_ARTICLE_RESET:
//       return {
//         ...state,
//         isDeleted: false,
//       };
//     case UPDATE_ARTICLE_RESET:
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

export const articleReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case ARTICLE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ARTICLE_DETAILS_SUCCESS:
      return {
        loading: false,
        article: action.payload,
      };
    case ARTICLE_DETAILS_FAIL:
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

export const newcommentReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_COMMENT_RESET:
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

export const newupvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_UPVOTE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case NEW_UPVOTE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_UPVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_UPVOTE_RESET:
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
export const newdownvoteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_DOWNVOTE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case NEW_DOWNVOTE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_DOWNVOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DOWNVOTE_RESET:
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

export const newshareReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_SHARE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case NEW_SHARE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_SHARE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_SHARE_RESET:
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
export const newlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_LIKE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case NEW_LIKE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_LIKE_RESET:
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
export const newsaveReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_SAVE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case NEW_SAVE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_SAVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_SAVE_RESET:
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

// export const articlecommentsReducer = (state = { comments: [] }, action) => {
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

import {
  GET_IMAGE,
  GET_IMAGES,
  IMAGE_LOADING,
  CLEAR_CURRENT_IMAGE
} from '../actions/types';

const initialState = {
  image: null,     //profile
  images: null,     //profiles
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IMAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
        loading: false
      };
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_IMAGE:
      return {
        ...state,
        image: null
      };
    default:
      return state;
  }
}

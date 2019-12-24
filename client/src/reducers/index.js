import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageReducer';
import postReducer from './postReducer';
import quesReducers from './quesReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  image: imageReducer,
  post: postReducer,
  cuestionarios: quesReducers
});

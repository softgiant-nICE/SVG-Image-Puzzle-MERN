import {
  GET_CUESTIONARIOS,
  CUESTIONARIO_LOADING,
  GET_CUESTIONARIO
} from '../actions/types';

const initialState = {
  cuestionario: null,
  cuestionarios: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CUESTIONARIO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CUESTIONARIO:
      return {
        ...state,
        cuestionario: action.payload,
        loading: false
      };
    case GET_CUESTIONARIOS:
      return {
        ...state,
        cuestionarios: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

import axios from 'axios';

import { IMAGE_LOADING, GET_ERRORS, GET_CUESTIONARIOS } from './types';

// Crear Cuestionario
export const createCuestionario = (cuestionarioData, history) => dispatch => {
	axios
		.post('/api/cuestionarios/cuestionario', cuestionarioData)
		.then(res => history.push('/dashimage'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Obtener Cuestionarios del usuario
export const getUserCuestionarios = () => dispatch => {
	dispatch(setImageLoading());
	axios
		.get('api/cuestionarios/byUser')
		.then(res =>
			dispatch({
				type: GET_CUESTIONARIOS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_CUESTIONARIOS,
				payload: {}
			})
		);
};

//Obtener Todos los Cuestionarios
export const getAllCuestionarios = () => dispatch => {
	dispatch(setImageLoading());
	axios
		.get('api/cuestionarios/all')
		.then(res =>
			dispatch({
				type: GET_CUESTIONARIOS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_CUESTIONARIOS,
				payload: {}
			})
		);
};

// Delete AddCurso
export const deleteCuestionario = id => dispatch => {
	axios
		.delete(`/api/cuestionarios/cuestionario/${id}`)
		.then(res =>
			dispatch({
				type: GET_CUESTIONARIOS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// image loading
export const setImageLoading = () => {
	return { type: IMAGE_LOADING };
};

import axios from "axios";

import {
  GET_IMAGE,
  GET_IMAGESVG,
  GET_IMAGES,
  IMAGE_LOADING,
  CLEAR_CURRENT_IMAGE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get current image
export const getCurrentImage = () => dispatch => {
  dispatch(setImageLoading());
  axios
    .get("/api/image")
    .then(res =>
      dispatch({
        type: GET_IMAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGE,
        payload: {}
      })
    );
};

// Get image by handle
export const getImageByHandle = handle => dispatch => {
  dispatch(setImageLoading());
  axios
    .get(`/api/image/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_IMAGE,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_IMAGE, payload: null }));
};

// Get image-svg by id
export const getImageById = id => dispatch => {
  dispatch(setImageLoading());
  axios
    .get(`/api/image/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_IMAGESVG,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_IMAGESVG, payload: null }));
};

// Create image
export const createImage = (imageData, history) => dispatch => {
  axios
    .post("/api/image", imageData)
    .then(res => history.push("/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Imagen al curso
//Se manda la información del formulario de addcurso a una ruta específica para que el servidor responda
export const addCurso = (expData, history) => dispatch => {
  axios
    .post("/api/image/subirImagen", expData, {
      /* Para ver el progreso de la carga de la imagen */
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    })
    .then(res => history.push("/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const subirImagen = (expData, history) => dispatch => {
  dispatch(setImageLoading());
  axios
    .post("/api/image/subirImagen", expData, {
      /* Para ver el progreso de la carga de la imagen */
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    })
    .then(res =>
      dispatch({
        type: GET_IMAGE,
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

export const terminarImagen = (expData, history) => dispatch => {
  dispatch(setImageLoading());
  axios
    .post("/api/image/subirImagen", expData)
    .then(res => (window.location = "/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addReactivos = (expData, history) => dispatch => {
  axios
    .post("/api/image/addreactivos", expData, {
      /* Para ver el progreso de la carga de la imagen */
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    })
    .then(res => history.push("/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addInfo = (eduData, history) => dispatch => {
  axios
    .post("/api/image/addinfo", eduData)
    .then(res => history.push("/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete AddCurso
export const deleteAddCurso = id => dispatch => {
  axios
    .delete(`/api/image/addcurso/${id}`)
    .then(res =>
      dispatch({
        type: GET_IMAGE,
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

/* hace falta una función que edite el curso seleccionado */


// Delete AddInfo
export const deleteImagen = id => dispatch => {
  axios
    .delete(`/api/image/addinfo/${id}`)
    .then(res => (window.location = "/dashimage"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get  images
export const getImages = () => dispatch => {
  dispatch(setImageLoading());
  axios
    .get("/api/image/")
    .then(res =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: {}
      })
    );
};

// Get all images
export const getAllImages = () => dispatch => {
  dispatch(setImageLoading());
  axios
    .get("/api/image/all")
    .then(res =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_IMAGES,
        payload: {}
      })
    );
};

// Delete account & images
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/image")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// image loading
export const setImageLoading = () => {
  return { type: IMAGE_LOADING };
};

// Clear image
export const clearCurrentImage = () => {
  return { type: CLEAR_CURRENT_IMAGE };
};

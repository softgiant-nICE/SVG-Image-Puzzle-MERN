import React from 'react';
import { Link } from 'react-router-dom';

const ImageActions = () => {
	return (
		<div className='btn-group mb-4' role='group'>
			<Link to='/crear-tema' className='btn btn-light'>
				<i className='fas fa-user-circle text-info mr-1' />
				1. Crear Tema
			</Link>
			<Link to='/subir-imagen' className='btn btn-light'>
				<i className='fab fa-black-tie text-info mr-1' />
				2. Subir Imagenes
			</Link>
			<Link to='/user-questionnaires' className='btn btn-light'>
				<i className='fas fa-graduation-cap text-info mr-1' />
				Mis Cuestionarios
			</Link>
			<Link to='/user-items' className='btn btn-light'>
				<i className='fas fa-th-list text-info mr-1' />
				Mis Temas / Imagenes
			</Link>
		</div>
	);
};

export default ImageActions;

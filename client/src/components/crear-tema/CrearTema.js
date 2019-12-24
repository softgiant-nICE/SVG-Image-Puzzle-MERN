import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createTema } from '../../actions/temasActions';
import { createImage } from '../../actions/imageActions';

class CrearTema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			handle: '',
			title: '',
			website: '',
			grade: '',
			description: '',
			resume: '',
			topics: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const temaData = {
			handle: this.state.handle,
			title: this.state.title,
			grade: this.state.grade,
			website: this.state.website,
			description: this.state.description,
			resume: this.state.resume,
			topics: this.state.topics
		};

		/*     this.props.createImage(imageData, this.props.history); */
		this.props.createTema(temaData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		// Select options for status
		const options = [
			{ label: 'Nivel Escolaridad', value: 0 },
			{ label: '1er Primaria', value: '1er Primaria' },
			{ label: '2do Primaria', value: '2do Primaria' },
			{ label: '3er Primaria', value: '3er Primaria' },
			{ label: '4to Primaria', value: '4to Primaria' },
			{ label: '5to Primaria', value: '5to Primaria' },
			{ label: '6to Primaria', value: '6to Primaria' }
		];

		return (
			<div className='create-tema'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<Link to='./../' className='btn btn-light'>
								Regresar
							</Link>
							<h1 className='display-4 text-center'>Crea nuevo Tema</h1>
							<p className='lead text-center'>
								Proporcionanos informacion clave para crear un nuevo Tema
							</p>
							<small className='d-block pb-3'>Campos Requeridos</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Título'
									name='title'
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
									info='Selecciona un título para tu tema'
								/>
								<SelectListGroup
									placeholder='Grado Escolar'
									name='grade'
									value={this.state.grade}
									onChange={this.onChange}
									options={options}
									error={errors.grade}
									info='Selecciona el grado de escolaridad orientado a este Tema'
								/>

								<TextFieldGroup
									placeholder='Página Web'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info='Puede ser un sitio externo para complementar o documentar el Tema'
								/>

								<TextFieldGroup
									placeholder='Temas Relacionados'
									name='topics'
									value={this.state.topics}
									onChange={this.onChange}
									error={errors.topics}
									info='Temas que se trataran separados por comas (ej.
                    Geografia,Matematicas,Sistema Circulatorio,Mapa de Europa)'
								/>

								<TextAreaFieldGroup
									placeholder='Resumen'
									name='resume'
									value={this.state.resume}
									onChange={this.onChange}
									error={errors.resume}
									info='Describe todo lo relacionado al Tema'
								/>

								<input
									type='submit'
									value='Guardar Cambios'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CrearTema.propTypes = {
	image: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	image: state.image,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createImage, createTema }
)(withRouter(CrearTema));

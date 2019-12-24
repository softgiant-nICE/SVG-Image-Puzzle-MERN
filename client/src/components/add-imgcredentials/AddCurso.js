import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

/*Acciones que invoca la pestaña de agregar cursos*/
import { subirImagen } from '../../actions/imageActions';

class AddCurso extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			imageSVG: null,
			idImagen: '',
			handleLoading: false,

			errors: {},
			imagePreviewUrl: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		const image = nextProps.image.image;

		if (image !== null) {
			this.setState({ idImagen: image, handleLoading: true });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('title', this.state.title);
		formData.append('description', this.state.description);
		formData.append('file', this.state.imageSVG);

		this.props.subirImagen(formData, this.props.history);
	}

	onChange(e) {
		switch (e.target.name) {
			case 'imageSVG':
				/* Cargador del archivo den lado del cliente */
				/*Esta funcion crea un cargador para la vista previa de la imagen subida*/

				let reader = new FileReader();
				let file = e.target.files[0];

				reader.onloadend = () => {
					this.setState({
						file: file,
						imagePreviewUrl: reader.result
					});
				};

				reader.readAsDataURL(file);

				/* Cargador del archivo den lado del cliente */

				this.setState({ imageSVG: e.target.files[0] });
				if (
					window.File &&
					window.FileReader &&
					window.FileList &&
					window.Blob
				) {
					// Great success! All the File APIs are supported.
				} else {
					alert('The File APIs are not fully supported in this browser.');
				}
				break;
			default:
				this.setState({ [e.target.name]: e.target.value });
		}
	}

	render() {
		const { errors } = this.state;
		const { loading } = this.props.image;

		let buttonContent;
		if (this.state.idImagen === '') {
			buttonContent = (
				<input
					type='submit'
					value='Agregar'
					className='btn btn-info btn-block mt-4'
				/>
			);
		} else if (loading) {
			console.log('La imagen se está cargando');
			buttonContent = <Spinner />;
		} else {
			buttonContent = (
				<Link
					to={{
						pathname: `/editar-objetos`,
						state: {
							idImagen: this.state.idImagen
						}
					}}
					className='btn btn-success btn-block mt-4'
				>
					Continuar
				</Link>
			);
		}

		/* Cargador del archivo den lado del cliente */
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = <img src={imagePreviewUrl} alt=""/>;
		} else {
			$imagePreview = <div className='previewText'>Selecciona una imagen</div>;
		}
		/* Cargador del archivo den lado del cliente */

		return (
			<div className='add-curso'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<Link to='/dashimage' className='btn btn-light'>
								Regresar
							</Link>
							<h1 className='display-4 text-center'>Añade Imagen</h1>
							<p className='lead text-center'>
								Completa los campos que son requeridos para subir una imagen SVG
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Título de la imagen'
									name='title'
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextAreaFieldGroup
									placeholder='Descripcion de la imagen'
									name='description'
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info='Cuentanos un poco sobre esta imagen'
								/>

								{/* Formulario */}
								<div className='custom-file'>
									<input
										name='imageSVG'
										type='file'
										className='custom-file-input imageSVG'
										id='inputGroupFile01'
										aria-describedby='inputGroupFileAddon01'
										onChange={this.onChange}
										error={errors.imageSVG}
									/>
									<label
										className='custom-file-label'
										htmlFor='inputGroupFile01'
									>
										Elije una imagen SVG
									</label>
								</div>

								<div className='imgPreview'>{$imagePreview}</div>
								{buttonContent}
							</form>
							{/* Formulario */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddCurso.propTypes = {
	subirImagen: PropTypes.func.isRequired,
	image: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	image: state.image,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ subirImagen }
)(withRouter(AddCurso));

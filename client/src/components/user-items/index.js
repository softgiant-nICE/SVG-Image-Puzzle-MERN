import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTemas } from '../../actions/temasActions';
import { createCuestionario } from '../../actions/cuestionariosActions';
import { getImages, deleteAccount } from '../../actions/imageActions';
import Spinner from '../common/Spinner';
import AddCurso from '../dashimage/AddCurso';
import Imagenes from '../dashimage/Imagenes';

class DashImage extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			idTema: '',
			idImagen: '',
			idCurso: ''
		};

		this.handleImagen = this.handleImagen.bind(this);
		this.handleTema = this.handleTema.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getImages();
		this.props.getTemas();
	}

	onSubmit() {
		const formData = new FormData();
		formData.append('idImagen', this.state.idImagen);
		formData.append('idTema', this.state.idTema);

		createCuestionario(formData, this.props.history);
	}

	handleImagen(idImagen) {
		this.setState({
			idImagen: idImagen
		});
	}
	handleTema(idTema) {
		this.setState({
			idTema: idTema
		});
	}

	onDeleteClick(e) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { image, images, loading } = this.props.image;

		let dashtemaContent;
		let dashimagenesContent;
		let questContent;
		if (images === null || this.props.loading) {
			questContent = <Spinner />;
		} else {
			questContent = (
				<div className='row'>
					<Link to='./../' className='btn btn-light mb-3 float-left'>
						Regresar
					</Link>
				</div>
			);
		}
		if (images === null || loading) {
			dashimagenesContent = <Spinner />;
		} else {
			// Check if logged in user has image data
			if (Object.keys(images).length > 0) {
				dashimagenesContent = (
					<div>
						<div>
							<h4 className='mb-4'>Imagenes</h4>
						</div>
						<Imagenes
							addinfo={images}
							handleImagenItem={this.handleImagen}
							auth={this.props.auth}
						/>
					</div>
				);
			} else {
				// User is logged in but has no image
				dashimagenesContent = (
					<div>
						<div>
							<h4 className='mb-4'>Imagenes</h4>
							<hr />
						</div>

						<p className='lead text-muted'>
							Aun no haz creado ninguna imagen, porfavor añade una imagen
						</p>
						<Link to='/subir-imagen' className='btn btn-lg btn-info btn-sm'>
							Añadir Imagen
						</Link>
					</div>
				);
			}
		}

		if (image === null || loading) {
			dashtemaContent = <Spinner />;
		} else {
			// Check if logged in user has image data
			if (Object.keys(image).length > 0) {
				dashtemaContent = (
					<div>
						<div>
							<h4 className='mb-4'>Temas</h4>
						</div>

						<AddCurso
							addcurso={image}
							handleTemaItem={this.handleTema}
							auth={this.props.auth}
						/>
					</div>
				);
			} else {
				// User is logged in but has no image
				dashtemaContent = (
					<div>
						<div>
							<h4 className='mb-4'>Temas</h4>
							<hr />
						</div>

						<p className='lead text-muted'>
							Aun no haz creado ninguna Tema, porfavor añade un Tema
						</p>
						<Link to='/crear-tema' className='btn btn-lg btn-info btn-sm'>
							Añadir Tema
						</Link>
					</div>
				);
			}
		}

		return (
			<div className='dashimage'>
				<div className='container'>
					<div className='col-md-12'>{questContent}</div>
					<div className='row'>
						<div className='col-md-12'>
							<h2 className='display-4'>Temas, imagenes y cuestionarios</h2>
							<p className='lead text-muted'>
								Estos son los Temas creados por {user.name}
							</p>
							<div className='card card-body'>
								<div className='row'>
									<div className='col-6'>{dashtemaContent}</div>
									<hr />
									<div className='col-6'>{dashimagenesContent}</div>
								</div>
							</div>

							<div align='right'>
								<Link
									to={{
										pathname: `/cuestionarios`,
										state: {
											idTema: this.state.idTema,
											idImagen: this.state.idImagen
										}
									}}
									className='btn btn-lg btn-info'
								>
									Crear Cuestionario
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DashImage.propTypes = {
	getTemas: PropTypes.func.isRequired,
	getAllImages: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	image: PropTypes.object.isRequired,
	imagenes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	image: state.image,
	imagenes: state.imagenes,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getTemas, getImages, deleteAccount }
)(DashImage);

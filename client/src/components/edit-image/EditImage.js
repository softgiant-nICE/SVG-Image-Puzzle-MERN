import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createImage, getCurrentImage } from '../../actions/imageActions';
import isEmpty from '../../validation/is-empty';

class CreateImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentImage();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.image.image) {
			const image = nextProps.image.image;

			// Bring skills array back to CSV
			const skillsCSV = image.skills.join(',');

			// If image field doesnt exist, make empty string
			image.company = !isEmpty(image.company) ? image.company : '';
			image.website = !isEmpty(image.website) ? image.website : '';
			image.location = !isEmpty(image.location) ? image.location : '';
			image.githubusername = !isEmpty(image.githubusername)
				? image.githubusername
				: '';
			image.bio = !isEmpty(image.bio) ? image.bio : '';
			image.social = !isEmpty(image.social) ? image.social : {};
			image.twitter = !isEmpty(image.social.twitter)
				? image.social.twitter
				: '';
			image.facebook = !isEmpty(image.social.facebook)
				? image.social.facebook
				: '';
			image.linkedin = !isEmpty(image.social.linkedin)
				? image.social.linkedin
				: '';
			image.youtube = !isEmpty(image.social.youtube)
				? image.social.youtube
				: '';
			image.instagram = !isEmpty(image.social.instagram)
				? image.social.instagram
				: '';

			// Set component fields state
			this.setState({
				handle: image.handle,
				company: image.company,
				website: image.website,
				location: image.location,
				status: image.status,
				skills: skillsCSV,
				githubusername: image.githubusername,
				bio: image.bio,
				twitter: image.twitter,
				facebook: image.facebook,
				linkedin: image.linkedin,
				youtube: image.youtube,
				instagram: image.instagram
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const imageData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createImage(imageData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder='URL Perfil Twitter '
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>

					<InputGroup
						placeholder='URL Perfil Facebook'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>

					<InputGroup
						placeholder='URL Perfil Linkedin '
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>

					<InputGroup
						placeholder='URL Canal YouTube'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>

					<InputGroup
						placeholder='URL Pagina Instagram'
						name='instagram'
						icon='fab fa-instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		}

		// Select options for status
		const options = [
			{ label: 'Nivel de Escolaridad', value: 0 },
			{ label: '1er Primaria', value: '1er Primaria' },
			{ label: '2do Primaria', value: '2do Primaria' },
			{ label: '3er Primaria', value: '3er Primaria' },
			{ label: '4to Primaria', value: '4to Primaria' },
			{ label: '5to Primaria', value: '5to Primaria' },
			{ label: '6to Primaria', value: '6to Primaria' }
		];

		return (
			<div className='create-image'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<Link to='/dashimage' className='btn btn-light'>
								Regresar
							</Link>
							<h1 className='display-4 text-center'>Editar Curso</h1>
							<small className='d-block pb-3'>Campo requerido</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='Perfil Usuario'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info='Nombre de perfil. Tu nombre completo, nombre de la compañia, sobrenombre'
								/>
								<SelectListGroup
									placeholder='Estatus'
									name='status'
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info='Danos una idea de en que te especializas en tu carrera'
								/>

								<TextFieldGroup
									placeholder='Pagina Web'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info='Tu propio website o una compañia'
								/>

								<TextFieldGroup
									placeholder='Habilidades'
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Por favor use una ',' para separar los elementos (e.
                    Arquitectura,Computacion,Geografia,Artes"
								/>

								<TextAreaFieldGroup
									placeholder='Breve Biografia'
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info='Cuentanos un poco sobre ti'
								/>

								<input
									type='submit'
									value='Agregar'
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

CreateImage.propTypes = {
	createImage: PropTypes.func.isRequired,
	getCurrentImage: PropTypes.func.isRequired,
	image: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	image: state.image,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createImage, getCurrentImage }
)(withRouter(CreateImage));

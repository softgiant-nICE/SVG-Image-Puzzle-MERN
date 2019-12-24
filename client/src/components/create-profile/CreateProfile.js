import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
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

    this.props.createProfile(profileData, this.props.history);
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
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [{ label: "Estatus Profesional", value: 0 }, { label: "Docente", value: "Docente" }, { label: "Doctor", value: "Doctor" }, { label: "Maestro", value: "Maestro" }, { label: "Licenciado", value: "Licenciado" }, { label: "Estudiante en Licenciatura", value: "Estudiante en Licenciatura" }, { label: "Tutor o Técnico", value: "Tutor o Técnico" }, { label: "Interdisciplinario", value: "Interdisciplinario" }, { label: "Estudiante nivel primaria", value: "Estudiante nivel primaria" }, { label: "Estudiante nivel Bachillerato", value: "Estudiante nivel Bachillerato" }, { label: "Estudiante nivel prescolar", value: "Estudiante nivel prescolar" }, { label: "Otro", value: "Otro" }];

    return <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Crea tu Perfil</h1>
              <p className="lead text-center">
                Proporcionanos un poco mas de informacion para terminar
              </p>
              <small className="d-block pb-3">Campos Requeridos</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="Nombre de Usuario" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} info="Un unico nombre de usuario. Tu nombre completo, nombre de la compañia, sobrenombre" />
                <SelectListGroup placeholder="Status" name="status" value={this.state.status} onChange={this.onChange} options={options} error={errors.status} info="Danos una idea de lo que realizaste en tu carrera profesional" />
                <TextFieldGroup placeholder="Compañia" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} info="Puede ser tu propia compañia o una donde te incorpores" />
                <TextFieldGroup placeholder="Página Web" name="website" value={this.state.website} onChange={this.onChange} error={errors.website} info="Puede ser tu sitio web personal o de una compañia" />
                <TextFieldGroup placeholder="Ubicación" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} info="Pais o ciudad y estado sugerido (ej. Monterrey, MTY)" />
                <TextFieldGroup placeholder="Habilidades" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} info="Por favor use comas al separar sus habilidad (ej.
                    Geologo,Medico,Desarrollador,Diplomado,certificado,constancias" />
                <TextFieldGroup placeholder="Nombre de usuario de GitHub" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} info="Si deseas añadir los ultimos repositorios que creaste en GitHub (La comunidad mas popular para desarrollar, descubrir, compartir y generar nuevo software.). Y Si cuentas con una cuenta, incluye tu nombre de usuario" />
                <TextAreaFieldGroup placeholder="Biografia (Breve descripción)" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Cuentanos sobre ti" />

                <div className="mb-3">
                  <button type="button" onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }} className="btn btn-light">
                    Añadir links en redes sociales
                  </button>
                  <span className="text-muted">Opcional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Guardar Cambios" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);

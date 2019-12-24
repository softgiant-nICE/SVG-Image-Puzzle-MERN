import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ImageAbout extends Component {
  render() {
    const { image } = this.props;

    // Get first name
    const firstName = image.user.name.trim().split(" ")[0];

    // Skill List
    const skills = image.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info"> Descripción del Curso:</h3>
            <p className="lead">
              {isEmpty(image.bio) ? (
                <span>{firstName} No ha registrado ninguna biografia</span>
              ) : (
                <span>{image.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Temas a Desarrollar</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageAbout.propTypes = {
  image: PropTypes.object.isRequired
};

export default ImageAbout;

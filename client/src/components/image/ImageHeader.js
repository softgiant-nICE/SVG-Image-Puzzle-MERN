import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ImageHeader extends Component {
  render() {
    const { image } = this.props;

    return <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={image.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">

             
          <h1 className="display-4 text-center">Curso impartido por {image.user.name}</h1>
              <p className="lead text-center">
                {image.status} {isEmpty(image.company) ? null : <span>
                    en {image.company}
                  </span>}
              </p>
              {isEmpty(image.location) ? null : <p>{image.location}</p>}
              <p>
                {isEmpty(image.website) ? null : <a className="text-white p-2" href={image.website} target="_blank">
                    <i className="fas fa-globe fa-2x" />
                  </a>}

                {isEmpty(image.social && image.social.twitter) ? null : <a className="text-white p-2" href={image.social.twitter} target="_blank">
                    <i className="fab fa-twitter fa-2x" />
                  </a>}

                {isEmpty(image.social && image.social.facebook) ? null : <a className="text-white p-2" href={image.social.facebook} target="_blank">
                    <i className="fab fa-facebook fa-2x" />
                  </a>}

                {isEmpty(image.social && image.social.linkedin) ? null : <a className="text-white p-2" href={image.social.linkedin} target="_blank">
                    <i className="fab fa-linkedin fa-2x" />
                  </a>}

                {isEmpty(image.social && image.social.youtube) ? null : <a className="text-white p-2" href={image.social.youtube} target="_blank">
                    <i className="fab fa-youtube fa-2x" />
                  </a>}

              {isEmpty(image.social && image.social.instagram) ? null : <a className="text-white p-2" href={image.social.instagram} target="_blank">
                    <i className="fab fa-instagram fa-2x" />
                  </a>}
              </p>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default ImageHeader;

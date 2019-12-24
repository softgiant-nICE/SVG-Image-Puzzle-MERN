import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import ReactSVG from "react-svg";
import { Link } from "react-router-dom";

class ImageCreds extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { image } = this.props;

    // Skill List
    const imageSVG = image.map((svgImage, index) => (
      <div key={index} className="p-3">
        <Link
          to={{
            pathname: `/curso/${svgImage._id}`,
            state: { SVG: svgImage }
          }}
          className="btn btn-light mb-3 float-left"
        >
          <ReactSVG
            src={svgImage.imageSVG.url}
            evalScripts="always"
            fallback={() => <span>Error!</span>}
            onInjected={(error, svg) => {
              console.log(svg);
            }}
            renumerateIRIElements={false}
            svgClassName="svg-class-name"
            svgStyle={{ width: 300 }}
            className={svgImage._id}
            onClick={() => {
              console.log("svg");
            }}
          />
        </Link>
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Imagenes del curso</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {imageSVG}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageCreds.propTypes = {
  image: PropTypes.object.isRequired
};

export default ImageCreds;

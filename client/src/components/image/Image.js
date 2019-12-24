import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageHeader from "./ImageHeader";
import ImageAbout from "./ImageAbout";
import ImageCreds from "./ImageCreds";
import ImageGithub from "./ImageGithub";
import Spinner from "../common/Spinner";
import { getImageByHandle } from "../../actions/imageActions";

class Image extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getImageByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image.image === null && this.props.image.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { image, loading } = this.props.image;
    let imageContent;

    if (image === null || loading) {
      imageContent = <Spinner />;
    } else {
      imageContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/images" className="btn btn-light mb-3 float-left">
                Regresar
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ImageHeader image={image} />
          <ImageAbout image={image} />
          <ImageCreds image={image.addcurso} />
          {image.githubusername ? (
            <ImageGithub username={image.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="images">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{imageContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  getImageByHandle: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image
});

export default connect(
  mapStateToProps,
  { getImageByHandle }
)(Image);

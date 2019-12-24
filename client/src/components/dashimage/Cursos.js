import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTemas } from "../../actions/temasActions";
import {
  getImages,
  deleteAccount,
  deleteImagen
} from "../../actions/imageActions";
import Spinner from "../common/Spinner";
import ImageActions from "./ImageActions";
import AddCurso from "./AddCurso";
import Imagenes from "./Imagenes";

class DashImage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      temas: "",
      imagenes: ""
    };

    this.handleImagenes = this.handleImagenes.bind(this);
  }

  componentDidMount() {
    this.props.getImages();
    this.props.getTemas();
  }

  handleImagenes() {
    this.setState({
      imagenes: this.props.image.imagenes
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

    if (images === null || loading) {
      dashimagenesContent = <Spinner />;
    } else {
      // Check if logged in user has image data
      if (Object.keys(images).length > 0) {
        dashimagenesContent = (
          <div>
            <div>
              <h4 className="mb-4">Imagenes</h4>
            </div>
            <Imagenes addinfo={images} action={this.handleImagenes} />
          </div>
        );
      } else {
        // User is logged in but has no image
        dashimagenesContent = (
          <div>
            <div>
              <h4 className="mb-4">Imagenes</h4>
              <hr />
            </div>

            <p className="lead text-muted">
              Aun no haz creado ninguna imagen, porfavor añade una imagen
            </p>
            <Link to="/subir-imagen" className="btn btn-lg btn-info btn-sm">
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
              <h4 className="mb-4">Temas</h4>
            </div>

            <AddCurso addcurso={image} />
          </div>
        );
      } else {
        // User is logged in but has no image
        dashtemaContent = (
          <div>
            <div>
              <h4 className="mb-4">Temas</h4>
              <hr />
            </div>

            <p className="lead text-muted">
              Aun no haz creado ninguna Tema, porfavor añade un Tema
            </p>
            <Link to="/crear-tema" className="btn btn-lg btn-info btn-sm">
              Añadir Tema
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashimage">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4">Temas, imagenes y cuestionarios</h2>
              <p className="lead text-muted">
                Estos son los Temas creados por{" "}
                <Link to={`/image/${user.id}`}>{user.name}</Link>
              </p>
              <ImageActions />
              {dashtemaContent}
              <br />
              <hr />
              {dashimagenesContent}
              <div align="right">
                <Link to="cuestionarios" className="btn btn-lg btn-info">
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
  getImages: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getTemas, getImages, deleteAccount })(
  DashImage
);

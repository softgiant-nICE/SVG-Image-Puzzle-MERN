import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReactSVG from "react-svg";

/*Acciones que invoca la pestaña de agregar cursos*/
import { subirImagen, terminarImagen } from "../../actions/imageActions";

var d3 = require("d3");

class AddObjetos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idInput: "",
      objects: [],
      imageSVG: null,
      idObject: "",
      tag: "",
      imageElements: null,
      errors: {}
    };
    this.changeTag = this.changeTag.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    setTimeout(
      function() {
        //Start the timer
        var svgDoom = d3
          .select("svg")
          .selectAll("#maproot > g[id]:not([id=Leaves])");
        this.setState({ imageElements: svgDoom._groups[0] });

        const doomArray = Array.prototype.slice.call(svgDoom._groups[0]);
        const objects = [...this.state.objects];

        doomArray.map(item => {
          objects.push({
            idObject: item.id,
            tag: ""
          });
        });

        this.setState({ objects: objects });

        //After 100 miliseconds, set render to true
      }.bind(this),
      700
    );
  }

  changeTag = e => {
    console.log(e.target.id);

    let objects = [...this.state.objects];

    objects.map(exp => {
      if (exp.idObject === this.state.idInput) {
        exp.tag = e.target.value;
      }
      return exp;
    });

    this.setState({ objects }, () => console.log(this.state.objects));
  };

  onFocus = e => {
    this.setState({ idInput: e.target.id });
  };

  onSelect(e) {
    this.setState({
      idObject: e
    });

    let objects = [...this.state.objects];

    let objeto = objects.find(exp => {
      return exp.idObject === this.state.idObject;
    });

    if (objeto === undefined) {
      objects.push({
        idObject: this.state.idObject,
        tag: this.state.idObject
      });
      this.setState({ tag: this.state.idObject });
    } else {
      objects.map(exp => {
        if (exp.idObject === this.state.idObject) {
          this.setState({ tag: exp.tag });
        }
      });
    }

    this.setState({ objects });
  }

  onSubmit(e) {
    e.preventDefault();

    let img = this.props.location.state.idImagen;

    const formData = new FormData();
    formData.append("title", img.title);
    formData.append("description", img.description);
    formData.append("imageSVG", img.imageSVG);
    formData.append("objects", JSON.stringify(this.state.objects));

    this.props.terminarImagen(formData, this.props.history);
  }

  render() {
    let idImagen = this.props.location.state.idImagen;
    const imageElements = this.state.imageElements;

    const elementsToRetag =
      !!imageElements &&
      Object.values(imageElements).map((exp, index) => {
        return (
          <div key={index}>
            <label className="align-rigth col-4">{exp.id}: </label>
            <input
              type="text"
              className="etiqueta col-8"
              name={this.state.idObject}
              id={exp.id}
              value={this.state.objects[exp.id]}
              onChange={this.changeTag}
              onFocus={this.onFocus}
            />
          </div>
        );
      });

    return (
      <div className="add-curso container">
        <Link to="/dashimage" className="btn btn-light">
          Regresar
        </Link>
        <h2 className=" text-center">Etiqueta los objetos</h2>
        <p>
          Elije y etiqueta(*opcional) los objetos que podrán ser seleccionados
          para relacionar con preguntas
        </p>
        <div className="row">
          <div className="col-6 center">
            <ReactSVG
              src={idImagen.imageSVG}
              evalScripts="always"
              onInjected={svg => {
                var svgDoom = d3
                  .select("svg")
                  .selectAll("#maproot")
                  .selectAll("g[id]:not([id=Leaves])");

                const items = svgDoom._groups[0];
                if (!!items)
                  Object.values(items).map(key => {
                    if (key.id === this.state.idInput) {
                      key.style.stroke = "blue";
                      return key;
                    }
                    return null;
                  });
              }}
              renumerateIRIElements={false}
              svgStyle={{
                width: 500
              }}
              svgClassName={"imageSVG"}
              onClick={() => {
                console.log("SVG");
              }}
            />
          </div>
          <div className="col-6 mt-5">
            {elementsToRetag}
            <button
              className="btn btn-primary d-flex  align-self-center"
              onClick={this.onSubmit}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddObjetos.propTypes = {
  subirImagen: PropTypes.func.isRequired,
  terminarImagen: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image,
  errors: state.errors
});

export default connect(mapStateToProps, { subirImagen, terminarImagen })(
  withRouter(AddObjetos)
);

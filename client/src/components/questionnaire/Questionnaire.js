import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ImageQuest from "./ImageQuest";
import Quest from "./Quest";
import isEmpty from "../../validation/is-empty";

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      objects: []
    };

    this.onChange = this.onChange.bind(this);
    this.continue = this.continue.bind(this);
  }

  continue() {
    this.setState(() => {
      return { selected: [] };
    });
  }

  onChange(idObject) {
    let selected = [...this.state.selected];

    //Busca el elemento seleccionado
    let existObject = selected.find(element => {
      return element.idObject === idObject;
    });

    //Si no existe en la lista agregala
    if (!existObject) {
      selected.push({
        idObject: idObject
      });
    }
    //Si existe eliminala de la lista
    else {
      selected.splice(
        selected.findIndex(item => {
          return item.idObject === idObject;
        }),
        1
      );
    }
    //actualizacion
    this.setState({
      selected
    });
  }

  render() {
    let questContent;    

    if (typeof this.props.location.state === 'undefined') {
      const questionnaire = JSON.parse(localStorage.getItem('cuestionario'));
      const topic = questionnaire.idTema;
      const title = (questionnaire && questionnaire.title) || "";

      if (questionnaire === null || this.props.loading) {
        questContent = <Spinner />;
      } else {
        questContent = (
          <div className="row">
            <Link to="./../" className="btn btn-light mb-3 float-left">
              Regresar
            </Link>
          </div>
        );
      }

      return (
        <div className="quesrionnaire container">
          <div className="col-md-12">{questContent}</div>
          <div className="container card card-body bg-info text-white mb-3 ">
            <div className="col-md-12 text-center">
              <h2>{title}</h2>
              <hr />
            </div>
            <div className="col-md-12">
              <p>
                <b>Impartido Por:{"   "}</b>
                {questionnaire.user.name}
              </p>
              <b>Instrucciones:</b>
              <p>
                Contesta el cuestionario seleccionando los elementos de la imagen
              </p>
              <b>Resumen:</b>
              <p>{topic.resume}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <ImageQuest
                image={questionnaire.idImagen.imageSVG}
                onChange={this.onChange}
                selected={this.state.selected}
              />
            </div>
            <div className="col-md-6">
              <Quest
                objects={questionnaire.idImagen.objects}
                reactives={questionnaire.reactives}
                selected={this.state.selected}
                setSelect={this.continue}
              />
            </div>
          </div>
        </div>
      );
      localStorage.removeItem('cuestionario');

    } else {
      const questionnaire = this.props.location.state.questionnaire;
      const topic = questionnaire.idTema;
      const title = (questionnaire && questionnaire.title) || "";

      if (questionnaire === null || this.props.loading) {
        questContent = <Spinner />;
      } else {
        questContent = (
          <div className="row">
            <Link to="./../" className="btn btn-light mb-3 float-left">
              Regresar
            </Link>
          </div>
        );
      }

      return (
        <div className="quesrionnaire container">
          <div className="col-md-12">{questContent}</div>
          <div className="container card card-body bg-info text-white mb-3 ">
            <div className="col-md-12 text-center">
              <h2>{title}</h2>
              <hr />
            </div>
            <div className="col-md-12">
              <p>
                <b>Impartido Por:{"   "}</b>
                {questionnaire.user.name}
              </p>
              <b>Instrucciones:</b>
              <p>
                Contesta el cuestionario seleccionando los elementos de la imagen
              </p>
              <b>Resumen:</b>
              <p>{topic.resume}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <ImageQuest
                image={questionnaire.idImagen.imageSVG}
                onChange={this.onChange}
                selected={this.state.selected}
              />
            </div>
            <div className="col-md-6">
              <Quest
                objects={questionnaire.idImagen.objects}
                reactives={questionnaire.reactives}
                selected={this.state.selected}
                setSelect={this.continue}
              />
            </div>
          </div>
        </div>
      );
    }
    
    
  }
}

Questionnaire.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Questionnaire;

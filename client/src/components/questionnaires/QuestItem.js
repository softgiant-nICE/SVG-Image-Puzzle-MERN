import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class QuestItem extends Component {

  copyToClipboard = (ev) => {
    let select_id = `${ev.currentTarget.dataset.link}`
    var copyText = document.getElementById(select_id).value;
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];

    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = baseUrl + copyText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // save the state to localStorage
    const { cuestionario } = this.props;
    localStorage.setItem('cuestionario', JSON.stringify(cuestionario));

  };

  render() {
    const { cuestionario } = this.props;

    const buttonRender = (!!cuestionario && cuestionario.idImagen && (
      <Link
        to={{
          pathname: `/questionnaire/${cuestionario._id}`,
          state: { questionnaire: cuestionario }
        }}
        className="btn btn-info d-flex justify-content-center mt-3"
      >
        Ver Cuestionario
      </Link>
    )) || (
        <div className="btn-warning d-flex justify-content-center mt-3">
          Cuestionario no disponible
      </div>
      );

    const urlbuttonRender = (!!cuestionario && cuestionario.idImagen && (
      <div
        className="btn btn-info col-md-4"
        data-link={`${cuestionario._id}`}
        onClick={this.copyToClipboard}
      >
        <input
          type="hidden"
          id={`${cuestionario._id}`}
          value={`questionnaire/${cuestionario._id}`}
        ></input>
        URL
      </div>
    )) || (
        <div className="btn-warning d-flex justify-content-center mt-3">
          Cuestionario no disponible
      </div>
      );

    console.log(cuestionario);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={cuestionario.user.avatar}
              alt=""
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <p>
              {isEmpty(cuestionario.idTema) ? null : (
                <strong>
                  <span>{cuestionario.title}</span>
                </strong>
              )}
            </p>
            <>
              {isEmpty(cuestionario.idTema) ? null : (
                <div>Tema: {cuestionario.idTema.title}</div>
              )}
            </>
            Impartido Por: {cuestionario.user.name}
            <p>
              <span className="btn badge badge-success badge-pill mr-1">
                {(!!cuestionario &&
                  cuestionario.idTema &&
                  cuestionario.idTema.grade &&
                  cuestionario.idTema.grade) ||
                  ""}
              </span>
            </p>
            {urlbuttonRender}
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Temas Relacionados </h4>
            <ul className="list-group">
              {!!cuestionario.idTema.topics &&
                cuestionario.idTema.topics.map((topic, index) => {
                  return (
                    <li key={index} className="list-group-item">
                      <i className="fa fa-check pr-1" />
                      {topic}
                    </li>
                  );
                })}
            </ul>
            {buttonRender}
          </div>
        </div>
      </div>
    );
  }
}

QuestItem.propTypes = {
  cuestionario: PropTypes.object.isRequired
};

export default QuestItem;

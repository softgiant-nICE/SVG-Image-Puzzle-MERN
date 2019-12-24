import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Questionnaires from "./index";
import { getAllCuestionarios } from "../../actions/cuestionariosActions";

class AllQuestionnaires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ""
    };
    this.filtering = this.filtering.bind(this);
  }

  componentDidMount() {
    this.props.getAllCuestionarios();
  }

  filtering(e) {
    this.setState({ filter: e });
  }

  render() {
    const { loading, cuestionarios } = this.props.cuestionarios;
    const questionnaires = (!!cuestionarios && cuestionarios) || [];
    const distinto = (valor, indice, self) => {
      return self.indexOf(valor) === indice;
    };

    //De todos los cuestionarios se filtran segùn el tipo de filtro que se aplique
    const byGrade = grade => {
      const questByGrade = questionnaires.filter(quest => {
        return quest.idTema.grade === grade;
      });
      return questByGrade;
    };
    const byUser = user => {
      const questByUser = questionnaires.filter(quest => {
        return quest.user.name === user;
      });
      return questByUser;
    };
    const byTopic = topic => {
      const questByTopic = questionnaires.filter(quest => {
        return quest.idTema.title === topic;
      });
      return questByTopic;
    };

    //converte la lista de objetos a solamente un string con un campo representativo
    const auxProfesors = () => {
      const teacher =
        questionnaires.length > 0 &&
        questionnaires.map(quest => {
          return quest.user.name;
        });
      return teacher;
    };
    const auxGrades = () => {
      const grades =
        questionnaires.length > 0 &&
        questionnaires.map(quest => {
          return (!!quest.idTema.grade && quest.idTema.grade) || "";
        });
      return grades;
    };
    const auxTopic = () => {
      const topics =
        questionnaires.length > 0 &&
        questionnaires.map(quest => {
          return quest.idTema.title;
        });
      return topics;
    };

    //limpia la lista de elementos repetidos
    const profesors =
      auxProfesors().length > 0 && auxProfesors().filter(distinto);
    const grades = auxGrades().length > 0 && auxGrades().filter(distinto);
    const topics = auxTopic().length > 0 && auxTopic().filter(distinto);

    const profesorsToRender =
      profesors.length > 0 &&
      profesors.map((prof, index) => {
        return (
          <option value={prof} key={index}>
            {prof}
          </option>
        );
      });
    const gradesToRender =
      grades.length > 0 &&
      grades.map((grade, index) => {
        return (
          <option value={grade} key={index}>
            {grade}
          </option>
        );
      });
    const topicsToRender =
      topics.length > 0 &&
      topics.map((topic, index) => {
        return (
          <option value={topic} key={index}>
            {topic}
          </option>
        );
      });

    const render =
      (this.state.filter !== [] && this.state.filter) ||
      (questionnaires !== [] && questionnaires);

    const questionnairesToRender = () => {
      return <Questionnaires listToRender={render} loading={loading} />;
    };
    return (
      <>
        <h1 className="display-4 text-center">Todos los Cuestionarios</h1>
        <div className="d-flex justify-content-around align-items-center card-body bg-info text-white mb-3">
          <h3>Filtrar por:</h3>
          <div>
            <b>Usuarios: {"  "}</b>
            <select
              onChange={e => {
                this.filtering(byUser(e.currentTarget.value));
              }}
            >
              <option>selecciona</option>
              {profesorsToRender}
            </select>
          </div>
          <div>
            <b>Grado: {"  "}</b>
            <select
              onChange={e => {
                this.filtering(byGrade(e.currentTarget.value));
              }}
            >
              <option>selecciona</option>
              {gradesToRender}
            </select>
          </div>
          <div>
            <b>Tema: {"  "}</b>
            <select
              onChange={e => {
                this.filtering(byTopic(e.currentTarget.value));
              }}
            >
              <option>selecciona</option>
              {topicsToRender}
            </select>
          </div>
          <button
            onClick={() => {
              this.filtering(questionnaires);
            }}
          >
            Mostrar todo
          </button>
        </div>

        {questionnairesToRender()}
      </>
    );
  }
}

AllQuestionnaires.propTypes = {
  getAllCuestionarios: PropTypes.func.isRequired,
  cuestionarios: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cuestionarios: state.cuestionarios,
  errors: state.errors
});

export default connect(mapStateToProps, { getAllCuestionarios })(
  AllQuestionnaires
);

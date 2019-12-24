import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ImageItem from './ImageItem';
import { getAllCuestionarios } from '../../actions/cuestionariosActions';

class Images extends Component {
  componentDidMount() {
    this.props.getAllCuestionarios();
  }

  render() {
    const { loading, cuestionarios } = this.props.cuestionarios;
    let questItems;

    console.log(cuestionarios);
    if (cuestionarios === null || loading) {
      questItems = <Spinner />;
    } else {
      if (cuestionarios.length > 0) {
        questItems = cuestionarios.map(quest => (
          <ImageItem key={quest._id} cuestionario={quest} />
        ));
      } else {
        questItems = <h4>Ningun perfil encontrado...</h4>;
      }
    }

    return (
      <div className='cuestionarios'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Cursos</h1>
              <p className='lead text-center'>
                Navega y selecciona un curso de tu interes
              </p>
              {questItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Images.propTypes = {
  getAllCuestionarios: PropTypes.func.isRequired,
  cuestionarios: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cuestionarios: state.cuestionarios,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllCuestionarios }
)(Images);

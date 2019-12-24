import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questionnaires from './index';
import Spinner from '../common/Spinner';
import { getUserCuestionarios } from '../../actions/cuestionariosActions';

class UserQuestionnaires extends Component {
	componentDidMount() {
		this.props.getUserCuestionarios();
	}

	render() {
		const { loading, cuestionarios } = this.props.cuestionarios;
		return (
			<Questionnaires
				title='Mis cuestionarios'
				listToRender={cuestionarios}
				loading={loading}
			/>
		);
	}
}

UserQuestionnaires.propTypes = {
	getUserCuestionarios: PropTypes.func.isRequired,
	cuestionarios: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	cuestionarios: state.cuestionarios,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getUserCuestionarios }
)(UserQuestionnaires);

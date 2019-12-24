import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import QuestItem from './QuestItem';

const Questionnaires = ({
	title = '',
	listToRender = null,
	loading = null
}) => {
	let imageItems;

	if (listToRender === null || loading) {
		imageItems = <Spinner />;
	} else {
		if (listToRender.length > 0) {
			imageItems = listToRender.map(itemToRender => (
				<QuestItem key={itemToRender._id} cuestionario={itemToRender} />
			));
		} else {
			imageItems = <h4>Ningun cuestionario encontrado...</h4>;
		}
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12'>
					<p className='lead text-center'>
						Navega y selecciona el cuestionario de tu interés
					</p>
					{imageItems}
				</div>
			</div>
		</div>
	);
};

Questionnaires.propTypes = {
	title: PropTypes.object.isRequired,
	listToRender: PropTypes.array.isRequired
};

export default Questionnaires;

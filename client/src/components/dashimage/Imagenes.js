import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ReactSVG from 'react-svg';
import { deleteImagen } from '../../actions/imageActions';

class Imagenes extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			activeItem: {
				idItem: null,
				active: false
			}
		};
		this.handleActive = this.handleActive.bind(this);
	}

	handleActive(e) {
		this.setState({
			activeItem: {
				idItem: e.currentTarget.id,
				active: true
			}
		});
	}

	onDeleteClick(id) {
		this.props.deleteImagen(id);
	}

	render() {
		const addinfo = this.props.addinfo.map(exp => {
			let classnames = '';

			if (exp._id === this.state.activeItem.idItem) {
				classnames = 'card card-body text-light bg-dark mb-3 center container';
			} else {
				classnames = 'card card-body text-dark bg-light mb-3 center container';
			}
			return (
				<div
					id={exp._id}
					className={classnames}
					onClick={e => {
						this.handleActive(e);
						this.props.handleImagenItem(exp);
					}}
				>
					<tr className='d-flex align-items-center justify-content-center'>
						{' ' + exp.title} 
					</tr>

					<tr className='d-flex justify-content-center'>
						<ReactSVG
							src={exp.imageSVG}
							evalScripts='always'
							renumerateIRIElements={false}
							svgClassName='svg-class-name'
							svgStyle={{
								width: 200
							}}
							className='wrapper-class-name'
							onClick={() => {
								console.log('wrapper onClick');
							}}
						/>
					</tr>
					{(this.props.auth.user.id === exp.user ||
						this.props.auth.user.id === exp.user._id) && (
							<tr className='d-flex justify-content-around'>

							</tr>
						)}
				</div>
			);
		});

		return (
			<div>
				<h4 className='mb-4' />
				<table className='table'>
					<thead>
						<tr>
							<th>Elije una imagen</th>
						</tr>
					</thead>
					{addinfo}
				</table>
			</div>
		);
	}
}

Imagenes.propTypes = {
	deleteImagen: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteImagen }
)(Imagenes);

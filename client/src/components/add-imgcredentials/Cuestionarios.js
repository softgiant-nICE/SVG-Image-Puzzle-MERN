import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCuestionario } from '../../actions/cuestionariosActions';
import ReactSVG from 'react-svg';

var d3 = require('d3');

class Cuestionarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idImagen: '',
			idTema: '',
			title: '',
			reactives: [
				{
					id: 0,
					objects: [String],
					reactive: ''
				}
			],
			errors: {},
			activeItem: {
				idItem: null,
				active: false
			},

			count: 1
		};

		this.reactFocus = this.reactFocus.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.removeClick = this.removeClick.bind(this);
		this.addReactive = this.addReactive.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	componentDidMount(nextProps) {
		const selected = this.props.location.state;
		this.setState({ idImagen: selected.idImagen, idTema: selected.idTema });
	}

	onSubmit(e) {
		e.preventDefault();

		const questData = {
			idImagen: this.state.idImagen._id,
			idTema: this.state.idTema._id,
			title: this.state.title,
			reactives: this.state.reactives
		};

		this.props.createCuestionario(questData, this.props.history);
	}

	reactFocus(reactivofocus) {
		this.setState({
			activeItem: {
				idItem: reactivofocus.currentTarget.id,
				active: true
			}
		});
	}

	onSelect(objectSelected) {
		let reactives = [...this.state.reactives];

		reactives.forEach(reactive => {
			if (reactive.id === parseInt(this.state.activeItem.idItem)) {
				let object = reactive.objects.find(object => {
					return object === objectSelected;
				});

				if (object === undefined) {
					reactive.objects.push(objectSelected);
				} else {
					reactive.objects.splice(reactive.objects.indexOf(objectSelected), 1);
				}
			}
		});
		this.setState({ reactives });
	}

	onCheck = e => {
		e.preventDefault();
		if (['reactivo'].includes(e.target.className)) {
			let reactives = [...this.state.reactives];

			reactives[parseInt(e.target.id)].reactive = e.target.value;

			this.setState({ reactives, reactivo: e.target.value });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	addReactive(e) {
		e.preventDefault();

		this.setState(state => ({
			count: state.count + 1
		}));

		let reactives = [...this.state.reactives];

		reactives.push({
			id: this.state.count,
			reactive: '',
			objects: []
		});

		this.setState({ reactives });
	}

	removeClick(e) {
		e.preventDefault();

		let reactives = [...this.state.reactives];

		reactives.splice(e.target.id, 1);

		this.setState({ reactives });
	}

	render() {
		const { errors } = this.state;
		const selected = this.props.location.state;
		const reactives = this.state.reactives;

		let $formReactivos = null;
		if (this.state.reactives !== []) {
			$formReactivos = (
				<div className='col-md-12 '>
					<h4>Agrega reactivos </h4>

					<h5>{this.state.idObjeto}</h5>

					<button onClick={this.addReactive}>Nuevo reactivo</button>
					<hr />
					{reactives.map((exp, idx) => {
						let classnames = '';
						if (exp.id === parseInt(this.state.activeItem.idItem)) {
							classnames = 'card text-light bg-dark pb-3 col-8';
						} else {
							classnames = 'card text-darkd bg-light pb-3 col-8';
						}
						if (exp.id !== 0)
							return (
								<div className='row pb-3 mb-3' key={idx}>
									<div key={idx} className={classnames}>
										<label
											htmlFor={idx}
											className='text-center'
										>{`Reactivo #${idx}`}</label>
										<input
											type='text'
											id={exp.id}
											value={exp.reactive}
											className='reactivo'
											onClick={this.reactFocus}
											onChange={this.onCheck}
										/>
										<button id={idx} onClick={this.removeClick}>
											eliminar
										</button>
									</div>
									<div className='col-4 '>
										<ul className='list-group'>
											{exp.objects.map((object, index) => {
												const objeto = this.state.idImagen.objects.find(
													objeto => {
														return objeto.idObject === object;
													}
												);
												return (
													<li key={index} className='list-group-item'>
														<i className='fa fa-check pr-1' />
														{(!!objeto && objeto.tag) || object}
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							);
						else return null;
					})}
				</div>
			);
		} else {
			$formReactivos = (
				<div>
					<button onClick={this.addReactive}>Nuevo reactivo</button>
				</div>
			);
		}

		return (
			<div className='add-info'>
				<div className='' style={{ marginLeft: '100px', marginRight: '100px' }}>
					<Link to='./..' className='btn btn-light'>
						Regresar
					</Link>
					<h1 className=' text-center'>Nuevo cuestionario</h1>
					<p className='lead text-center'>
						Agrega informacion sobre el nuevo cuestionario:
					</p>
					<div className='row '>
						<div className='col-md-12 m-auto card card-body'>
							<div className='row'>
								<div className='col-5'>
									<ReactSVG
										src={selected.idImagen.imageSVG}
										evalScripts='always'
										onInjected={svg => {
											var svgDoom = d3
												.select('svg')
												.selectAll('#maproot')
												.selectAll('g[id]:not([id=Leaves])');
											let that = this;
											svgDoom
												.attr('opacity', '1')
												.on('mouseover', function(d, i) {
													svgDoom
														.transition()
														.duration(300)
														.attr('stroke', function(d, j) {
															return j !== i ? '' : 'yellow';
														})
														.attr('stroke-linejoin', 'bevel')
														.attr('stroke-width', '2')
														.attr('stroke-miterlimit', '.5')
														.attr('stroke-opacity', '.5');

													//d3.select(this).mouseoverShade(i);
												})

												.on('click', function(d, i) {
													svgDoom
														.transition()
														.duration(300)
														.attr('stroke', function(d, j) {
															return j !== i ? '' : 'blue';
														})
														.attr('stroke-linejoin', 'bevel')
														.attr('stroke-width', '2')
														.attr('stroke-miterlimit', '.5')
														.attr('stroke-opacity', '.5');
													that.onSelect(this.id);
												});
										}}
										renumerateIRIElements={false}
										svgClassName='svg'
										className='svg'
										onClick={() => {}}
									/>
								</div>
								<div className='col-7 mt-5'>
									<form onSubmit={this.onSubmit}>
										<h3>Titulo del cuestionario</h3>

										<TextFieldGroup
											placeholder='Título del cuestionario'
											name='title'
											value={this.state.title}
											error={errors.title}
											onChange={this.onCheck}
										/>
										<div className='raw'>{$formReactivos}</div>

										<input
											type='submit'
											value='Agregar'
											className='btn btn-info btn-block mt-4'
										/>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Cuestionarios.propTypes = {
	createCuestionario: PropTypes.func.isRequired,
	addInfo: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createCuestionario }
)(withRouter(Cuestionarios));

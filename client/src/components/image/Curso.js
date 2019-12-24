import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

var d3 = require('d3');

class Curso extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cursoId: '',
			curso: [],
			svgUrl: '',
			idObjeto: '',
			idReactivo: '',
			estadoReacivo: '',
			reactivos: [
				{
					idObjeto: null,
					reactivo: [
						{
							id: null,
							reac: String
						}
					]
				}
			],
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onReac = this.onReac.bind(this);
	}

	componentWillMount() {
		const { SVG } = this.props.location.state;

		this.setState({
			svgUrl: SVG.imageSVG.url,
			cursoId: SVG.imageSVG.idCurso
		});
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
	}

	onChange(e) {
		this.setState({
			idObjeto: e
		});
	}

	onReac(e) {
		let estado = null;

		if (this.state.idObjeto) {
			if (this.state.idObjeto === e.target.id) {
				estado = 'btn btn-success';
			} else {
				estado = 'btn btn-danger';
			}
		} else {
			estado = 'btn btn-default';
		}

		e.target.className = estado;

		this.setState({
			idReactivo: e.target.id,
			estadoReacivo: estado
		});
	}

	render() {
		const { SVG } = this.props.location.state;

		let $eduItems = null;

		if (SVG.imageSVG.reactivos !== []) {
			$eduItems = SVG.imageSVG.reactivos.map(reactivos => {
				return reactivos.reactivo.map(reactivo => {
					if (reactivo.reac !== '') {
						return (
							<li className='card'>
								<button
									className='btn btn-info'
									id={reactivos.idObjeto}
									onClick={this.onReac}
								>
									{reactivo.reac}
								</button>
							</li>
						);
					}
				});
			});
		} else {
			$eduItems = <h3>No existen reactivos por mostrar</h3>;
		}

		let $objeto = null;

		if (this.state.idObjeto) {
			$objeto = (
				<div align='center'>
					<h3>{this.state.idObjeto}</h3>
				</div>
			);
		} else {
			$objeto = (
				<div align='center'>
					<h5>
						Primero selecciona un elemento de la imagen y despues una respuestas
					</h5>
				</div>
			);
		}

		let $itemCurso = null;
		if (SVG !== null) {
			$itemCurso = (
				<div className='svg-space'>
					<h4 align='center'>{SVG.title}</h4>
					<ReactSVG
						src={SVG.imageSVG.url}
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
								})
								.on('mouseout', function(d, i) {
									svgDoom
										.transition()
										.duration(300)
										.attr('stroke', function(d, j) {
											return j !== i ? '' : 'yellow';
										})
										.attr('opacity', function(d, j) {
											return 1;
										});
									//d3.select(this).mouseoverShade(i);
								})
								.on('click', function(d) {
									d3.select(this)
										.classed('hover', true)
										.attr('stroke', 'blue')
										.attr('stroke-width', '0.5px');
									that.onChange(this.id);
								});
						}}
						renumerateIRIElements={false}
						svgClassName={this.state.cursoId}
						className={this.state.cursoId}
						onClick={() => {
							console.log('SVG');
						}}
					/>
				</div>
			);
		}

		return (
			<div className='info-curso '>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 m-auto'>
							<Link to='/dashimage' className='btn btn-light'>
								Regresar
							</Link>
							<h2 className='display-4 text-center'>
								{' '}
								Relaciona las columnas{' '}
							</h2>
							<h5 className=' text-center'>
								Solo da click a un elemento de la imagen y despues selecciona la
								sentencia que le pertenece
							</h5>
							<h5 className='text-center'>
								{' '}
								Si tu respuesta fue erronea, continua intentando.. consigue
								obtener todos los aciertos de color verde{' '}
							</h5>
						</div>

						<div className='card card-body bg-light bvdrf mb-3'>
							{$itemCurso}
						</div>
						<div className='col-6 col-md-6  card'>
							{$objeto}
							{$eduItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Curso.propTypes = {
	SVG: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
export default Curso;

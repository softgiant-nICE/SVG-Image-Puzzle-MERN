import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentImage, addReactivos } from '../../actions/imageActions';

import ReactSVG from 'react-svg';

var d3 = require('d3');

class EditSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgUrl: '',
      idObjeto: '',
      reactivos: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.addReactivo = this.addReactivo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeClick = this.removeClick.bind(this);
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.getCurrentImage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { curso } = this.props.location.state;

    this.setState({
      svgUrl: curso.imageSVG.url,
      reactivos: curso.imageSVG.reactivos,
      cursoId: curso.imageSVG.idCurso
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newExp = {

      cursoId: this.state.cursoId,
      svgUrl: this.state.svgUrl,
      reactivos: this.state.reactivos
    };
    this.props.addReactivos(newExp, this.props.history);
  }

  onChange(e) {
    this.setState({
      idObjeto: e
    });

    let reactivos = [...this.state.reactivos];

    let objeto = reactivos.find(exp => {
      return exp.idObjeto === this.state.idObjeto;
    });

    if (objeto === undefined) {
      reactivos.push({
        idObjeto: this.state.idObjeto,
        reactivo: []
      });
    }

    this.setState({ reactivos });
  }

  handleChange = e => {
    if (['reactivo'].includes(e.target.className)) {
      let reactivos = [...this.state.reactivos];
      reactivos.map(exp => {
        if (exp.idObjeto === this.state.idObjeto) {
          exp.reactivo.map((item, id) => {
            if (item.id === parseInt(e.target.id)) {
              exp.reactivo[id].reac = e.target.value;
            }
            return item;
          });
        }
        return exp;
      });

      /* reac[this.state.reactivos.idObjeto][e.target.className]["reac"] =
        e.target.value; */
      this.setState({ reactivos }, () => console.log(this.state.reactivos));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  removeClick(e) {
    e.preventDefault();

    let reactivos = [...this.state.reactivos];

    reactivos.map(reactivos => {
      if (this.state.idObjeto === reactivos.idObjeto) {
        reactivos.reactivo.splice(e.target.id, 1);
      }
    });

    this.setState({ reactivos });
  }

  addReactivo = e => {
    e.preventDefault();
    let reactivos = [...this.state.reactivos];
    reactivos.map(exp => {
      if (exp.idObjeto === this.state.idObjeto) {
        exp.reactivo.push({
          id: exp.reactivo.length,
          reac: ''
        });
      }
    });
    this.setState({ reactivos });
  };

  render() {
    let { reactivos } = this.state;
    let { url } = this.props;

    let $formReactivos = null;

    let $reacObjetos = null;

    let elemento = reactivos.filter(element => {
      return element.idObjeto === this.state.idObjeto;
    });

    if (this.state.idObjeto) {
      $formReactivos = (
        <div className='col-6 col-md-6 '>
          <h4>Agrega reactivos </h4>

          <h5>{this.state.idObjeto}</h5>

          <form onSubmit={this.onSubmit}>
            <button onClick={this.addReactivo}>Nuevo reactivo</button>
            {reactivos.map((exp, idx) => {
              if (exp.idObjeto === this.state.idObjeto) {
                return exp.reactivo.map((item, idy) => {
                  let reacId = `reac-${idy}`;
                  return (
                    <div key={idy}>
                      <label htmlFor={reacId}>{`Reactivo #${idy + 1}`}</label>
                      <input
                        type='text'
                        name={reacId}
                        data-id={idy}
                        id={idy}
                        value={item.reac}
                        className='reactivo'
                        onChange={this.handleChange}
                      />
                      <button id={idy} onClick={this.removeClick}>
                        eliminar
                      </button>
                    </div>
                  );
                });
              }
            })}
            <input type='submit' value='Submit' />
          </form>
        </div>
      );
    } else {
      $formReactivos = (
        <div>
          <h3>Selecciona un elemento</h3>
        </div>
      );
    }
    return (
      <div className='edit-svg '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 m-auto'>
              <Link to='/dashimage' className='btn btn-light'>
                Regresar
              </Link>
              <h2 className='display-4 text-center'>Agrega reactivos!</h2>
              <h3 className=' text-center'>
                Solo da clic a un elemento de la imagen
              </h3>
            </div>
            <div className='card card-body bg-light mb-3'>
              <div className='row'>
                <div className='col-6'>
                  <ReactSVG
                    src={this.state.svgUrl}
                    evalScripts='always'
                    onInjected={svg => {
                      var svgDoom = d3
                        .select('svg')
                        .selectAll('#maproot')
                        .selectAll('g[id]:not([id=Leaves])');
                      let that = this;
                      svgDoom
                        .attr('opacity', '1')
                        .on('mouseover', function (d, i) {
                          svgDoom
                            .transition()
                            .duration(300)
                            .attr('stroke', function (d, j) {
                              return j != i ? '' : 'yellow';
                            })
                            .attr('stroke-linejoin', 'bevel')
                            .attr('stroke-width', '2')
                            .attr('stroke-miterlimit', '.5')
                            .attr('stroke-opacity', '.5');

                          //d3.select(this).mouseoverShade(i);
                        })
                        .on('mouseout', function (d, i) {
                          svgDoom
                            .transition()
                            .duration(300)
                            .attr('stroke', function (d, j) {
                              return j != i ? '' : 'yellow';
                            })
                            .attr('opacity', function (d, j) {
                              return 1;
                            });
                          //d3.select(this).mouseoverShade(i);
                        })
                        .on('click', function (d) {
                          d3.select(this)
                            .classed('hover', true)
                            .attr('stroke', 'blue')
                            .attr('stroke-width', '0.5px');
                          that.onChange(this.id);
                        });
                    }}
                    renumerateIRIElements={false}
                    svgClassName='svg'
                    className='svg'
                    onClick={() => {
                      console.log('wrapper onClick');
                    }}
                  />
                </div>
                {$formReactivos}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditSvg.propTypes = {
  addCurso: PropTypes.func.isRequired,
  getCurrentImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  image: state.image,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addReactivos, getCurrentImage }
)(withRouter(EditSvg));

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import ReactSVG from "react-svg";

var d3 = require("d3");

class CursoItem extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  onChange(e) {
    this.setState({
      idObjeto: e
    });
  }
  render() {
    const { key, svgUrl } = this.props;
    return (
      <div className="svg-space">
        <h4>{this.props.title}</h4>
        {/* aqui se muestran todas las imagenes del curso en lista */}
        <ReactSVG
          src={this.props.svgUrl}
          evalScripts="always"
          onInjected={svg => {
            var svgDoom = d3
              .select("svg")
              .selectAll("#maproot")
              .selectAll("g[id]:not([id=Leaves])");
            let that = this;
            svgDoom
              .attr("opacity", "1")
              .on("mouseover", function(d, i) {
                svgDoom
                  .transition()
                  .duration(300)
                  .attr("stroke", function(d, j) {
                    return j != i ? "" : "yellow";
                  })
                  .attr("stroke-linejoin", "bevel")
                  .attr("stroke-width", "2")
                  .attr("stroke-miterlimit", ".5")
                  .attr("stroke-opacity", ".5");

                //d3.select(this).mouseoverShade(i);
              })
              .on("mouseout", function(d, i) {
                svgDoom
                  .transition()
                  .duration(300)
                  .attr("stroke", function(d, j) {
                    return j != i ? "" : "yellow";
                  })
                  .attr("opacity", function(d, j) {
                    return 1;
                  });
                //d3.select(this).mouseoverShade(i);
              })
              .on("click", function(d) {
                d3.select(this)
                  .classed("hover", true)
                  .attr("stroke", "blue")
                  .attr("stroke-width", "0.5px");
                that.onChange(this.id);
              });
          }}
          renumerateIRIElements={false}
          svgClassName={key}
          className={key}
          onClick={() => {
            console.log("wrapper onClick");
          }}
        />
      </div>
    );
  }
}

CursoItem.propTypes = {
  cursoItem: PropTypes.object.isRequired
};

export default CursoItem;

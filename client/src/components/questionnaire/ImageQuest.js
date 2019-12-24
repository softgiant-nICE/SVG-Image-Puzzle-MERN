import React, { useState, useEffect } from 'react';
import ReactSVG from 'react-svg';

var d3 = require('d3');

const ImageQuest = ({ image = null, onChange = null, selected = [] }) => {
	return (
		<div>
			<ReactSVG
				src={image}
				evalScripts='always'
				onInjected={svg => {
					var svgDoom = d3
						.select('svg')
						.selectAll('#maproot')
						.selectAll('g[id]:not([id=Leaves])');
					const svgDoomAux = svgDoom.filter(function(d, i) {
						const ifExist = selected.find(element => {
							return element.idObject === this.id;
						});
						return ifExist;
					});
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
							onChange(this.id);
						});

					const items = svgDoom._groups[0];
					if (!!items)
						Object.values(items).map((key, value) => {
							const ifExist = selected.find(element => {
								return element.idObject === key.id;
							});
							if (!!ifExist) {
								key.style.stroke = 'blue';
								return key;
							} else return null;
						});
				}}
				renumerateIRIElements={false}
				svgStyle={{
					width: 500
				}}
				svgClassName={'svg-image'}
				className={'svg-image'}
				onClick={() => {
					console.log('SVG');
				}}
			/>
		</div>
	);
};

export default ImageQuest;

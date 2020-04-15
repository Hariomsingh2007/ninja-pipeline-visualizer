import React from 'react'
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

// Working code

export default class D3Chart extends React.Component {
    constructor () {
        super();
    }

    componentDidMount() {

var width = 960,
    height = 400,
    center = [width / 2, height / 2];
//
var svg = d3.select('svg'),
    inner = svg.select('g');
//

var zoom = d3.behavior.zoom()
.translate([0, 0])
.scale(1)
.size([900, 400])
.scaleExtent([1, 8])
.on('zoom', zoomed);
//
svg
   .call(zoom) // delete this line to disable free zooming
   .call(zoom.event);

function zoomed() {
   inner.attr('transform', 'translate(' + zoom.translate() + ')scale(' + zoom.scale() + ')');
}

function interpolateZoom(translate, scale) {
   var self = this;
   return d3.transition().duration(350).tween('zoom', function () {
      var iTranslate = d3.interpolate(zoom.translate(), translate),
          iScale = d3.interpolate(zoom.scale(), scale);
      return function (t) {
         zoom
            .scale(iScale(t))
            .translate(iTranslate(t));
         zoomed();
      };
   });
}

function zoomClick() {
   var clicked = d3.event.target,
       direction = 1,
       factor = 0.2,
       target_zoom = 1,
       center = [width / 2, height / 2],
       extent = zoom.scaleExtent(),
       translate = zoom.translate(),
       translate0 = [],
       l = [],
       view = {
          x: translate[0],
          y: translate[1],
          k: zoom.scale()
       };

   d3.event.preventDefault();
   direction = (this.id === 'zoom_in') ? 1 : -1;
   target_zoom = zoom.scale() * (1 + factor * direction);

   if (target_zoom < extent[0] || target_zoom > extent[1]) {
      return false;
   }

   translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
   view.k = target_zoom;
   l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

   view.x += center[0] - l[0];
   view.y += center[1] - l[1];

   interpolateZoom([view.x, view.y], view.k);
}

d3.selectAll('button').on('click', zoomClick);
//
//
//
//  tcp-state-diagram EXAMPLE
//
// Create a new directed graph
var g = new dagreD3.graphlib.Graph()
  .setGraph({rankdir :"LR"})
  .setDefaultEdgeLabel(function() { return {}; });

// Here we"re setting nodeclass, which is used by our custom drawNodes function
// below.
g.setNode(0,  { label: "TOP",       class: "type-TOP" });
g.setNode(1,  { label: "S",         class: "type-S" });
g.setNode(2,  { label: "NP",        class: "type-NP" });
g.setNode(3,  { label: "DT",        class: "type-DT" });
g.setNode(4,  { label: "This",      class: "type-TK" });
g.setNode(5,  { label: "VP",        class: "type-VP" });
g.setNode(6,  { label: "VBZ",       class: "type-VBZ" });
g.setNode(7,  { label: "is",        class: "type-TK" });
g.setNode(8,  { label: "NP",        class: "type-NP" });
g.setNode(9,  { label: "DT",        class: "type-DT" });
g.setNode(10, { label: "an",        class: "type-TK" });
g.setNode(11, { label: "NN",        class: "type-NN" });
g.setNode(12, { label: "example",   class: "type-TK" });
g.setNode(13, { label: ".",         class: "type-." });
g.setNode(14, { label: "sentence",  class: "type-TK" });

g.nodes().forEach(function(v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Set up edges, no special attributes.
g.setEdge(3, 4);
g.setEdge(2, 3);
g.setEdge(1, 2);
g.setEdge(6, 7);
g.setEdge(5, 6);
g.setEdge(9, 10);
g.setEdge(8, 9);
g.setEdge(11,12);
g.setEdge(8, 11);
g.setEdge(5, 8);
g.setEdge(1, 5);
g.setEdge(13,14);
g.setEdge(1, 13);
g.setEdge(0, 1)

// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
var initialScale = 0.75;
var _height = svg.attr('height') - g.graph().height;
var _width = svg.attr('width') - g.graph().width;
console.log(height / _height);

zoom.translate([(svg.attr('width') - g.graph().width * initialScale) / 2, 10]).scale(1).event(svg);




    }


    render() {
      return (
      <div className ="harry-pipeline">
        <div className ="pipeline-wrapper">
        <svg id="nodeTree" width="1425" height="700" >
        <g>  </g>
        </svg>
        </div>
        </div>
        )
    };
}
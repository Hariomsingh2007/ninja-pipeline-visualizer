import React from 'react'
import * as d3 from 'd3'
import dagreD3 from 'dagre-d3'

export default class D3Chart extends React.Component {
    constructor() {
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
            return d3.transition().duration(350).tween('zoom', function() {
                var iTranslate = d3.interpolate(zoom.translate(), translate),
                    iScale = d3.interpolate(zoom.scale(), scale);
                return function(t) {
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

        // Create a new directed graph
        var g = new dagreD3.graphlib.Graph()
            .setGraph({
                rankdir: "LR"
            })
            .setDefaultEdgeLabel(function() {
                return {};
            });

        var node_info = (this.props.node_information)

        node_info.forEach(function(state) {

            if (state["NodeUrl"]) {

                g.setNode(state["NodeID"], {
                    labelType: "html",
                    label: "<a href=" + state["NodeUrl"] + ">" + state["NodeName"] + "</a>",
                    style: "fill: " + state["NodeColor"]

                });

            } else {

                g.setNode(state["NodeID"], {
                    labelType: "html",
                    label: state["NodeName"],
                    style: "fill: " + state["NodeColor"]
                });
            }
        });

        var node_relations = (this.props.node_relation)
        // Set up the edges
        for (var i = 0; i < node_relations.length; i++) {
            g.setEdge(node_relations[i][0], node_relations[i][1], {

            });
        }
        // giving shape to the box
        g.nodes().forEach(function(v) {
            var node = g.node(v);
            // Round the corners of the nodes
            node.rx = node.ry = 5;
        });

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
        return ( <
            div className = "harry-pipeline" >
            <
            div className = "pipeline-wrapper" >
            <
            svg id = "nodeTree"
            width = "1425"
            height = "700" >
            <
            g > < /g> <
            /svg> <
            /div> <
            /div>
        )
    };
}
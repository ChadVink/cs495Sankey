console.log("Bezier Test");

// var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
//                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
//                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
//
// var lineFunction = d3.svg.line()
//   .x(function(d) {
//     return d.x;
//   })
//   .y(function(d) {
//     return d.y;
//   })
//   .interpolate("linear");
//
// var svgContainer = d3.select("body").append("svg")
//   .attr("height", 200)
//   .attr("width", 200);
//
// var lineGraph = svgContainer.append("path")
//   .attr("d", lineFunction(lineData))
//   .attr("stroke", "blue")
//   .attr("stroke-width", 4)
//   .attr("fill", "none");

// indy = function() {
//   indy.nodes = function(_) {
//     if (!arguments.length) return nodes;
//     nodes = _;
//     return sankey;
//   };
//
//   indy.links = function(_) {
//     if (!arguments.length) return links;
//     links = _;
//     return sankey;
//   };


var nodes = [
{
  "node":0,
  "x": 50,
  "y": 50,
  "color": "blue"
}, {
  "node":1,
  "x": 50,
  "y": 300,
  "color": "blue"
}, {
  "node":2,
  "x": 350,
  "y": 50,
  "color": "green"
}, {
  "node":3,
  "x": 350,
  "y": 300,
  "color": "green"
}, {
  "node":4,
  "x": 650,
  "y": 50,
  "color": "red"
}, {
  "node":5,
  "x": 650,
  "y": 300,
  "color": "red"
}];

var links = [
  {"source":1, "target":2},
  {"source":3, "target":4}
]

var moreRectData = {
  "source":{
    "node":1,
    "x": 50,
    "y": 300,
    "color": "blue"
  },
  "target":{
    "node":2,
    "x": 350,
    "y": 50,
    "color": "green"
  }
};




var svg = d3.select("#bezier-demo")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1000);

var rectangle = svg.selectAll("rect")
  .data(nodes)
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return d.x;
  })
  .attr("y", function(d) {
    return d.y;
  })
  .attr("height", 100)
  .attr("width", 15)
  .style("fill", function(d) {
    return d.color;
  })
  .attr('id', function(d,i){
    return "rect" + i;
  });

// var curvature = .5;
//
// function link(d) {
//   var x0 = d.source.x + d.source.dx,
//       x1 = d.target.x,
//       xi = d3.interpolateNumber(x0, x1),
//       x2 = xi(curvature),
//       x3 = xi(1 - curvature),
//       y0 = d.source.y + d.sy + d.dy / 2,
//       y1 = d.target.y + d.ty + d.dy / 2;
//   return "M" + x0 + "," + y0
//        + "C" + x2 + "," + y0
//        + " " + x3 + "," + y1
//        + " " + x1 + "," + y1;
// }


var bezierLine = d3.svg.line()
  .x(function(d) {
    return d[0];
  })
  .y(function(d) {
    return d[1];
  })
  .interpolate("basis");

var height = 100,
  width = 15;

var topZone = 150,
  bottomZone = 300;

var quarterZone = d3.interpolate(topZone, bottomZone)(0.25),
  middleZone = d3.interpolate(topZone, bottomZone)(0.5),
  threeQuarterZone = d3.interpolate(topZone, bottomZone)(0.75);

  var path_width = 50;


function pathGen(d) {
  var x0 = d.source.x + width,
      y0 = d.source.y + path_width/2,
      x4 = d.target.x,
      y4 = d.target.y + path_width/2;
  var xi = d3.interpolateNumber(x0, x4),
      x1 = xi(0.3),
      y1 = y0,
      x2 = xi(0.5),
      y2 = d3.interpolateNumber(y0, y4)(0.5),
      x3 = xi(0.7),
      y3 = y4;
  return [
    [x0,y0],[x1,y1],[x2,y2],[x3,y3],[x4,y4]
  ];
}


// function computeNodeLinks() {
//   nodes.forEach(function(node) {
//     node.sourceLinks = [];
//     node.targetLinks = [];
//   });
//   links.forEach(function(link) {
//     var source = link.source,
//         target = link.target;
//     if (typeof source === "number") source = link.source = nodes[link.source];
//     if (typeof target === "number") target = link.target = nodes[link.target];
//     source.sourceLinks.push(link);
//     target.targetLinks.push(link);
//   });
// }

// var pathContainer = svg;
// pathContainer.selectAll('path')
//   .data(rectData)
//   .enter();

svg.append("path")
  .attr("d", bezierLine(pathGen(moreRectData)))
  .attr("stroke", "grey")
  .attr("stroke-width", path_width)
  .attr("fill", "none")
  .attr("opacity", 0.5)
  .transition()
  .duration(2000)
  .attrTween("stroke-dasharray", function() {
    var len = this.getTotalLength();
    return function(t) {
      return (d3.interpolateString("0," + len, len + ",0"))(t);
    };
  });


// Works!!
  // svg.append('path')
  //   .attr("d", bezierLine(pathGen(moreRectData)) )
  //   .attr("stroke", "grey")
  //   .attr("stroke-width", path_width)
  //   .attr("fill", "none")
  //   .attr("opacity", 0.5)
  //   .transition()
  //   .duration(2000)
  //   .attrTween("stroke-dasharray", function() {
  //     var len = this.getTotalLength();
  //     return function(t) {
  //       return (d3.interpolateString("0," + len, len + ",0"))(t);
  //     };
  //   });


// svg.append('path')
//   .attr("d", bezierLine([
//     // Start point [x, y]
//     [rectData[0].x + width, rectData[0].y + (path_width / 2)],
//
//     // flex point with same Start point (y) and 0.3 interpolate of mid pint (x)
//     [d3.interpolate(rectData[0].x+width, rectData[2].x)(0.3), rectData[0].y + (path_width / 2)],
//     // mid point between start point (x), end curve point (x) and start point (y), end curve point (y)
//     [d3.interpolate(rectData[0].x+width, rectData[2].x)(0.5), d3.interpolate(rectData[0].y + (path_width / 2), middleZone)(0.5)],
//     // flex point with same end curve point (y) and 0.7 interpolate of mid pint (x)
//     [d3.interpolate(rectData[0].x+width, rectData[2].x)(0.7), middleZone],
//
//     // end curve point [x, y]
//     [d3.interpolate(rectData[0].x+width, rectData[5].x)(0.5), middleZone],
//
//     [d3.interpolate(rectData[3].x+width, rectData[5].x)(0.3), middleZone],
//     [d3.interpolate(rectData[3].x+width, rectData[5].x)(0.5), threeQuarterZone],
//     [d3.interpolate(rectData[3].x+width, rectData[5].x)(0.7), rectData[5].y + (path_width / 2)],
//
//     [rectData[5].x, rectData[5].y + (path_width / 2)]
//   ]))
//   .attr("stroke", "grey")
//   .attr("stroke-width", path_width)
//   .attr("fill", "none")
//   .attr("opacity", 0.5)
//   .transition()
//   .duration(2000)
//   .attrTween("stroke-dasharray", function() {
//     var len = this.getTotalLength();
//     return function(t) {
//       return (d3.interpolateString("0," + len, len + ",0"))(t);
//     };
  // });
  //
  //     var path1 = [
  //         {"x":rectData[0].x + width, "y":rectData[0].y + (path_width / 2)},
  //
  //         {"x":d3.interpolate(rectData[0].x+width, rectData[2].x)(0.3), "y":rectData[0].y + (path_width / 2)},
  //         {"x":d3.interpolate(rectData[0].x+width, rectData[2].x)(0.5), "y":d3.interpolate(rectData[0].y + (path_width / 2), middleZone)(0.5)},
  //         {"x":d3.interpolate(rectData[0].x+width, rectData[2].x)(0.7), "y":middleZone},
  //
  //         {"x":d3.interpolate(rectData[0].x+width, rectData[5].x)(0.5), "y":middleZone},
  //
  //         {"x":d3.interpolate(rectData[3].x+width, rectData[5].x)(0.3), "y":middleZone},
  //         {"x":d3.interpolate(rectData[3].x+width, rectData[5].x)(0.5), "y":threeQuarterZone},
  //         {"x":d3.interpolate(rectData[3].x+width, rectData[5].x)(0.7), "y":rectData[5].y + (path_width / 2)},
  //
  //         {"x":rectData[5].x, "y":rectData[5].y + (path_width / 2)}
  //     ];
  //
  //   svg.selectAll('circle')
  //     .data(path1)
  //     .enter()
  //     .append('circle')
  //     .attr('cx', function(d){return d.x;})
  //     .attr('cy', function(d){return d.y;})
  //     .attr('fill', 'blue')
  //     .attr('r', 5);




      //
      // svg.append('path')
      //   .attr("d", bezierLine([
      //     [rectData[1].x + width, rectData[1].y + (path_width / 2)],
      //     [rectData[1].x + width+25, rectData[1].y + (path_width / 2)],
      //
      //     [d3.interpolate(rectData[1].x+width, rectData[2].x)(0.25), threeQuarterZone],
      //     [d3.interpolate(rectData[1].x+width, rectData[2].x)(0.5), middleZone],
      //     [d3.interpolate(rectData[1].x+width, rectData[2].x)(0.75), quarterZone],
      //
      //     [rectData[2].x-25, rectData[2].y + (path_width / 2)],
      //     [rectData[2].x, rectData[2].y + (path_width / 2)]
      //   ]))
      //   .attr("stroke", "grey")
      //   .attr("stroke-width", path_width)
      //   .attr("fill", "none")
      //   .attr("opacity", 0.5)
      //   .transition()
      //   .duration(2000)
      //   .attrTween("stroke-dasharray", function() {
      //     var len = this.getTotalLength();
      //     return function(t) {
      //       return (d3.interpolateString("0," + len, len + ",0"))(t);
      //     };
      //   });
      //
        // svg.append('path')
        //   .attr("d", bezierLine([
        //     [rectData[1].x + width, rectData[1].y + (path_width / 2) + path_width],
        //     [rectData[1].x + width+25, rectData[1].y + (path_width / 2) + path_width],
        //
        //     //[d3.interpolate(rectData[1].x+width, rectData[2].x)(0.25), threeQuarterZone],
        //     [d3.interpolate(rectData[1].x+width, rectData[4].x)(0.5), middleZone],
        //     [d3.interpolate(rectData[2].x+width, rectData[4].x)(0.75), quarterZone],
        //
        //     [rectData[4].x-25, rectData[4].y + (path_width / 2)],
        //     [rectData[4].x, rectData[4].y + (path_width / 2)]
        //   ]))
        //   .attr("stroke", "grey")
        //   .attr("stroke-width", path_width)
        //   .attr("fill", "none")
        //   .attr("opacity", 0.5)
        //   .transition()
        //   .duration(2000)
        //   .attrTween("stroke-dasharray", function() {
        //     var len = this.getTotalLength();
        //     return function(t) {
        //       return (d3.interpolateString("0," + len, len + ",0"))(t);
        //     };
        //   });
    // //

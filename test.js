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

var rectData = [{"x":50 , "y":50, "color": "blue" },{"x":50 , "y":300, "color": "blue"},{"x":350 , "y":50, "color": "green"},
  {"x":350 , "y":300, "color": "green"},{"x":650 , "y":50, "color": "red" },{"x":650 ,"y":300, "color":"red" }];


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

var svg = d3.select("#bezier-demo")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1000);

  var rectangle = svg.selectAll("rect")
    .data(rectData)
    .enter()
    .append("rect")
    .attr("x", function(d){return d.x;})
    .attr("y", function(d){return d.y;})
    .attr("height", 100)
    .attr("width", 15)
    .style("fill", function(d){return d.color;});

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

var path_width = 35;
svg.append('path')
  .attr("d", bezierLine([
    [50+width, 300+(path_width/2)],
    [50+width+(path_width/2), 300+(path_width/2)],
    [150, 305],
    [250, 275],
    [350, 225],
    [450, 180],
    [550, 100],
    [650-width, 50+(path_width/2)],
    [650, 50+(path_width/2)]
  ]))
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
//
//   svg.append('path')
//     .attr("d", bezierLine([
//       [0, 0],
//       [25, 70],
//       [50, 30],
//       [100, 150],
//       [300, 100],
//       [500, 130],
//       [700, 300]
//     ]))
//     .attr("stroke", "blue")
//     .attr("stroke-width", 5)
//     .attr("fill", "none")
//     .on("mouseover", function() { return d3.select(this).attr("stroke", "white");})
//   .transition()
//     .duration(2000)
//     .attrTween("stroke-dasharray", function() {
//       var len = this.getTotalLength();
//       return function(t) {
//         return (d3.interpolateString("0," + len, len + ",0"))(t);
//       };
//     });

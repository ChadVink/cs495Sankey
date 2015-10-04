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

var bezierLine = d3.svg.line()
  .x(function(d) {
    return d[0];
  })
  .y(function(d) {
    return d[1];
  })
  .interpolate("basis");

var svg = d3.select("#bezier-demo")
  .append("svg")
  .attr("width", 700)
  .attr("height", 300);

svg.append('path')
  .attr("d", bezierLine([
    [0, 0],
    [25, 70],
    [50, 30],
    [100, 150],
    [300, 100],
    [500, 130],
    [700, 300]
  ]))
  .attr("stroke", "red")
  .attr("stroke-width", 15)
  .attr("fill", "none")
.transition()
  .duration(2000)
  .attrTween("stroke-dasharray", function() {
    var len = this.getTotalLength();
    return function(t) {
      return (d3.interpolateString("0," + len, len + ",0"))(t);
    };
  });

  svg.append('path')
    .attr("d", bezierLine([
      [0, 0],
      [25, 70],
      [50, 30],
      [100, 150],
      [300, 100],
      [500, 130],
      [700, 300]
    ]))
    .attr("stroke", "blue")
    .attr("stroke-width", 5)
    .attr("fill", "none")
    .on("mouseover", function() { return d3.select(this).attr("stroke", "white");})
  .transition()
    .duration(2000)
    .attrTween("stroke-dasharray", function() {
      var len = this.getTotalLength();
      return function(t) {
        return (d3.interpolateString("0," + len, len + ",0"))(t);
      };
    });

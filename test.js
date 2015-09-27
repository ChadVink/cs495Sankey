console.log("Bezier Test");

var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

var lineFunction = d3.svg.line()
                        .x( function(d){ return d.x;} )
                        .y( function(d){ return d.y;} )
                        .interpolate("linear");

var svgContainer = d3.select("body").append("svg")
                                    .attr("height", 200)
                                    .attr("width", 200);

var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                            .attr("stroke-width", 4)
                            .attr("fill", "none");

var margin = {
  "top": 25,
  "right": 20,
  "bottom": 30,
  "left": 70
};
var width = 1200 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var svgMain = d3.select("body").append("svg")
  .attr("class", "svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 120, "y": 20}];

                 var rectangle1 = svgMain
                   .append("rect")
                   .attr("fill", "blue")
                   .attr("id", "rectangle1")
                   .attr("width", 50)
                   .attr("height", 50);

                var rectangle2= svgMain
                    .append("rect")
                    .attr("fill", "yellow")
                    .attr("class", "rectangle")
                    .attr("width", 50)
                    .attr("height", 50)
                    .attr("transform", "translate(169, 15)");

 var bezierLine = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("basis");

    var svg = svgMain
        .append("svg")
        .attr("width", 300)
        .attr("height", 150);

    svg.append('path')
        .attr("d", bezierLine(lineData))
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .attr("transform", "translate(49, 20)");

document.getElementById('rectangle1').onmousedown = function() {
  this.style.position = 'absolute'
  var self = this
  document.onmousemove = function(e) {
    e = e || event
    fixPageXY(e)
    // put ball center under mouse pointer. 25 is half of width/height
    self.style.left = e.pageX-25+'px'
    self.style.top = e.pageY-25+'px'
  }
  this.onmouseup = function() {
    document.onmousemove = null
  }
}
document.getElementById('rectangle1').ondragstart = function() { return false }

function fixPageXY(e) {
  if (e.pageX == null && e.clientX != null ) {
    var html = document.documentElement
    var body = document.body
    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
    e.pageX -= html.clientLeft || 0
    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
    e.pageY -= html.clientTop || 0
  }
}

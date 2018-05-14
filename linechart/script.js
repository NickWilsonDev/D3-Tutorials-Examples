/* script.js */

var svg = d3.select("svg"),

// set dimensions of graph / canvas


// probably parse date / time  year-month-day hour:minute:second
let parseDate = d3.time.format("%y-%b-%d :%H:%M:%S").parse;

// set the ranges
let x = d3.time.scale().range([0, width]);
let y = d3.scale.linear().range([height, 0]);

// Define the axes
let xAxis = d3.svg.axis().scale(x)
    .orient('bottom').ticks(5);

let yAxis = d3.svg.axis().scale(y)
    .orient('left').ticks(5);

// define the line


d3.json("data.json", function(d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}

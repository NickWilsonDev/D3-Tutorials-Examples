/* script.js */

var svg = d3.select("svg");
console.log(svg);

// set dimensions of graph / canvas
var width = 800;
var height = 800;

// probably parse date / time  year-month-day hour:minute:second
let parseDate = d3.timeFormat("%y-%b-%d :%H:%M:%S").parse;
console.log(parseDate);

// set the ranges
let x = d3.scaleTime().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

// Define the axes
//let xAxis = d3.svg.axisBottom().scale(x);

//let yAxis = d3.svg.axis().scale(y)
//    .orient('left').ticks(5);

 // define the line
    let line = d3.line()
        .x(function(d) {return x(d.time); })
        .y(function(d) {return y(d.temperature); });


var svg = d3.select("svg");
// get the data
d3.json("data.json", function(error, data) {
    if (error) {
        console.log(error);
        throw error;
    }
    
    //format the data
    data.forEach(function(d) {
        d.time = parseDate(d.time);
        console.log(d.time);
        d.temperature = +d.temperature;
    });

   
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.time; }));
    y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});

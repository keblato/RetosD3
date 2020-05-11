var margin = { top: 20, right: 30, bottom: 40, left: 90 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json"
).then((data) => {
  // Add X axis
  var x = d3.scaleLinear().domain([0, 980000]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .padding(0.1);
  svg.append("g").call(d3.axisLeft(y));

  //Bars
  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", function (d) {
      return x(d.value);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");
});

// CHART START

//Definir constantes
const width = 800
const height = 500
const margin = {
    top: 10,
    bottom: 40,
    left: 40, 
    right: 10
}

/// defino svg y grupos:
const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top })`)

// definir escala:
const x = d3.scaleLinear().range([0, width - margin.top - margin.bottom])
const y = d3.scaleBand().range([height  - margin.left - margin.right, 0]).padding(0.1)

let data2
//width  height

// definir ejes:
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)


d3.csv("data.csv").then(data => {
    //console.log("test 1", data)
    data.map(d=>{ 
        d.year = 1
        d.winner = d.winner
       // console.log("test 2",data)
    
    })
   
    data2 = d3.nest()
        .key(function(d) { return d.winner;})
        .rollup(function(d) { return d3.sum(d, function(g) {return g.year; });})
        .entries(data);
        console.log("test 3",data2)

        // dominio:
        y.domain(data.map(d => d.winner))
        x.domain([0, d3.max(data2.map(d=>d.value))])
  
     // dibujar los ejes: 
     xAxisGroup.call(xAxis)
     yAxisGroup.call(yAxis)


     // data binding:
    elementGroup.selectAll("rect").data(data2)
        .join("rect")
            .attr("x", 0)
            .attr("width", d =>  x(d.value))
            .attr("y", (d, i) => y(d.key))
            .attr("height", y.bandwidth())
})

// CHART END

// slider:
function slider() {    
    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(years))  // rango años
        .max(d3.max(years))
        .step(4)  // cada cuánto aumenta el slider
        .width(580)  // ancho de nuestro slider
        .ticks(years.length)  
        .default(years[years.length -1])  // punto inicio de la marca
        .on('onchange', val => {
            console.log("La función aún no está conectada con la gráfica")
            // conectar con la gráfica aquí
           getData()
        });

        var gTime = d3
        .select('div#slider-time')  // div donde lo insertamos
        .append('svg')
        .attr('width', width * 0.8)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

        gTime.call(sliderTime);

        d3.select('p#value-time').text(sliderTime.value());
}
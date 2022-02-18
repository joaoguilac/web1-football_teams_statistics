// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawVisualization);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
data_graph = [];
data_label = ['Times', 'Jogos', 'Derrotas', 'Empates', 'Vitórias', 'Pontos'];
data_example = ['Exemplo', 38, 12, 14, 12, 50];
data_graph.push(data_label);
data_graph.push(data_example);

window.onresize = drawVisualization;
function drawVisualization() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable(data_graph);

  var options = {
    title : 'Retrospecto dos times na liga (2021)',
    vAxis: {title: 'Números'},
    hAxis: {title: 'Times'},
    seriesType: 'bars',
    // series: {5: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('chart'));
  chart.draw(data, options);
}
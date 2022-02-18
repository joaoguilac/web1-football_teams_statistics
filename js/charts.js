data_graph = [];
data_label = ['Times', 'Jogos', 'Derrotas', 'Empates', 'Vitórias', 'Pontos'];
data_example = ['Exemplo', 38, 12, 14, 12, 50];
data_graph.push(data_label);
data_graph.push(data_example);

function clearChart() {
  data_graph.splice(1);
  data_graph.push(data_example);
  drawVisualization();
}

function updateGraph(index) {
  let teams = document.getElementById("teams");
  let input_team = teams.children[index].children[0];

  let data_team = [];
  data_team.push(list_teams[index].team.shortDisplayName); // nome do time
  data_team.push(list_teams[index].stats[3].value);        // jogos
  data_team.push(list_teams[index].stats[1].value);        // derrotas
  data_team.push(list_teams[index].stats[2].value);        // empates
  data_team.push(list_teams[index].stats[0].value);        // vitorias
  data_team.push(list_teams[index].stats[6].value);        // pontos

  if (input_team.checked) {
      data_graph.push(data_team);

      if (data_graph[1][0] == 'Exemplo') {
          data_graph.splice(1, 1);
      }
      drawVisualization();
  }
  else {
      var index = data_graph.indexOf(data_team);
      data_graph.splice(index, 1);
      
      if (data_graph.length == 1) {
          data_graph.push(data_example);
      }
      drawVisualization();
  }

  setStorageAPI(teams);
}

window.onresize = drawVisualization;

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawVisualization);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
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
/*
* Função AJAX base do tipo assíncrona.
* type é o tipo de objeto se quer recuperar.
* value é o id para filtrar os resultados dos tipos 2, 3 e 4.
*/
function xhttpAssincrono(callBackFunction, type, id, season) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };

    // Path para a requisição AJAX.
    var url = "https://api-football-standings.azharimm.site/";
    switch (type) {
        case 1:
            url += "leagues/";
            break;
        case 2:
            url += "leagues/" + id;
            break;
        case 3:
            url += "leagues/" + id + "/standings?season=" + season;
            break;
        case 4:
            url += "leagues/" + id + "/seasons/";
            break;
    }
    
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getLeagues() {
    xhttpAssincrono(createLeaguesDOM, 1);
}

function createLeaguesDOM(response) {
    let leagues = document.getElementById("leagues");
    let select_league = document.createElement("option");

    select_league.innerHTML = "Selecione um campeonato";
    select_league.value = 0;
    select_league.setAttribute("disabled", "true");
    select_league.setAttribute("selected", "true");

    leagues.appendChild(select_league);
    
    list_leagues = JSON.parse(response);
    for (let i = 0; i < list_leagues.data.length; i++) {
        let league = list_leagues.data[i];

        let item = document.createElement("option");
        item.innerHTML = league.name;
        item.value = league.id;
        
        leagues.appendChild(item);
    }
}

function getTeams() {
    removeAllChildren();
    clearChart();
    
    let league_id = document.getElementById("leagues").value;
    xhttpAssincrono(createTeamsDOM, 3, league_id, 2021);
}

function removeAllChildren() {
    var teams = document.getElementById("teams");

    while (teams.firstChild) {
        teams.removeChild(teams.firstChild);
    }
}

function createTeamsDOM(response) {
    let teams = document.getElementById("teams");

    // Session storage
    league_id = document.getElementById("leagues").value;
    session_text = sessionStorage.getItem(league_id);
    sessionArray = JSON.parse(session_text);
      
    list = JSON.parse(response);
    list_teams = list.data.standings;
    for (let i = 0; i < list_teams.length; i++) {
        let current_team = list_teams[i].team;

        let div_team = document.createElement("div");
        div_team.setAttribute("class", "form-check");

        let input_team = document.createElement("input");
        input_team.setAttribute("class", "form-check-input");
        input_team.setAttribute("type", "checkbox");
        input_team.setAttribute("id", current_team.id);
        input_team.value = i;
        input_team.setAttribute("onchange", "updateGraph(value)");

        // Session storage
        let hasInSessionStorage = false;
        if (sessionArray != null) {
            for (let index = 0; index < sessionArray.length; index++) {
                if (sessionArray[index] == i) {
                    hasInSessionStorage = true;
                }
            }

            if (hasInSessionStorage) {
                input_team.setAttribute("checked", "");
            }
        }

        let label_team = document.createElement("label");
        label_team.setAttribute("class", "form-check-label");
        label_team.setAttribute("for", current_team.id);
        label_team.innerHTML = current_team.name;

        div_team.appendChild(input_team);
        div_team.appendChild(label_team);
        teams.appendChild(div_team);
    }

    // Session Storage
    if (sessionArray != null) {
        for (let i = 0; i < sessionArray.length; i++) {
            updateGraph(sessionArray[i]);
        }
    }
}

function setStorageAPI(teams) {
    let league_id = document.getElementById("leagues").value;
    
    teams_checked = [];
    for (let i = 0; i < list_teams.length; i++) {
        var input_team = teams.children[i].children[0];
        if (input_team.checked) {
            teams_checked.push(input_team.value);
        }
    }
    
    let checked_text = JSON.stringify(teams_checked);
    sessionStorage.setItem(league_id, checked_text);
}
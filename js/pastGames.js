const side = document.getElementById("side");
const gameData = document.getElementById("data");


function buildPage(){
    side.innerHTML = "";
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++){
            side.innerHTML += "<a onclick = 'fillData("+data[i][0]+")', class = 'sides'>"+ data[i][1] + "\n " + data[i][2] +"</a> "
        }
    })
    .catch(error => console.error('Error:', error));
    fillData(1);
}
function fillData(id){
    gameData.innerHTML = "";
    let row = gameData.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = "<h2>Game</h2>";

    fetch("http://127.0.0.1:5000/fetchStats/" + id)
   .then(response => response.json())
   .then(data => {
        for(let j = 0; j < data.length; j++){
            let row = gameData.insertRow();
            let cell = row.insertCell();
            cell.innerHTML = "<b>"+data[j][1]+"</b>";
            cell = row.insertCell();
            cell.innerHTML = "<b>"+data[j][11]+"</b>";

            fetch("http://127.0.0.1:5000/getEntries/"+id)
            .then(response => response.json())
            .then(data2 => {
                for(let i = 0; i < data2.length; i++){
                    if(data2[i][1] == data[j][0]){
                        let row = gameData.insertRow();

                        cell = row.insertCell();
                        cell.innerHTML = "<b>"+data[j][1]+"</b>";

                        if(data2[i][4]){
                            cell = row.insertCell();
                            cell.innerHTML = "<p> player: " + data2[i][4] + "</p>";
                        }

                        if(data2[i][3]){
                            cell = row.insertCell();
                            cell.innerHTML = "<p> number: " + data2[i][3] + "</p>";
                        }

                        if(data2[i][5]){
                            cell = row.insertCell();
                            cell.innerHTML = "<p> note: " + data2[i][5] + "</p>";
                        }
                    }
                }
            })
            .catch(error => console.error('Error:', error));
        }
    })
    .catch(error => console.error('Error:', error));
}

buildPage();


const side = document.getElementById("side");
const gameData = document.getElementById("data");


function buildPage(){
    side.innerHTML = "";
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++){
            side.innerHTML += "<a onclick = 'fillData("+data[i][0]+")'>"+ data[i][1] + "\nVS " + data[i][2] +"</a> "
        }
    })
    .catch(error => console.error('Error:', error));
    fillData(1);
}
function fillData(id){
    gameData.innerHTML = "";
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
                        row = gameData.insertRow();

                        if(data2[i][4]){
                            cell = row.insertCell();
                            cell.innerHTML = "<p> player: " + data2[i][4] + "</p>";
                        }

                        cell.innerHTML = "<p> number: " + data2[i][3] + "</p>";

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


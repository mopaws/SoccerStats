var table = document.getElementById('data');
var scores = document.getElementById('scores');
fetchAllData(table);
var myStats = [];

if(!localStorage.getItem("gameID")){
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("gameID",data[0][0]+1);
    })
    .catch(error => console.error('Error:', error));
    
}

function fetchAllData(table){
    fetch("http://127.0.0.1:5000/fetchStats")
   .then(response => response.json())
   .then(data => {
        table.innerHTML = "";
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let id = data[i][0];
            let name = data[i][1];
            let inctanceID = data[i][5]
            let gameId = localStorage.getItem("gameID");

            let numOf = data[i][11];
            let note = data[i][10];
            let player = data[i][9];

            let playerSelect;
            let notefield;

            let newRow = table.insertRow();

            newRow.insertCell().textContent = name;

            if(data[i][3] == 'true'){

                playerSelect = document.createElement("select");
                playerSelect.style.width = "100px";
                playerSelect.style.height = "25px";
                for(let p = 1; p <= 5; p++){ //TODO MAKE THE 5 INTO THE PLAYER LIST
                    var op = new Option();
                    op.value = p;
                    op.text = "Player " + p;
                    playerSelect.options.add(op);     
                } 
                newRow.insertCell().appendChild(playerSelect);
            }

            if(data[i][4] == 'true'){
                notefield = document.createElement("input");
                notefield.style.width = "200px";
                notefield.style.height = "50px";
                newRow.insertCell().appendChild(notefield);
            }

            if(data[i][2] == 'true'){
                let btn = document.createElement("button");
                btn.textContent = "remove";
                btn.onclick = function() {
                    subfinalData(inctanceID);
                    fetchAllData(table);
                };
                btn.style.width = "100px";
                btn.style.height = "100px";
                newRow.insertCell().appendChild(btn);

                btn = document.createElement("button");
                btn.textContent = "add";

                btn.onclick = function() {
                    let pd = -1;
                    if(playerSelect){
                        pd = playerSelect.value;
                    }
                    let nt = "";
                    if(notefield){
                        nt = notefield.value;
                    }

                    myStats.push([id,gameId,1,pd,nt])
                    localStorage.setItem("newStats",myStats);
                    addfinalData(id,gameId,1, pd,nt);
                    fetchAllData(table);

                    playerSelect.value = 0;
                    notefield.value = "";
                };
                btn.style.width = "100px";
                btn.style.height = "100px";
                newRow.insertCell().appendChild(btn);
                newRow.insertCell().textContent = numOf;
            }
            
        }
   })
   .catch(error => console.error('Error:', error));
   

   fetch("http://127.0.0.1:5000/statByName/Home Goals")
    .then(response => response.json())
    .then(data => {
        fetch("http://127.0.0.1:5000/statByName/Opponent Goals")
        .then(response => response.json())
        .then(data2 => {

            scores.innerHTML = data[0] + " - " + data2[0];
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

function pushAll(){
    for(let i = 0; i< localStorage.getItem("newStats").length; i ++){
        addfinalData(localStorage.getItem("newStats")[i][0],
        localStorage.getItem("newStats")[i][1],
        localStorage.getItem("newStats")[i][2],
        localStorage.getItem("newStats")[i][3],
        localStorage.getItem("newStats")[i][4]);
    }

    localStorage.removeItem("newStats");
    localStorage.removeItem("oppVal");
    localStorage.removeItem("dateVal");
    localStorage.removeItem("locVal");
    localStorage.removeItem("typeVal");
    localStorage.removeItem("gameID");

}

var table = document.getElementById('data');
var scores = document.getElementById('scores');
fetchAllData(table);
var myStats = [];

if(!localStorage.getItem("gameID")){
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        if(data[0]){
            localStorage.setItem("gameID",data[0][0]+1);
        } else {
            localStorage.setItem("gameID",1);
        }
    })
    .catch(error => console.error('Error:', error));
    
}

function fetchAllData(table){
    fetch("http://127.0.0.1:5000/fetchStatsGameless")
   .then(response => response.json())
   .then(data => {
        table.innerHTML = "";
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let id = data[i][0];
            var name = data[i][1];
            let inctanceID = data[i][5]
            var gameId = localStorage.getItem("gameID");
          

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
                for(let p = 1; p <= 30; p++){ //TODO MAKE THE 5 INTO THE PLAYER LIST
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
                notefield.value = "";
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
                    let nt = "-";
                    if(notefield){
                        nt = notefield.value;
                    }

                    myStats.push([id,gameId,1,pd,nt])
                    localStorage.setItem("newStats",myStats);
                    addfinalData(id,localStorage.getItem("gameID"),1, pd,nt);
                    fetchAllData(table);

                    if(playerSelect){
                        playerSelect.value = 0;
                    } 
                    if (notefield){
                        notefield.value = "";
                    }
                };
                btn.style.width = "100px";
                btn.style.height = "100px";
                newRow.insertCell().appendChild(btn);
                if(data[i][2] == 'true'){
                    fetch("http://127.0.0.1:5000/statByName/"+name+"/"+gameId)
                    .then(response => response.json())
                    .then(data => {
                        newRow.insertCell().textContent = data[0];
                    })
                    .catch(error => console.error('Error:', error));
                }
            }
            
        }
   })
   .catch(error => console.error('Error:', error));
   

   fetch("http://127.0.0.1:5000/statByName/Home Goals/"+localStorage.getItem("gameID"))
    .then(response => response.json())
    .then(data => {
        fetch("http://127.0.0.1:5000/statByName/Opponent Goals/"+localStorage.getItem("gameID"))
        .then(response => response.json())
        .then(data2 => {

            scores.innerHTML = data[0] + " - " + data2[0];
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}
/*
function pushAll(){
var scores = document.getElementById('scores'); //HOW WERE WE GETTING SOCRES BEFORE? WHERE TO GET HOME AND OPP SOCRE SEPARATELY?
//if statement comparing home and opp score to store "outcome" for the route

    fetch("http://127.0.0.1:5000/storeGame/storeGame+"/"+localStorage.getItem("ID")+"/"+outcome+"/"+<cond>+"/"+<notes>)
      .then(response => response.json())
      .then(data => {
        console.log("FINAL GAME STORED");
      })
}
*/

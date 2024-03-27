var table = document.getElementById('data');
var scores = document.getElementById('scores');
fetchAllData(table);

function fetchAllData(table){
    fetch("http://127.0.0.1:5000/fetchStats")
   .then(response => response.json())
   .then(data => {
        table.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            let id = data[i][0];
            let name = data[i][1];
            let inctanceID = data[i][5]
            let gameId = 1; // TODO MAKE THIS AN ACTUAL GAME 

            let numOf = data[i][11];
            let note = data[i][10];
            let player = data[i][9];

            let newRow = table.insertRow();
            let btn = document.createElement("button");
            btn.textContent = "-";
            btn.onclick = function() {
                subfinalData(inctanceID);
                fetchAllData(table);
            };
            btn.style.width = "200px";
            btn.style.height = "200px";
            newRow.insertCell(0).appendChild(btn);

            newRow.insertCell(1).textContent = name;

            btn = document.createElement("button");
            btn.textContent = "+";
            btn.onclick = function() {
                addfinalData(id,gameId,1);
                fetchAllData(table);
            };
            btn.onmousemove = function() {
                fetchAllData(table);
            };
            newRow.insertCell(2).appendChild(btn);

            newRow.insertCell(3).textContent = numOf;
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


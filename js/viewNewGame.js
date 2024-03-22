var table = document.getElementById('data');
fetchAllData(table),100;

function fetchAllData(table){
    fetch("http://127.0.0.1:5000/fetchStats")
   .then(response => response.json())
   .then(data => {
        table.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            let name = data[i][1];
            let numOf = data[i][7];
            let id = data[i][0];
            let gameId = 1;

            let newRow = table.insertRow(table.rows.length);

            let btn = document.createElement("button");
            btn.textContent = "-";
            btn.onclick = function() {
                addData(id,gameId,-1);
                fetchAllData(table);
            };
            newRow.insertCell(0).appendChild(btn);

            newRow.insertCell(1).textContent = name;

            btn = document.createElement("button");
            btn.textContent = "+";
            btn.onclick = function() {
                addData(id,gameId,1);
                fetchAllData(table);
            };
            newRow.insertCell(2).appendChild(btn);

            newRow.insertCell(3).textContent = numOf;
        }
   })
   .catch(error => console.error('Error:', error));
 }

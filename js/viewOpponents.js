let Optable = document.getElementById("oppTable").getElementsByTagName('tbody')[0];
createDivs(Optable); 
//Making a for loop that makes a div for every opponent in the opponents SQL table, the populate that with games played etc.

function createDivs(table){
  fetch("http://127.0.0.1:5000/opponents")
  .then(response => response.json())
  .then(data => {
    //table.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      //adds opponent name
      var oppDiv = document.createElement("div");
      var opp = document.createElement("h5");
      opp.textContent = data[i][1];
      oppDiv.appendChild(opp);
      oppDiv.classList.add("oppDiv");
      
      //making the table with W/T/L against that opp
      stats = document.createElement('table');
      stats.classList.add("WTL");
      const tr = stats.insertRow()
/*
    fetch("http://127.0.0.1:5000/statByOpp/Home Goals/"+opp.textContent)
    .then(response => response.json())
    .then(data2 => {
	fetch("http://127.0.0.1:5000/statByOpp/Opponent Goals/"+opp.textContent)
    .then(response => response.json())
    .then(data3 => {
	if(){

	}else if(){

	}else{
	
	}
    
    })
    
    })
    .catch(error => console.error('Error:', error));
*/


    fetch("http://127.0.0.1:5000/statByOpp/Home Goals/"+data[i][1])
    .then(response => response.json())
    .then(data2 => {
	fetch("http://127.0.0.1:5000/statByOpp/Opponent Goals/"+data[i][1])
    .then(response => response.json())
    .then(data3 => {
        tr.insertCell().textContent = data2[1]; //data eventually
      	tr.insertCell().textContent = data3; //data eventually
    
    })
    
    })
    .catch(error => console.error('Error:', error));

      //tr.insertCell().textContent = data2[i][1]; //data eventually
      //tr.insertCell().textContent = data3[i][1]; //data eventually
      //tr.insertCell().textContent = data4[i][1]; //data eventually
      oppDiv.appendChild(stats);

      let newRow = table.insertRow(table.rows.length);
      newRow.insertCell(0).appendChild(oppDiv);
      
    }
  })
  //.catch(error => console.error('Error:', error));
}

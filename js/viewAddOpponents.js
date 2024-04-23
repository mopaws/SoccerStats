let table = document.getElementById("trackedOpponents").getElementsByTagName('tbody')[0];

//Making a for loop that makes a div for every opponent in the opponents SQL table, the populate that with games played etc.

function getOpps(table){
  fetch("http://127.0.0.1:5000/opponents")
  .then(response => response.json())
  .then(data => {
    table.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      let newRow = table.insertRow(table.rows.length);
      console.log(data[i][1]);
      newRow.insertCell(0).textContent = data[i][1]; //name


      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.onclick = function() {
      	removeOppFromData(data[i][0])
        newRow.remove();
      };
      newRow.insertCell(1).appendChild(removeButton);
    }
  })
  //.catch(error => console.error('Error:', error));
}
window.onload = (event) => {
  getOpps(table);
  
}
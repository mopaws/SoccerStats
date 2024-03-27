let table = document.getElementById("trackedStats").getElementsByTagName('tbody')[0];


function getStatTypesforTable(table){
  fetch("http://127.0.0.1:5000/stats")
  .then(response => response.json())
  .then(data => {
    table.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      let newRow = table.insertRow(table.rows.length);
      newRow.insertCell(0).textContent = data[i][0];
      newRow.insertCell(1).textContent = data[i][1];
  
      newRow.insertCell(2).textContent = data[i][2];
      newRow.insertCell(3).textContent = data[i][3];
      newRow.insertCell(4).textContent = data[i][4];
  
      if(i < 2){
        newRow.insertCell(5).textContent = "unavalable";
      } else {
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.onclick = function() {
          removeFromTracked(data[i][0])
          newRow.remove();
        };
        newRow.insertCell(5).appendChild(removeButton);
      }
    }
  })
  //.catch(error => console.error('Error:', error));
}
window.onload = (event) => {
  addStatType("Home Goals", true, true, false);
  addStatType("Opponent Goals", true, true, false);
  getStatTypesforTable(table);
  
}

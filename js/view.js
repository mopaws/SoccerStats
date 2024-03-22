function loadPage(logtest){
  let logBox = document.getElementById("loginBox");
  if(logtest == true){
    logBox.remove();
  }
}


function getStatTypesforTable(table){
  fetch("http://127.0.0.1:5000/stats")
  .then(response => response.json())
  .then(data => {
    table.innerHTML = "";
    for(let i = 0; i < data.length; i++){
      let newRow = table.insertRow(table.rows.length);
      newRow.insertCell(0).textContent = data[i][0];
      newRow.insertCell(1).textContent = data[i][1];
  
      if(data[i][3] && data[i][3] != false){
        newRow.insertCell(2).textContent = "True";
      } else{
        newRow.insertCell(2).textContent = "False";
      }
  
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.onclick = function() {
        newRow.remove();
      };
      newRow.insertCell(3).appendChild(removeButton);
    }
  })
  .catch(error => console.error('Error:', error));
}
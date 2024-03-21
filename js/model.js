//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save")){
  localStorage.setItem("save", false);
}

function generateSignInRequest(name, password){
  let box = document.getElementById("keepLogin");
  fetch("http://127.0.0.1:5000/getUser/" + name +"/"+password)
  .then(response => response.json())
  .then(data => {
      console.log(data["good"])
      if(data["good"]){
        localStorage.setItem("save login", box.checked);
        if(box.checked){
          localStorage.setItem("user", name);
          localStorage.setItem("pass", password);
        } else {
          if(localStorage.getItem("user")){
            localStorage.removeItem("user");
          }
          if(localStorage.getItem("pass")){
            localStorage.removeItem("pass");
          } 
        } 
        loadPage(true);
      }
  })
  .catch(error => console.error('Error:', error));
}

//creates a non admin account
function createNewUser(name, password){

  fetch("http://127.0.0.1:5000/addUser/" + name + "/" +password)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'inserted data'){
        console.log("new user created succesfully");
      }
  })
  .catch(error => console.error('Error:', error));
}

function fetchAllData(){
   fetch("http://127.0.0.1:5000/fetchStats")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(error => console.error('Error:', error));
}

function addStatType(name){
  fetch("http://127.0.0.1:5000/newStat/" + name)
  .then(response => response.json())
  .then(data => {
    console.log("data type " + name + " added");
  })
  .catch(error => console.error('Error:', error));
}
function getStatTypes(){
  fetch("http://127.0.0.1:5000/stats/")
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error('Error:', error));
}

function addfinalData(stat, game, num){
  fetch("http://127.0.0.1:5000/addGeneralStat/" + stat + "/" +game+ "/"+num)
  .then(response => response.json())
  .then(data => {
      if(data['data'] == true){
        console.log("done");
      }
      else{
        console.log("failed");
      }
  })
  .catch(error => console.error('Error:', error));
}
function addfinalDataPlayer(stat, game, num, player){

  fetch("http://127.0.0.1:5000/addPlayerStat/" + stat + "/" +game+ "/"+ num + "/"+player)
  .then(response => response.json())
  .then(data => {
    
      if(data['data'] == true){
        console.log("done");
      }
      else{
        console.log("failed");
      }
  })
  .catch(error => console.error('Error:', error));
}

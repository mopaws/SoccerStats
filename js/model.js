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

function addData(stat, game, num){
  fetch("http://127.0.0.1:5000/addData/" + stat + "/" +game+ "/"+num)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'inserted data'){
        console.log("done");
      }
  })
  .catch(error => console.error('Error:', error));
}
function addDataPlayer(stat, game, num, player){

  fetch("http://127.0.0.1:5000/addDataPlayer/" + stat + "/" +game+ "/"+ num + "/"+player)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'inserted data'){
        console.log("done");
      }
  })
  .catch(error => console.error('Error:', error));
}

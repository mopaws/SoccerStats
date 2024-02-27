//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save login")){
  localStorage.setItem("save login", false);
}

function generateSignInRequest(name, password){

  let box = document.getElementById("keepLogin");
  fetch("http://127.0.0.1:5000/getUser/" + name +"/"+password)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'good'){
        localStorage.setItem("save login", box.checked);
        loadPage(true);
        if(localStorage.getItem("save login") == true){
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
      }
  })
  .catch(error => console.error('Error:', error));
}

//creates a non admin account
function createNewUser(name, password){

  fetch("http://127.0.0.1:5000/addUser/" + name +"/"+password)
  .then(response => response.json())
  .then(data => {
    
      if(data[0] == 'inserted data'){
        console.log("new user created succesfully");
      }
  })
  .catch(error => console.error('Error:', error));
}
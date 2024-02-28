//access login data fields.
let pass = document.getElementById("password");
let user = document.getElementById("username");
let keep = document.getElementById("keepLogin");

//if the data exists in local storage, autofill the page
if(localStorage.getItem("user")){
  user.value = localStorage.getItem("user");
}
if(localStorage.getItem("pass")){
  pass.value = localStorage.getItem("pass");
}
if(localStorage.getItem("save login")){
  keep.checked = localStorage.getItem("save login");
}

function tryToLogin(){
  // get refrences to the user inputs
  let pass = document.getElementById("password");
  let user = document.getElementById("username");

  //Make sure the user name and pasword have been typed in
  if(pass.value.length > 1 && user.value.length > 1){
    generateSignInRequest(user.value,pass.value);
  }
}

function tryCreateUser(){
  let n = document.getElementById("newName");
  let p = document.getElementById("newPass");
  let cp = document.getElementById("confPass");
  let vis = "0";

  if(document.getElementById("vTypes").value == 1){
    vis =  document.getElementById("visi").value;
  }

  if(n.value.length > 0 && p.value.length > 0 && p.value == cp.value){
    createNewUser(n.value, p.value);
  }
}

function updateVcheck(){
  let field = document.getElementById("viewSelector");
  let type = document.getElementById("vTypes");

  if(type.value == 1){
    field.innerHTML = '<p>please enter the player jersy below </p> <input type = "text", id = visi>';
  }
}

  


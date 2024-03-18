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

  if(n.value.length > 0 && p.value.length > 2 && p.value == cp.value){
    createNewUser(n.value,p.value);
  }
}

window.onload = (event) => {
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
  if(localStorage.getItem("save")){
    keep.checked = localStorage.getItem("save");
  }
}

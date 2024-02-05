function tryToLogin(){
  let box = document.getElementById("keepLogin");
  alert(box.checked);

  //check if the user exists in database

   localStorage.setItem("save login", box.checked);
   localStorage.setItem("logged in", true);
}

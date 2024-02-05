function tryToLogin(){
  let box = document.getElementById("keepLogin");
  alert(box.value);

  //check if the user exists in database

   localStorage.setItem("save login", box.value);
   localStorage.setItem("logged in", true);
}

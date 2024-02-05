function tryToLogin(){
  let box = document.getElementById("keepLogin");
  //check if the user exists in database

   localStorage.setItem("save login", box.checked);
   localStorage.setItem("logged in", true);

   if(box.checked){
     localStorage.setItem("user", document.getElementById("username").value);
     localStorage.setItem("pass", document.getElementById("password").value);
   } else {
     if(localStorage.getItem("user")){
       localStorage.removeItem("user");
     }
     if(localStorage.getItem("pass")){
       localStorage.removeItem("pass");
     }
   }  
}

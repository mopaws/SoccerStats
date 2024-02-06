function tryToLogin(){
  // get refrences to the user inputs
  let box = document.getElementById("keepLogin");
  let pass = document.getElementById("password");
  let user = document.getElementById("username");

  //Make sure the user name and pasword have been typed in
  if(pass.value.length > 1 && user.value.length > 1){
    
    //check if the user exists in database

      // if all checks are met, save the login if they want to, ans sign them in
     localStorage.setItem("save login", box.checked);
     localStorage.setItem("logged in", true);
  
     if(box.checked){
       localStorage.setItem("user", user.value);
       localStorage.setItem("pass", pass.value);
     } else {
       if(localStorage.getItem("user")){
         localStorage.removeItem("user");
       }
       if(localStorage.getItem("pass")){
         localStorage.removeItem("pass");
       }
     }  
   }
}

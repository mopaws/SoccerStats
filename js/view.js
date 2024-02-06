window.onload = (event) => {
  let pass = document.getElementById("password");
  let user = document.getElementById("username");
  
  if(localStorage.getItem("user")){
    user.value = localStorage.getItem("user");
  }
  if(localStorage.getItem("pass")){
    pass.value = localStorage.getItem("pass");
  }
};

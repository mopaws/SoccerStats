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
  if(localStorage.getItem("save login")){
    keep.checked = localStorage.getItem("save login");
  }
};

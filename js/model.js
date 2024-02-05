//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save login")){
  localStorage.setItem("save login", false);
}
if(! localStorage.getItem("logged in")){
  localStorage.setItem("logged in", false);
}


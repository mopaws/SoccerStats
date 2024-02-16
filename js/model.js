//Set up local storage login stuff if it hasn't already been created for the current user.
localStorage.setItem("save login", false);



function generateSignInRequest(name, password){

  let box = document.getElementById("keepLogin");
  let pass = document.getElementById("password");
  let user = document.getElementById("username");


  fetch('http://127.0.0.1:5000/getUserData')
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i < data.length; i++){

      if(data[i][0] == name && data[i][1] == password){
        localStorage.setItem("save login", box.checked);
        loadPage(true);
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
  })
  .catch(error => console.error('Error:', error));
}

//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save login")){
  localStorage.setItem("save login", false);
}
if(! localStorage.getItem("logged in")){
  localStorage.setItem("logged in", false);
}

fetch('https://127.0.0.1:5000/getData')
  .then(response => response.json())
  .then(data => {
    console.log('Data received:', data);
    // Do something with the data
  })
  .catch(error => console.error('Error:', error));

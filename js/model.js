//Set up local storage login stuff if it hasn't already been created for the current user.
if(! localStorage.getItem("save login")){
  localStorage.setItem("save login", false);
}
if(! localStorage.getItem("logged in")){
  localStorage.setItem("logged in", false);
}

fetch('/127.0.0.1:5000', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Handle the data returned from Flask
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

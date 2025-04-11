const tryLogin‎ = document.getElementById('tryLogin‎');
const username‎ = document.getElementById('username‎');
const password‎ = document.getElementById('password‎');

function goToHome(){
  if(username.value == 'admin' && password.value == 'SoccerStats2025'){
    window.location.href = "Past_Games_Page.html";
  }
  
}

tryLogin.addEventListener('click',goToHome);

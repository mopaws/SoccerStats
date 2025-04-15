const tryLogin‎ = document.getElementById('tryLogin‎');
const username‎ = document.getElementById('username‎');
const password‎ = document.getElementById('password‎');
const tester‎ = document.getElementById('tester‎');

tryLogin.addEventListener('click', function() {
  if(username.value == 'a' && password.value == '2025'){
    tester.innerText = 'it works!!!'
    window.location.href = "Past_Games_Page.html";
  }
  
});

tryLogin.addEventListener('click',goToHome);

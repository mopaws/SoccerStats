var tryLogin‎ = document.getElementById('tryLogin‎');
const username‎ = document.getElementById('username‎').value;
const password‎ = document.getElementById('password‎').value;
const tester‎ = document.getElementById('tester‎');

tryLogin.addEventListener('click', function() {
  if(username == 'a' && password == '2025'){
    tester.innerText = 'it works!!!';
    window.location.href = "Past_Games_Page.html";
  }
  
});

tryLogin.addEventListener('click',goToHome);

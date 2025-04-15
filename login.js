var tryLogin‎ = document.getElementById('tryLogin‎');
var tester‎ = document.getElementById('tester‎');

tryLogin.addEventListener('click', function() {
  var username‎ = document.getElementById('username‎').value;
  var password‎ = document.getElementById('password‎').value;
  if(username == 'a' && password == '2025'){
    tester.innerText = 'it works!!!';
    window.location.href = "Past_Games_Page.html";
  }
  else{
    tester.innerText = 'Invalid username or password';
  }
  
});

tryLogin.addEventListener('click',goToHome);

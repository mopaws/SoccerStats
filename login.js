function goToHome(){
    const tryLogin = document.getElementById('tryLogin');
    const tester = document.getElementById('tester');
    //tryLogin.addEventListener('click', function() {
      const username = document.getElementById('username').value; 
      const password = document.getElementById('password').value;
      if(username == 'a' && password == '2025'){
        tester.innerText = 'it works!!!';
        window.location.href = "Past_Games_Page.html";
      }
      else{
        tester.innerText = 'Invalid username or password';
      }
    }
    
    tryLogin.addEventListener('click',goToHome);
/*
var tryLogin‎ = document.getElementById('tryLogin‎');
var tester‎ = document.getElementById('tester‎');
  var username‎ = document.getElementById('username‎').value; 
  var password‎ = document.getElementById('password‎').value;
tryLogin.addEventListener('click', function() {
  if(username == 'a' && password == '2025'){
    tester.innerText = 'it works!!!';
    window.location.href = "Past_Games_Page.html";
  }
  else{
    tester.innerText = 'Invalid username or password';
  }
}
});

tryLogin.addEventListener('click',goToHome);
*/

const tryLogin = document.getElementById('tryLogin');
const tester = document.getElementById('tester');
function goToHome(){
      const username = document.getElementById('username').value; 
      const password = document.getElementById('password').value;
      if(username == 'statsAdmin' && password == 'drhs2025'){
        
        window.location.href = "Past_Games_Page.html";
      }
      else{
        tester.innerText = 'Invalid username or password';
      }
    }
    
    tryLogin.addEventListener('click',goToHome);

const side = document.getElementById("side");
const gameData = document.getElementById("data");


function buildPage(){
    let navHTML = "";
    fetch("http://127.0.0.1:5000/getGames")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++){
            navHTML += "<a>"+ data[i][1] + data[i][4] ? " Varsity at " : " JV at " + data[i][3] ? "Home" : data[i][2] +"</a> "
        }
    })
    .catch(error => console.error('Error:', error));
    side.innerHTML = navHTML;
}
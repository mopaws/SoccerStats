// Set up local storage for login if it hasn't been created for the current user.
if (!localStorage.getItem("save")) {
  localStorage.setItem("save", "false");
}

function generateSignInRequest(name, password) {
  let box = document.getElementById("keepLogin");

  fetch(`http://127.0.0.1:5000/getUser/${name}/${password}`)
    .then(response => response.json())
    .then(data => {
      console.log(data["good"]);

      if (data["good"]) {
        localStorage.setItem("save login", box.checked);
        
        if (box.checked) {
          localStorage.setItem("user", name);
          localStorage.setItem("pass", password);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("pass");
        }

        loadPage(true);
      }
    })
    .catch(error => console.error("Error:", error));
}

// Create a non-admin user
function createNewUser(name, password) {
  fetch(`http://127.0.0.1:5000/addUser/${name}/${password}`)
    .then(response => response.json())
    .then(data => {
      if (data[0] === "inserted data") {
        console.log("New user created successfully");
      }
    })
    .catch(error => console.error("Error:", error));
}

function addStatType(name, tnum, tplayer, tnote) {
  fetch(`http://127.0.0.1:5000/newStat/${name}/${tnum}/${tplayer}/${tnote}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

function addOpp(name) {
  fetch(`http://127.0.0.1:5000/addOpp/${name}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

  let table = document.getElementById("trackedOpponents").getElementsByTagName("tbody")[0];
  getOpps(table);
}

function getStatTypes() {
  return fetch("http://127.0.0.1:5000/stats")
    .then(response => response.json())
    .catch(error => console.error("Error:", error));
}

function removeFromTracked(id) {
  fetch(`http://127.0.0.1:5000/removeStat/${id}`)
    .then(response => response.json())
    .then(() => console.log(`Deleted stat ID: ${id}`))
    .catch(error => console.error("Error:", error));
}

function removeOppFromData(id) {
  fetch(`http://127.0.0.1:5000/removeOpp/${id}`)
    .then(response => response.json())
    .then(() => console.log(`Deleted opponent ID: ${id}`))
    .catch(error => console.error("Error:", error));
}

function subfinalData(id) {
  fetch(`http://127.0.0.1:5000/subtractStat/${id}`)
    .then(response => response.json())
    .then(data => console.log(data["data"] ? "Subtracted from stat" : "Failed"))
    .catch(error => console.error("Error:", error));
}

function addfinalData(stat, game, num, player, note) {
  fetch(`http://127.0.0.1:5000/addGeneralStat/${stat}/${game}/${num}/${player}/${note}`)
    .then(response => response.json())
    .then(data => console.log(data["data"] ? "Done" : "Failed"))
    .catch(error => console.error("Error:", error));
}

function popOppSelect(selectId) {
  fetch("http://127.0.0.1:5000/opponents")
    .then(response => response.json())
    .then(data => {
      selectId.innerHTML = "";
      data.forEach(opp => {
        let opt = document.createElement("option");
        opt.value = opp[1];
        opt.innerHTML = opp[1];
        selectId.appendChild(opt);
      });
    })
    .catch(error => console.error("Error:", error));
}

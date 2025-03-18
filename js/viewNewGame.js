var table = document.getElementById("data");
var scores = document.getElementById("scores");
var myStats = [];

initializeGameID().then(() => fetchAllData(table));

async function initializeGameID() {
  if (!localStorage.getItem("gameID")) {
    try {
      let response = await fetch("http://127.0.0.1:5000/getGames");
      let data = await response.json();
      localStorage.setItem("gameID", data[0] ? data[0][0] + 1 : 1);
    } catch (error) {
      console.error("Error fetching game ID:", error);
    }
  }
}

async function fetchAllData(table) {
  try {
    let response = await fetch("http://127.0.0.1:5000/fetchStatsGameless");
    let data = await response.json();
    
    table.innerHTML = "";
    console.log(data);

    data.forEach(stat => {
      let newRow = table.insertRow();
      newRow.insertCell().textContent = stat[1];

      let playerSelect = null;
      let notefield = null;

      if (stat[3] === "true") {
        playerSelect = document.createElement("select");
        for (let p = 1; p <= 30; p++) {
          let op = new Option(`Player ${p}`, p);
          playerSelect.options.add(op);
        }
        newRow.insertCell().appendChild(playerSelect);
      }

      if (stat[4] === "true") {
        notefield = document.createElement("input");
        notefield.style.width = "200px";
        notefield.style.height = "50px";
        newRow.insertCell().appendChild(notefield);
      }

      if (stat[2] === "true") {
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "remove";
        removeBtn.onclick = async function () {
          await subfinalData(stat[5]);
          newRow.remove();
        };
        newRow.insertCell().appendChild(removeBtn);

        let addBtn = document.createElement("button");
        addBtn.textContent = "add";
        addBtn.onclick = async function () {
          let playerData = playerSelect ? playerSelect.value : -1;
          let noteData = notefield ? notefield.value : "-";

          myStats.push([stat[0], localStorage.getItem("gameID"), 1, playerData, noteData]);
          localStorage.setItem("newStats", JSON.stringify(myStats));

          await addfinalData(stat[0], localStorage.getItem("gameID"), 1, playerData, noteData);
        };
        newRow.insertCell().appendChild(addBtn);
      }
    });

    updateScores();
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

async function updateScores() {
  try {
    let homeGoals = await fetch(`http://127.0.0.1:5000/statByName/Home Goals/${localStorage.getItem("gameID")}`).then(res => res.json());
    let oppGoals = await fetch(`http://127.0.0.1:5000/statByName/Opponent Goals/${localStorage.getItem("gameID")}`).then(res => res.json());

    scores.innerHTML = `${homeGoals[0]} - ${oppGoals[0]}`;
  } catch (error) {
    console.error("Error updating scores:", error);
  }
}

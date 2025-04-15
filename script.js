const homeGoal = document.getElementById('homeGoal');
const homeNum = document.getElementById('homeNum');
const opponentGoal = document.getElementById('opponentGoal');
const opponentNum = document.getElementById('opponentNum');
const conditions = document.getElementById('conditions');
const weather = document.getElementById('weather');
const homeAssists = document.getElementById('homeAssists');
const opponentAssists = document.getElementById('opponentAssists');
const homeAssistNum = document.getElementById('homeAssistNum');
const opponentAssistNum = document.getElementById('opponentAssistNum');
const homeCorners = document.getElementById('homeCorners');
const opponentCorners = document.getElementById('opponentCorners');
const homeGoalKicks = document.getElementById('homeGoalKicks');
const opponentGoalKicks = document.getElementById('opponentGoalKicks');
const storeData = document.getElementById('storeData');
const addLineup = document.getElementById('addLineup');
const lineupContainer = document.getElementById('lineupContainer');

let homeGoals = {};
let opponentGoals = {};
let homeAssistCount = {};
let opponentAssistCount = {};
let homeCornerCount = 0;
let opponentCornerCount = 0;
let homeGoalKickCount = 0;
let opponentGoalKickCount = 0;
let lineupData = [];

function updateDisplay(id, data) {
    let displayText = "";
    let total = 0;
    for (let key in data) {
        displayText += `#${key}: ${data[key]}<br>`;
        total += data[key];
    }
    document.getElementById(id).innerHTML = displayText;
    const totalId = id === 'hScorers' ? 'hGoal' : id === 'oScorers' ? 'oGoal' : id === 'hAssister' ? 'hAssists' : 'oAssists';
    document.getElementById(totalId).innerText = total;
}

function updateConditionsStorage() {
    let fieldCondition = conditions.value;
    let weatherCondition = weather.value;
    if (fieldCondition === 'Other') {
        fieldCondition = document.getElementById('fieldOther').value;
    }
    if (weatherCondition === 'Other') {
        weatherCondition = document.getElementById('weatherOther').value;
    }
    localStorage.setItem('fieldCondition', fieldCondition);
    localStorage.setItem('weatherCondition', weatherCondition);
}

homeGoal.addEventListener('click', () => {
    const scorer = homeNum.value.trim();
    if (scorer) {
        homeGoals[scorer] = (homeGoals[scorer] || 0) + 1;
        updateDisplay('hScorers', homeGoals);
    }
});

opponentGoal.addEventListener('click', () => {
    const scorer = opponentNum.value.trim();
    if (scorer) {
        opponentGoals[scorer] = (opponentGoals[scorer] || 0) + 1;
        updateDisplay('oScorers', opponentGoals);
    }
});

homeAssists.addEventListener('click', () => {
    const assister = homeAssistNum.value.trim();
    if (assister) {
        homeAssistCount[assister] = (homeAssistCount[assister] || 0) + 1;
        updateDisplay('hAssister', homeAssistCount);
    }
});

opponentAssists.addEventListener('click', () => {
    const assister = opponentAssistNum.value.trim();
    if (assister) {
        opponentAssistCount[assister] = (opponentAssistCount[assister] || 0) + 1;
        updateDisplay('oAssister', opponentAssistCount);
    }
});

homeCorners.addEventListener('click', () => {
    homeCornerCount++;
    document.getElementById('hCorners').innerText = homeCornerCount;
});

opponentCorners.addEventListener('click', () => {
    opponentCornerCount++;
    document.getElementById('oCorners').innerText = opponentCornerCount;
});

homeGoalKicks.addEventListener('click', () => {
    homeGoalKickCount++;
    document.getElementById('hGoalKicks').innerText = homeGoalKickCount;
});

opponentGoalKicks.addEventListener('click', () => {
    opponentGoalKickCount++;
    document.getElementById('oGoalKicks').innerText = opponentGoalKickCount;
});

conditions.addEventListener('change', () => {
    document.getElementById('fieldOther').style.display = conditions.value === 'Other' ? 'block' : 'none';
    updateConditionsStorage();
});

weather.addEventListener('change', () => {
    document.getElementById('weatherOther').style.display = weather.value === 'Other' ? 'block' : 'none';
    updateConditionsStorage();
});

document.getElementById('fieldOther').addEventListener('input', updateConditionsStorage);
document.getElementById('weatherOther').addEventListener('input', updateConditionsStorage);

storeData.addEventListener('click', () => {
    localStorage.setItem('homeGoals', JSON.stringify(homeGoals));
    localStorage.setItem('opponentGoals', JSON.stringify(opponentGoals));
    localStorage.setItem('homeAssists', JSON.stringify(homeAssistCount));
    localStorage.setItem('opponentAssists', JSON.stringify(opponentAssistCount));
    localStorage.setItem('homeCorners', homeCornerCount);
    localStorage.setItem('opponentCorners', opponentCornerCount);
    localStorage.setItem('homeGoalKicks', homeGoalKickCount);
    localStorage.setItem('opponentGoalKicks', opponentGoalKickCount);
    localStorage.setItem('lineup', JSON.stringify(lineupData));
    alert('Game data saved!');
});

function addLineupRow(position = '', number = '') {
    const row = document.createElement('div');
    row.style.marginTop = '10px';

    const positionSelect = document.createElement('select');
    ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Other'].forEach(pos => {
        const option = document.createElement('option');
        option.value = pos;
        option.text = pos;
        positionSelect.appendChild(option);
    });
    positionSelect.value = position;

    const numberInput = document.createElement('input');
    numberInput.type = 'text';
    numberInput.placeholder = 'Player Number';
    numberInput.value = number;

    positionSelect.addEventListener('change', saveLineup);
    numberInput.addEventListener('input', saveLineup);

    row.appendChild(positionSelect);
    row.appendChild(numberInput);
    lineupContainer.appendChild(row);

    saveLineup();
}

function saveLineup() {
    lineupData = [];
    const rows = lineupContainer.querySelectorAll('div');
    rows.forEach(row => {
        const select = row.querySelector('select');
        const input = row.querySelector('input');
        if (select && input) {
            lineupData.push({ position: select.value, number: input.value });
        }
    });
    localStorage.setItem('lineup', JSON.stringify(lineupData));
}

addLineup.addEventListener('click', () => addLineupRow());

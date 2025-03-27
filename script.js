const homeGoal = document.getElementById('homeGoal');
const homeNum = document.getElementById('homeNum');
const opponentGoal = document.getElementById('opponentGoal');
const opponentNum = document.getElementById('opponentNum');
const conditions = document.getElementById('conditions');
const weather = document.getElementById('weather');
const updateConditions = document.getElementById('updateConditions');
const homeAssists = document.getElementById('homeAssists');
const opponentAssists = document.getElementById('opponentAssists');
const homeAssistNum = document.getElementById('homeAssistNum');
const opponentAssistNum = document.getElementById('opponentAssistNum');
const homeCorners = document.getElementById('homeCorners');
const opponentCorners = document.getElementById('opponentCorners');
const homeGoalKicks = document.getElementById('homeGoalKicks');
const opponentGoalKicks = document.getElementById('opponentGoalKicks');
const storeData = document.getElementById('storeData');

let homeGoals = {};
let opponentGoals = {};
let homeAssistCount = {};
let opponentAssistCount = {};
let homeCornerCount = 0;
let opponentCornerCount = 0;
let homeGoalKickCount = 0;
let opponentGoalKickCount = 0;

function updateDisplay(id, data) {
    let displayText = "";
    for (let key in data) {
        displayText += `#${key}: ${data[key]}<br>`;
    }
    document.getElementById(id).innerHTML = displayText;
}

homeGoal.addEventListener('click', function () {
    const scorer = homeNum.value.trim();
    if (scorer) {
        homeGoals[scorer] = (homeGoals[scorer] || 0) + 1;
        updateDisplay('hScorers', homeGoals);
    }
});

opponentGoal.addEventListener('click', function () {
    const scorer = opponentNum.value.trim();
    if (scorer) {
        opponentGoals[scorer] = (opponentGoals[scorer] || 0) + 1;
        updateDisplay('oScorers', opponentGoals);
    }
});

homeAssists.addEventListener('click', function () {
    const assister = homeAssistNum.value.trim();
    if (assister) {
        homeAssistCount[assister] = (homeAssistCount[assister] || 0) + 1;
        updateDisplay('hAssister', homeAssistCount);
    }
});

opponentAssists.addEventListener('click', function () {
    const assister = opponentAssistNum.value.trim();
    if (assister) {
        opponentAssistCount[assister] = (opponentAssistCount[assister] || 0) + 1;
        updateDisplay('oAssister', opponentAssistCount);
    }
});

homeCorners.addEventListener('click', function () {
    homeCornerCount++;
    document.getElementById('hCorners').innerText = homeCornerCount;
});

opponentCorners.addEventListener('click', function () {
    opponentCornerCount++;
    document.getElementById('oCorners').innerText = opponentCornerCount;
});

homeGoalKicks.addEventListener('click', function () {
    homeGoalKickCount++;
    document.getElementById('hGoalKicks').innerText = homeGoalKickCount;
});

opponentGoalKicks.addEventListener('click', function () {
    opponentGoalKickCount++;
    document.getElementById('oGoalKicks').innerText = opponentGoalKickCount;
});

updateConditions.addEventListener('click', function () {
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
});

storeData.addEventListener('click', function () {
    localStorage.setItem('homeGoals', JSON.stringify(homeGoals));
    localStorage.setItem('opponentGoals', JSON.stringify(opponentGoals));
    localStorage.setItem('homeAssists', JSON.stringify(homeAssistCount));
    localStorage.setItem('opponentAssists', JSON.stringify(opponentAssistCount));
    localStorage.setItem('homeCorners', homeCornerCount);
    localStorage.setItem('opponentCorners', opponentCornerCount);
    localStorage.setItem('homeGoalKicks', homeGoalKickCount);
    localStorage.setItem('opponentGoalKicks', opponentGoalKickCount);
    alert('Game data saved!');
});

conditions.addEventListener('change', function () {
    document.getElementById('fieldOther').style.display = conditions.value === 'Other' ? 'block' : 'none';
});

weather.addEventListener('change', function () {
    document.getElementById('weatherOther').style.display = weather.value === 'Other' ? 'block' : 'none';
});

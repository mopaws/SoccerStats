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

let homeGoals = 0;
let opponentGoals = 0;
let homeAssistCount = 0;
let opponentAssistCount = 0;
let homeCornerCount = 0;
let opponentCornerCount = 0;
let homeGoalKickCount = 0;
let opponentGoalKickCount = 0;

let homeScorers = {}; 
let opponentScorers = {}; 
let homeAssisters = {};
let opponentAssisters = {};

function updateDisplay(scorers, elementId) {
    let displayText = Object.entries(scorers)
        .map(([player, count]) => `${count} for ${player}`)
        .join(", ");
    document.getElementById(elementId).innerText = displayText;
}

homeGoal.addEventListener('click', function () {
    if (homeNum.value.trim() !== "") {
        homeGoals++;
        homeScorers[homeNum.value] = (homeScorers[homeNum.value] || 0) + 1;
        document.getElementById('hGoal').innerText = homeGoals;
        updateDisplay(homeScorers, 'hScorers');
    }
});

opponentGoal.addEventListener('click', function () {
    if (opponentNum.value.trim() !== "") {
        opponentGoals++;
        opponentScorers[opponentNum.value] = (opponentScorers[opponentNum.value] || 0) + 1;
        document.getElementById('oGoal').innerText = opponentGoals;
        updateDisplay(opponentScorers, 'oScorers');
    }
});

homeAssists.addEventListener('click', function () {
    if (homeAssistNum.value.trim() !== "") {
        homeAssistCount++;
        homeAssisters[homeAssistNum.value] = (homeAssisters[homeAssistNum.value] || 0) + 1;
        document.getElementById('hAssists').innerText = homeAssistCount;
        updateDisplay(homeAssisters, 'hAssister');
    }
});

opponentAssists.addEventListener('click', function () {
    if (opponentAssistNum.value.trim() !== "") {
        opponentAssistCount++;
        opponentAssisters[opponentAssistNum.value] = (opponentAssisters[opponentAssistNum.value] || 0) + 1;
        document.getElementById('oAssists').innerText = opponentAssistCount;
        updateDisplay(opponentAssisters, 'oAssister');
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

homeGoalKicks.addEventListener('click', function ()

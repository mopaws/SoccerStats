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

let homeGoals = 0;
let opponentGoals = 0;
let homeAssistCount = 0;
let opponentAssistCount = 0;
let homeCornerCount = 0;
let opponentCornerCount = 0;
let homeGoalKickCount = 0;
let opponentGoalKickCount = 0;

homeGoal.addEventListener('click', function () {
    homeGoals++;
    document.getElementById('hGoal').innerText = homeGoals;
    document.getElementById('hScorers').innerText = homeNum.value;
});

opponentGoal.addEventListener('click', function () {
    opponentGoals++;
    document.getElementById('oGoal').innerText = opponentGoals;
    document.getElementById('oScorers').innerText = opponentNum.value;
});

homeAssists.addEventListener('click', function () {
    homeAssistCount++;
    document.getElementById('hAssists').innerText = homeAssistCount;
    document.getElementById('hAssister').innerText = homeAssistNum.value;
});

opponentAssists.addEventListener('click', function () {
    opponentAssistCount++;
    document.getElementById('oAssists').innerText = opponentAssistCount;
    document.getElementById('oAssister').innerText = opponentAssistNum.value;
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

conditions.addEventListener('change', function () {
    if (conditions.value === 'Other') {
        document.getElementById('fieldOther').style.display = 'block';
    } else {
        document.getElementById('fieldOther').style.display = 'none';
    }
});

weather.addEventListener('change', function () {
    if (weather.value === 'Other') {
        document.getElementById('weatherOther').style.display = 'block';
    } else {
        document.getElementById('weatherOther').style.display = 'none';
    }
});

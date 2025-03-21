const homeGoal = document.getElementById('homeGoal');
const homeNum = document.getElementById('homeNum');
const opponentGoal = document.getElementById('opponentGoal');
const opponentNum = document.getElementById('opponentNum');
const conditions = document.getElementById('conditions');
const updateConditions = document.getElementById('updateConditions');
const homeAssists = document.getElementById('homeAssists');
const opponentAssists = document.getElementById('opponentAssists');
const homeAssistNum = document.getElementById('homeAssistNum');
const opponentAssistNum = document.getElementById('opponentAssistNum');
var drhsGoals = 0;
var oppGoals = 0;
var drhsAssists = 0;
var oppAssists = 0;

homeAssists.addEventListener('click', function(){
  drhsGoals++;
  document.getElementById('hGoal').innerText = drhsGoals;
  document.getElementById('hScorers').innerText = homeAssistNum.value;
});
opponentAssists.addEventListener('click', function(){
  drhsGoals++;
  document.getElementById('oGoal').innerText = oppGoals;
  document.getElementById('oScorers').innerText = opponentAssistNum.value;
});

homeGoal.addEventListener('click', function(){
  drhsGoals++;
  document.getElementById('hGoal').innerText = drhsGoals;
  document.getElementById('hScorers').innerText = homeNum.value;
});
opponentGoal.addEventListener('click', function(){
  drhsGoals++;
  document.getElementById('oGoal').innerText = oppGoals;
  document.getElementById('oScorers').innerText = opponentNum.value;
});

updateConditions.addEventListener('click', function() {
  document.getElementById('viewConditions').innerText = conditions.value;
});

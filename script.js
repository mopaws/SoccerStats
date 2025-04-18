const homeGoals = {};
const opponentGoals = {};
const homeGoalCount = 0;
let opponentGoalCount = 0;

const homeAssists = {};
const opponentAssists = {};
let homeAssistCount = 0;
let opponentAssistCount = 0;

let homeCorners = 0;
let opponentCorners = 0;
let homeGoalKicks = 0;
let opponentGoalKicks = 0;

function updateScorersDisplay(map, elementId) {
    const names = Object.entries(map).map(([num, count]) => `#${num}: ${count}`).join(', ');
    document.getElementById(elementId).textContent = names;
}

function incrementStat(map, inputId, displayId, scorerId) {
    const num = document.getElementById(inputId).value;
    if (!num) return;
    map[num] = (map[num] || 0) + 1;
    document.getElementById(displayId).textContent = Object.values(map).reduce((a, b) => a + b, 0);
    updateScorersDisplay(map, scorerId);
}

function updateSimpleStat(stat, displayId) {
    stat++;
    document.getElementById(displayId).textContent = stat;
    return stat;
}

document.getElementById('homeGoal').addEventListener('click', () => {
    homeGoalCount++;
    incrementStat(homeGoals, 'homeNum', 'hGoal', 'hScorers');
});

document.getElementById('opponentGoal').addEventListener('click', () => {
    opponentGoalCount++;
    incrementStat(opponentGoals, 'opponentNum', 'oGoal', 'oScorers');
});

document.getElementById('homeAssists').addEventListener('click', () => {
    homeAssistCount++;
    incrementStat(homeAssists, 'homeAssistNum', 'hAssists', 'hAssister');
});

document.getElementById('opponentAssists').addEventListener('click', () => {
    opponentAssistCount++;
    incrementStat(opponentAssists, 'opponentAssistNum', 'oAssists', 'oAssister');
});

document.getElementById('homeCorners').addEventListener('click', () => {
    homeCorners = updateSimpleStat(homeCorners, 'hCorners');
});

document.getElementById('opponentCorners').addEventListener('click', () => {
    opponentCorners = updateSimpleStat(opponentCorners, 'oCorners');
});

document.getElementById('homeGoalKicks').addEventListener('click', () => {
    homeGoalKicks = updateSimpleStat(homeGoalKicks, 'hGoalKicks');
});

document.getElementById('opponentGoalKicks').addEventListener('click', () => {
    opponentGoalKicks = updateSimpleStat(opponentGoalKicks, 'oGoalKicks');
});

const lineup = [];
document.getElementById('addLineup').addEventListener('click', () => {
    const number = prompt('Player Number:');
    const position = prompt('Player Position:');
    if (number && position) {
        lineup.push({ number, position });
        const p = document.createElement('p');
        p.textContent = `#${number} - ${position}`;
        document.getElementById('lineupContainer').appendChild(p);
    }
});

document.getElementById('other').addEventListener('change', (e) => {
    document.getElementById('fieldOther').style.display = e.target.checked ? 'inline-block' : 'none';
});

document.getElementById('Other').addEventListener('change', (e) => {
    document.getElementById('weatherOther').style.display = e.target.checked ? 'inline-block' : 'none';
});

document.getElementById('storeData').addEventListener('click', () => {
    const getCheckedValues = (ids) => ids.filter(id => document.getElementById(id).checked).map(id => {
        if (id.toLowerCase() === 'other') {
            const val = id === 'other' ? document.getElementById('fieldOther').value : document.getElementById('weatherOther').value;
            return val ? `Other: ${val}` : 'Other';
        }
        return document.getElementById(id).value;
    });

    const fieldConditions = getCheckedValues(['grass', 'turf', 'bumpy', 'smooth', 'dOff', 'nSide', 'other']);
    const weatherConditions = getCheckedValues(['sunny', 'windy', 'rainy', 'mist', 'cloudy', 'cold', 'hot', 'Other']);

    localStorage.setItem('homeGoals', JSON.stringify(homeGoals));
    localStorage.setItem('opponentGoals', JSON.stringify(opponentGoals));
    localStorage.setItem('homeAssists', JSON.stringify(homeAssists));
    localStorage.setItem('opponentAssists', JSON.stringify(opponentAssists));
    localStorage.setItem('homeCorners', homeCorners);
    localStorage.setItem('opponentCorners', opponentCorners);
    localStorage.setItem('homeGoalKicks', homeGoalKicks);
    localStorage.setItem('opponentGoalKicks', opponentGoalKicks);
    localStorage.setItem('fieldConditions', JSON.stringify(fieldConditions));
    localStorage.setItem('weatherConditions', JSON.stringify(weatherConditions));
    localStorage.setItem('lineup', JSON.stringify(lineup));
    alert('Game data stored!');
});

document.getElementById('downloadCSV').addEventListener('click', () => {
    const data = {
        homeGoals: JSON.parse(localStorage.getItem('homeGoals') || '{}'),
        opponentGoals: JSON.parse(localStorage.getItem('opponentGoals') || '{}'),
        homeAssists: JSON.parse(localStorage.getItem('homeAssists') || '{}'),
        opponentAssists: JSON.parse(localStorage.getItem('opponentAssists') || '{}'),
        homeCorners: localStorage.getItem('homeCorners') || 0,
        opponentCorners: localStorage.getItem('opponentCorners') || 0,
        homeGoalKicks: localStorage.getItem('homeGoalKicks') || 0,
        opponentGoalKicks: localStorage.getItem('opponentGoalKicks') || 0,
        fieldConditions: JSON.parse(localStorage.getItem('fieldConditions') || '[]'),
        weatherConditions: JSON.parse(localStorage.getItem('weatherConditions') || '[]'),
        lineup: JSON.parse(localStorage.getItem('lineup') || '[]')
    };

    let csv = "Category,Data\n";

    const formatStats = (map) => {
        return Object.entries(map)
            .map(([num, count]) => `#${num} - ${count}`)
            .join(', ');
    };

    csv += `Home Goals: ${formatStats(data.homeGoals)}\n`;
    csv += `Opponent Goals: ${formatStats(data.opponentGoals)}\n`;
    csv += `Home Assists: ${formatStats(data.homeAssists)}\n`;
    csv += `Opponent Assists: ${formatStats(data.opponentAssists)}\n`;

    csv += `Home Corners: ${data.homeCorners}\n`;
    csv += `Opponent Corners: ${data.opponentCorners}\n`;
    csv += `Home Goal Kicks: ${data.homeGoalKicks}\n`;
    csv += `Opponent Goal Kicks: ${data.opponentGoalKicks}\n`;

    csv += `Field Conditions: ${data.fieldConditions.join(', ')}\n`;
    csv += `Weather Conditions: ${data.weatherConditions.join(', ')}\n`;

    csv += "Lineup:\n";
    data.lineup.forEach(player => {
        csv += `#${player.number} - ${player.position}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'game_stats.csv';
    link.click();
});

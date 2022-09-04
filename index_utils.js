
function restartWithCheck() {
    if (getEle("checkbox_restart").checked) {
        getEle("checkbox_restart").checked = false;
        resetGame();
    }
}

function resetGame() {
    hero = constructStarterHero();
    monster = null;
    updateOverallDisplay();
}

function getEle(id) {
    return document.getElementById(id);
}

function calculateDiceRolls(diceRoll) {
    var rollTotal = 0;
    for (var i = 0; i < diceRoll.rolls; i++) {
        rollTotal += calculateSingleDiceRoll(diceRoll);
    }
    if (diceRoll.bonus) {
        rollTotal += diceRoll.bonus;
    }
    return rollTotal;
}

function calculateSingleDiceRoll(diceRoll) {
    var range = diceRoll.max - diceRoll.min + 1;
    var result = getRandomWholeNumberUnder(range)
    return result + diceRoll.min;
}

function getRandomWholeNumberUnder(range) {
    return Math.floor(Math.random()*range);
}

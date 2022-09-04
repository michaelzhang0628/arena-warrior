
var COMBAT_CONTROLS_LOCK = false

function isCombatActive() {
    return !(!monster);
}

function activateCombatControls() {
    COMBAT_CONTROLS_LOCK = false;
}

function lockCombatControls() {
    COMBAT_CONTROLS_LOCK = true;
}


var COMBAT_CONTROLS_LOCK = false

function isCombatActive() {
    return !(!monster);
}

function activateCombatControls() {
    COMBAT_CONTROLS_LOCK = false;
    updateCombatControls();
}

function lockCombatControls() {
    COMBAT_CONTROLS_LOCK = true;
    updateCombatControls();
}

function setArenaMessage(message) {
    document.getElementById("arena_message").innerHTML = message;
}

function updateCombatControls() {
    const noPotionsLeft = hero.healingPotionCount < 1;
    const noPortalsLeft = hero.escapePortalCount < 1;
    document.getElementById("button_attack").disabled = COMBAT_CONTROLS_LOCK;
    document.getElementById("button_heal").disabled =
        (COMBAT_CONTROLS_LOCK || noPotionsLeft);
    document.getElementById("button_escape").disabled =
        (COMBAT_CONTROLS_LOCK || noPortalsLeft);
}

function commandAttack() {
    if (COMBAT_CONTROLS_LOCK) {
        return;
    }
    lockCombatControls();
    const currentWeapon = WEAPONS[hero.weaponIndex];
    setArenaMessage("You attack the " + monster.name
        + " with your " + currentWeapon.label + "!");
    //setTimeout(monsterAttack, 2000);
    addToSpriteLoadQueue(
        "weapon", currentWeapon.spriteSheet, 1, 225, 200,
        currentWeapon.frames, 0);
    setTimeout(
        () => {
            spriteLoadQueue.push(
                {
                    "id": "weapon",
                    "state": "remove"
                }
            );
            updateOverallDisplay();
            activateCombatControls();
        },
        1500);
}
function commandHeal() {
    if (COMBAT_CONTROLS_LOCK) {
        return;
    }
    if (hero.healingPotionCount < 1) {
        return;
    }
    hero.healingPotionCount--;
    setArenaMessage("You drink a potion to heal yourself!");
    addToSpriteLoadQueue(
        "potion", "potion.png", 1, 225, 200,
        [
            {
                "frame": 0,
                "durationMs": 100
            },
            {
                "frame": 1,
                "durationMs": 100
            },
            {
                "frame": 2,
                "durationMs": 100
            }
        ],
        0);
    setTimeout(
        () => {
            spriteLoadQueue.push(
                {
                    "id": "potion",
                    "state": "remove"
                }
            );
            updateOverallDisplay();
            activateCombatControls();
        },
        1500);
}
function commandEscape() {
    if (COMBAT_CONTROLS_LOCK) {
        return;
    }
    if (hero.escapePortalCount < 1) {
        return;
    }
    hero.escapePortalCount--;
    setArenaMessage("You use a portal to escape!");
    addToSpriteLoadQueue(
        "portal", "changingStar.png", 1, 150, 150,
        [
            {
                "frame": 0,
                "durationMs": 100
            },
            {
                "frame": 1,
                "durationMs": 100
            }
        ],
        0);
    setTimeout(
        () => {
            spriteLoadQueue.push(
                {
                    "id": "portal",
                    "state": "remove"
                }
            );
            updateOverallDisplay();
            activateCombatControls();
        },
        1500);
}
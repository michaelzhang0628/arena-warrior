
var COMBAT_CONTROLS_LOCK = false

function isCombatActive() {
    return !(!monster);
}

function endCombat() {
    monster = null;
    removeSpriteLoadQueue("weapon");
    removeSpriteLoadQueue("potion");
    removeSpriteLoadQueue("portal");
    removeSpriteLoadQueue("monster");
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
    console.log("ZZZ hero.weaponIndex - " + hero.weaponIndex);
    const currentWeapon = WEAPONS[hero.weaponIndex];
    setArenaMessage("You attack the " + monster.name
        + " with your " + currentWeapon.label + "!");
    //setTimeout(monsterAttack, 2000);
    addToSpriteLoadQueue(
        "weapon", currentWeapon.spriteSheet, 1, 225, 200,
        currentWeapon.frames, 0);
    //determine hero attach result - hit or miss, evaluate victory
    setTimeout(attackSequenceHeroAttacks, 1500);
}
function commandHeal() {
    if (COMBAT_CONTROLS_LOCK) {
        return;
    }
    if (hero.healingPotionCount < 1) {
        return;
    }
    lockCombatControls();
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
            //monster = null;
            console.log("ZZZ currentHealth - " + hero.currentHealth);
            const healAmount = Math.floor((hero.maximumHealth * 0.25) + 10);
            hero.currentHealth += healAmount;
            if (hero.currentHealth > hero.maximumHealth) {
                hero.currentHealth = hero.maximumHealth;
            }
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
    lockCombatControls();
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
            endCombat();
            updateOverallDisplay();
            //activateCombatControls();
        },
        1500);
}

function isHeroAttackHit() {
    return true;
}

function isMonsterAttackHit() {
    return true;
}

function getHeroAttackDamage() {
    return 10;
}

function getMonsterAttackDamage() {
    return 10;
}

function getMonsterGold() {
    return 10;
}

function attackSequenceHeroAttacks() {
    spriteLoadQueue.push(
        {
            "id": "weapon",
            "state": "remove"
        }
    );
    if (isHeroAttackHit()) {
        setArenaMessage("You hit the " + monster.name + "!");
        monster.currentHealth -= getHeroAttackDamage();
        updateOverallDisplay();
        //
        //TO DO - Check if victorious, check if win game
        if (monster.currentHealth <= 0) {
            setTimeout(
                () => {
                    setArenaMessage(
                        "The " + monster.name + " falls and you are victorious!");
                    setTimeout(
                        () => {
                            setArenaMessage(
                                "You receive " + getMonsterGold() + " gold!");
                            setTimeout(
                                () => {
                                    endCombat();
                                    updateOverallDisplay();
                                },
                                1000
                            );
                        },
                        1000
                    );
                },
                1000);
        } else {
            setTimeout(attackSequenceMonsterAttacks, 2000);
        }
    } else {
        setArenaMessage("You missed the " + monster.name + "!");
        setTimeout(attackSequenceMonsterAttacks, 2000);
    }
}
function attackSequenceMonsterAttacks() {
    //setArenaMessage("The " + monster.name + " attacks you!");
    if (isMonsterAttackHit()) {
        setArenaMessage("The " + monster.name + " hits you!");
        hero.currentHealth -= getMonsterAttackDamage();
        updateOverallDisplay();
        //
        //TO DO - Check if defeated
    } else {
        setArenaMessage("The " + monster.name + " missed you!");
    }
    setTimeout(
        () => {
            setArenaMessage("The " + monster.name + " hits you!");
            setTimeout(
                () => {
                    setArenaMessage("Make your move.");
                    updateOverallDisplay();
                    activateCombatControls();
                },
                2000
            );
        },
        2000
    );
}

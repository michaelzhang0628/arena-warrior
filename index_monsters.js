var MONSTERS = [
    {
        "name": "Bruh",
        "occurrence": {
            0: 3,
            1: 3,
            2: 3,
            3: 3
        },
        "healthFormula": {
            "base": 30,
            "diceRoll": {
                "min": 1,
                "max": 10,
                "rolls": 3
            }
        },
        "damageFormula": {
            "base": 5,
            "diceRoll": {
                "min": 1,
                "max": 7,
                "rolls": 2
            }
        },
        "treasureFormula": {
            "base": 30,
            "diceRoll": {
                "min": 1,
                "max": 7,
                "rolls": 2
            }
        },
        "motionFrames": {
            "file": "BrUh.png",
            "frames": [
                {
                    "frame": 4,
                    "durationMs": 1600
                },
                {
                    "frame": 3,
                    "durationMs": 200
                }
            ]
        }
    },
];
function startCombat() {
    console.log("ZZZ 0");
    var monsterOccurrenceArray = [];
    for (var i = 0; i < MONSTERS.length; i++) {
        var count = MONSTERS[i].occurrence[hero.levelIndex];
        if (count) {
            for (var j = 0; j < count; j++) {
                monsterOccurrenceArray.push(i);
            }
        }
    }
    console.log("ZZZ monsterOccurrenceArray.length - " + monsterOccurrenceArray.length);
    var index = getRandomWholeNumberUnder(monsterOccurrenceArray.length)
    console.log("ZZZ index - " + index);
    //monster should be cloned because things like health
    //should be reset before each battle
    var monsterIndex = monsterOccurrenceArray[index];
    var cloneMonster = JSON.parse(JSON.stringify(MONSTERS[monsterIndex]));
    cloneMonster.currentHealth = cloneMonster.healthFormula.base
        + calculateDiceRolls(cloneMonster.healthFormula.diceRoll);
    //
    monster = cloneMonster;
    addToSpriteLoadQueue(
        "monster", monster.motionFrames.file, 0, 150, 150,
        monster.motionFrames.frames,
        0
    );
    //
    /*
    console.log("ZZZ 1");
    addToSpriteLoadQueue(
        "monster", "sword.png", 0, 150, 150,
        [
            {
                "frame": 0,
                "durationMs": 700
            },
            {
                "frame": 1,
                "durationMs": 200
            },
            {
                "frame": 2,
                "durationMs": 400
            }
        ],
        5
    );
    console.log("ZZZ 2");
    */
    //updateSprites(game);
    //
    //
    setArenaMessage("You're fighting a " + monster.name + "!");
    lockCombatControls();
    setTimeout(activateCombatControls, 2000);
    updateOverallDisplay();
}

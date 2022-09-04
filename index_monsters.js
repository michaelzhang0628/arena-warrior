var MONSTERS = [
    {
        "name": "Bruh",
        "occurrence": {
            0: 3
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
            "frames": []
        }
    },
];
function selectMonster(difficultyLevel) {
    var monster = MONSTERS[0];
    //monster should be cloned because things like health
    //should be reset before each battle
    var cloneMonster = JSON.parse(JSON.stringify(monster));
    return cloneMonster;
}
function calculateMonsterHealth(monster) {

}
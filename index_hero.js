
var STARTING_GOLD = 5000;
var STARTING_HEALING_POTIONS = 2;
var STARTING_ESCAPE_PORTALS = 1;

var LEVELS = [
    {
        label: "Conscript",
        maximumHealth: 20,
        cost: 0,
        hitModifier: 0,
        damageModifier: 0,
        armorModifier: 0,
    },
    {
        label: "Gladiator",
        maximumHealth: 30,
        cost: 100,
        hitModifier: 1,
        damageModifier: 0,
        armorModifier: 0
    },
    {
        label: "Hero",
        maximumHealth: 40,
        cost: 200,
        hitModifier: 1,
        damageModifier: 1,
        armorModifier: 0
    },
    {
        label: "Champion",
        maximumHealth: 50,
        cost: 300,
        hitModifier: 1,
        damageModifier: 2,
        armorModifier: 1
    }
];

function constructStarterHero() {
    return {
        levelIndex: 0,
        gold: STARTING_GOLD,
        currentHealth: LEVELS[0].maximumHealth,
        maximumHealth: LEVELS[0].maximumHealth,
        weaponIndex: 0,
        armorIndex: 0,
        healingPotionCount: STARTING_HEALING_POTIONS,
        escapePortalCount: STARTING_ESCAPE_PORTALS
    };
}
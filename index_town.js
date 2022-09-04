
var COST_HEALING_POTION = 10;
var COST_ESCAPE_PORTAL = 20;

// HEALING POTIONS

function canPurchaseHealingPotion() {
    return (hero.gold >= COST_HEALING_POTION);
}

function purchaseHealingPotion() {
    hero.gold = hero.gold - COST_HEALING_POTION;
    hero.healingPotionCount++;
    updateOverallDisplay();
}

function getPotionButtonLabel() {
    return "By Potion (" + COST_HEALING_POTION + " gold)";
}
// ESCAPE PORTALS

function canPurchaseEscapePortal() {
    return (hero.gold >= COST_ESCAPE_PORTAL);
}

function purchaseEscapePortal() {
    hero.gold = hero.gold - COST_ESCAPE_PORTAL;
    hero.escapePortalCount++;
    updateOverallDisplay();
}

function getPortalButtonLabel() {
    return "By Portal (" + COST_ESCAPE_PORTAL + " gold)";
}

// WEAPONS

function isNotMaximumWeapon() {
    return hero.weaponIndex < WEAPONS.length - 1;
}

function canPurchaseWeapon() {
    if (isNotMaximumWeapon()) {
        return hero.gold >= WEAPONS[hero.weaponIndex + 1].cost;
    } else {
        return false;
    }
}

function purchaseWeapon() {
    hero.gold = hero.gold - WEAPONS[hero.weaponIndex + 1].cost;
    hero.weaponIndex++;
    updateOverallDisplay();
}

function getWeaponButtonLabel() {
    if (isNotMaximumWeapon()) {
        return "Upgrade to " + WEAPONS[hero.weaponIndex + 1].label
            + " (" + WEAPONS[hero.weaponIndex + 1].cost + " gold)";
    } else {
        return "No better weapon available";
    }
}

// ARMOR

function isNotMaximumArmor() {
    return hero.armorIndex < ARMOR.length - 1;
}

function canPurchaseArmor() {
    if (isNotMaximumArmor()) {
        return hero.gold >= ARMOR[hero.armorIndex + 1].cost;
    } else {
        return false;
    }
}

function purchaseArmor() {
    hero.gold = hero.gold - ARMOR[hero.armorIndex + 1].cost;
    hero.armorIndex++;
    updateOverallDisplay();
}

function getArmorButtonLabel() {
    if (isNotMaximumArmor()) {
        return "Upgrade to " + ARMOR[hero.armorIndex + 1].label
            + " (" + ARMOR[hero.armorIndex + 1].cost + " gold)";
    } else {
        return "No better armor available";
    }
}

// LEVEL UP

function isNotMaximumLevel() {
    return hero.levelIndex < LEVELS.length - 1;
}

function canPurchaseLevelUp() {
    if (isNotMaximumLevel()) {
        return hero.gold >= LEVELS[hero.levelIndex + 1].cost;
    } else {
        return false;
    }
}

function purchaseLevelUp() {
    hero.gold = hero.gold - LEVELS[hero.levelIndex + 1].cost;
    hero.levelIndex++;
    updateOverallDisplay();
}

function getLevelUpButtonLabel() {
    if (isNotMaximumLevel()) {
        return "Become a " + LEVELS[hero.levelIndex + 1].label
            + " (" + LEVELS[hero.levelIndex + 1].cost + " gold)";
    } else {
        return "No further training available";
    }
}

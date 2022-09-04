
function updateOverallDisplay() {
    updateCombatDisplay();
    updateHeroDisplay();
    updateTownDisplay();
}

function updateHeroDisplay() {
    getEle("hero_rank").innerHTML = LEVELS[hero.levelIndex].label;
    getEle("hero_gold").innerHTML = hero.gold;
    getEle("hero_weapon").innerHTML = WEAPONS[hero.weaponIndex].label;
    getEle("hero_health").innerHTML = hero.currentHealth + "/" + hero.maximumHealth;
    getEle("hero_armor").innerHTML = ARMOR[hero.armorIndex].label;
    getEle("hero_healing_potions").innerHTML = hero.healingPotionCount;
    getEle("hero_escape_portals").innerHTML = hero.escapePortalCount;
}

function updateCombatDisplay() {
    if (isCombatActive()) {
        getEle("monster_pane").style.display = 'block';
    } else {
        getEle("monster_pane").style.display = 'none';
    }
}

function updateTownDisplay() {
    if (!isCombatActive()) {
        getEle("button_buy_potion").disabled = !canPurchaseHealingPotion();
        getEle("button_buy_potion").innerHTML = getPotionButtonLabel();
        getEle("button_buy_portal").disabled = !canPurchaseEscapePortal();
        getEle("button_buy_portal").innerHTML = getPortalButtonLabel();
        getEle("button_buy_weapon").disabled = !canPurchaseWeapon();
        getEle("button_buy_weapon").innerHTML = getWeaponButtonLabel();
        getEle("button_buy_armor").disabled = !canPurchaseArmor();
        getEle("button_buy_armor").innerHTML = getArmorButtonLabel();
        getEle("button_train").disabled = !canPurchaseLevelUp();
        getEle("button_train").innerHTML = getLevelUpButtonLabel();
        getEle("town_pane").style.display = 'block';
    } else {
        getEle("town_pane").style.display = 'none';
    }
}

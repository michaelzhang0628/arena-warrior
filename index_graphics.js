
var spriteLoadQueue = [];
var loadedSpriteSheets = [];
var sprites = {};

function addToSpriteLoadQueue(id, spriteSheet, depth, xPosition, yPosition, motionSequence, cycles) {
    spriteLoadQueue.push(
        {
            "id": id,
            "spriteSheet": spriteSheet,
            "depth": depth,
            "xPosition": xPosition,
            "yPosition": yPosition,
            "motionSequence": motionSequence,
            "cycles": cycles
        }
    );
}
function removeSpriteLoadQueue(id) {
    spriteLoadQueue.push(
        {
            "id": id,
            "state": "remove"
        }
    );
}
function incorporateNewSprites(game) {
    var nextNewFrame;
    while (nextNewFrame = spriteLoadQueue.pop()) {
        console.log("ZZZ LOADING SPRITE (nextNewFrame = " + nextNewFrame.id + ")");
        nextNewFrame.startTimeMs = Date.now();
        if (nextNewFrame.state === "remove") {
            if (sprites[nextNewFrame.id]) {
                sprites[nextNewFrame.id].obj.destroy();
                delete sprites[nextNewFrame.id];
            }
        } else if (loadedSpriteSheets.indexOf(nextNewFrame.spriteSheet) !== -1) {
            console.log("ZZZ LOADING SPRITE (PREEXISTING)");
            sprites[nextNewFrame.id] = nextNewFrame;
            nextNewFrame.obj = game.add.sprite(
                nextNewFrame.xPosition, nextNewFrame.yPosition,
                nextNewFrame.spriteSheet);
            nextNewFrame.obj.setFrame(nextNewFrame.motionSequence[0].frame);
            nextNewFrame.obj.setDepth(nextNewFrame.depth);
        } else {
            console.log("ZZZ LOADING SPRITE (CREATING)");
            var localNextNewFrame = nextNewFrame;
            game.load.once(
                Phaser.Loader.Events.FILE_COMPLETE,
                (a, b, c) => {
                    if (a === localNextNewFrame.spriteSheet && b === "spritesheet") {
                        loadedSpriteSheets.push(localNextNewFrame.spriteSheet);
                        localNextNewFrame.obj = game.add.sprite(
                            localNextNewFrame.xPosition, localNextNewFrame.yPosition,
                            localNextNewFrame.spriteSheet);
                        sprites[localNextNewFrame.id] = localNextNewFrame;
                        localNextNewFrame.obj.setFrame(localNextNewFrame.motionSequence[0].frame);
                        localNextNewFrame.obj.setDepth(localNextNewFrame.depth);
                    }
                }
            );
            game.load.spritesheet(
                nextNewFrame.spriteSheet, nextNewFrame.spriteSheet,
                {frameWidth: 200, frameHeight: 200}
            );
            game.load.start();
            //
        }
        //
    }
}

function updateSpriteFramesAndRemoveThoseThatHaveTimedOut(game) {
    var spriteNames = Object.keys(sprites);
    for (var i = 0; i < spriteNames.length; i++) {
        var nextSpriteName = spriteNames[i];
        var nextSprite = sprites[nextSpriteName];
        //
        var currentTimeMs = Date.now();
        var elapsedTimeMs = (currentTimeMs - nextSprite.startTimeMs);
        var totalMotionSequenceTimeMs = 0;
        nextSprite.motionSequence.forEach(
            (a) => {
                totalMotionSequenceTimeMs += a.durationMs;
            }
        );
        if (!nextSprite.cycles || nextSprite.cycles < 0
            || nextSprite.cycles >= ((1.0)*elapsedTimeMs)/totalMotionSequenceTimeMs) {
            var frameOffsetMs = elapsedTimeMs%totalMotionSequenceTimeMs;
            var selectedFrame = 0;
            var accumulatedMs = 0;
            nextSprite.motionSequence.forEach(
                (a) => {
                    accumulatedMs += a.durationMs;
                    if (accumulatedMs < frameOffsetMs) {
                        selectedFrame++;
                    }
                }
            );
            nextSprite.obj.setFrame(nextSprite.motionSequence[selectedFrame].frame);
        } else {
            sprites[nextSpriteName].obj.destroy();
            delete sprites[nextSpriteName];
        }
    }
}

function updateSprites(game) {
    incorporateNewSprites(game);
    updateSpriteFramesAndRemoveThoseThatHaveTimedOut(game);
}

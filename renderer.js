let Blob = require ('./model/Blob.js').Blob;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let GameEngine = require('./model/GameEngine');
// let GameEngineController = require('./model/GameEngineController.js');
let KeyboardInput = require("./model/KeyboardInput.js").KeyboardInput
let keyRegistration = require("./model/KeyboardInput.js").keyRegistration
let gameState
let canvasGameRenderer

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

    let newBlobArray = [
        new Blob(1, 4, '#ff0000')];
    // let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(2, 9, "#FFAAAA", true)];

    gameState = new GameState(newBlobArray)
    console.log("got this far 1")
    canvasGameRenderer.RenderGameState(gameState)
    console.log("got this far 2")

    let keys = [
        new keyRegistration("KeyZ", () => canvasGameRenderer.RenderGameState(GameEngine.keyLeft(gameState))),
        new keyRegistration("KeyX", () => canvasGameRenderer.RenderGameState(GameEngine.keyRight(gameState))),
        new keyRegistration("Period", () => canvasGameRenderer.RenderGameState(GameEngine.keyDown(gameState))),
        new keyRegistration("Semicolon", () => canvasGameRenderer.RenderGameState(GameEngine.keyUp(gameState)))
    ]

    let ki = new KeyboardInput(keys);

    window.addEventListener("keydown", (e) => ki.keyDown(e), false);
    window.addEventListener("keyup", (e) => ki.keyUp(e), false);

    loop();
}


let timeAtLastTick = 0

function AnimationLoop(timestamp, gameRenderer, gameState) {
    if (timestamp - timeAtLastTick > 1000) {
        gameRenderer.RenderGameState(gameState)
        timeAtLastTick = timestamp
    }
    return gameState
}

function loop (timestamp) {
    gameState = AnimationLoop(timestamp, canvasGameRenderer, gameState)
    window.requestAnimationFrame(loop)
}

module.exports = {
    setup
}
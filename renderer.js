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
        new Blob(10, 12, '#0000ff', true),
        new Blob(1, 12, '#ffff00', true),
        new Blob(10, 1, '#ff00ff', true),
        new Blob(1, 1, '#00ff00', true),
    ];

    gameState = new GameState(newBlobArray)
    console.log("got this far 1")
    canvasGameRenderer.RenderGameState(gameState)
    console.log("got this far 2")

    let keys = [
        new keyRegistration("ArrowLeft", () => canvasGameRenderer.RenderGameState(GameEngine.keyLeft(gameState))),
        new keyRegistration("ArrowRight", () => canvasGameRenderer.RenderGameState(GameEngine.keyRight(gameState))),
        new keyRegistration("ArrowDown", () => canvasGameRenderer.RenderGameState(GameEngine.keyDown(gameState))),
        new keyRegistration("ArrowUp", () => canvasGameRenderer.RenderGameState(GameEngine.keyUp(gameState)))
    ]

    doc.getElementById("up-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyUp(gameState))
    doc.getElementById("left-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyLeft(gameState))
    doc.getElementById("right-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyRight(gameState))
    doc.getElementById("down-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyDown(gameState))

    doc.getElementById("finish-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.nextPlayer(gameState))

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
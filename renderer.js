let Blob = require ('./model/Blob.js').Blob;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let GameEngine = require('./model/GameEngine');
// let GameEngineController = require('./model/GameEngineController.js');
let KeyboardInput = require("./model/KeyboardInput.js").KeyboardInput
let keyRegistration = require("./model/KeyboardInput.js").keyRegistration
let gameState
let canvasGameRenderer

function finishButtonFunction(updateCurrentTeamDiv, doc) {
    return () => {
        gameState = GameEngine.nextPlayer(gameState);
        updateCurrentTeamDiv(doc, gameState);
        canvasGameRenderer.RenderGameState(gameState);
    };
}

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
    canvasGameRenderer.RenderGameState(gameState)
    updateCurrentTeamDiv(doc, gameState)

    let keys = [
        new keyRegistration("ArrowLeft", () => canvasGameRenderer.RenderGameState(GameEngine.keyLeft(gameState))),
        new keyRegistration("ArrowRight", () => canvasGameRenderer.RenderGameState(GameEngine.keyRight(gameState))),
        new keyRegistration("ArrowDown", () => canvasGameRenderer.RenderGameState(GameEngine.keyDown(gameState))),
        new keyRegistration("ArrowUp", () => canvasGameRenderer.RenderGameState(GameEngine.keyUp(gameState))),
        new keyRegistration("Space", finishButtonFunction(updateCurrentTeamDiv, doc))
    ]

    doc.getElementById("up-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyUp(gameState))
    doc.getElementById("left-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyLeft(gameState))
    doc.getElementById("right-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyRight(gameState))
    doc.getElementById("down-btn").onclick = () => canvasGameRenderer.RenderGameState(GameEngine.keyDown(gameState))

    function updateCurrentTeamDiv(doc1, gs) {
        doc1.getElementById("current-team").innerHTML = "Current team: " + gs.currentTurnIndex
    }

    doc.getElementById("finish-btn").onclick = finishButtonFunction(updateCurrentTeamDiv, doc)

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
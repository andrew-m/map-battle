let Blob = require ('./model/Blob.js').Blob;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let GameEngine = require('./model/GameEngine');
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

    let newBlobArray = []
    newBlobArray.push(new Blob(10, 12, '#0000ff', true))
    newBlobArray.push(new Blob(1, 12, '#ffff00', true))
    newBlobArray.push(new Blob(10, 1, '#ff00ff', true))
    newBlobArray.push(new Blob(1, 1, '#00ff00', true))

    doc.getElementById("add-btn").onclick = () => {
        var x = parseInt(doc.getElementById("x-txt").value, 10)
        var y = parseInt(doc.getElementById("y-txt").value, 10)
        newBlobArray.push(new Blob(x, y, '#707070', true))
    }

    doc.getElementById("start-btn").onclick = () => {
        disablePreStartControls(doc)
        setupGameEngineAndCanvas(doc, newBlobArray);
    }
}

function disablePreStartControls(doc) {
    document.getElementById("add-btn").disabled = true
    document.getElementById("start-btn").disabled = true
    doc.getElementById("pre-start").style.display = "none"
}

function setupGameEngineAndCanvas(doc, newBlobArray) {
    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));
    canvasGameRenderer.Setup();

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
}

module.exports = {
    setup
}
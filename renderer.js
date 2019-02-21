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

    doc.getElementById("set-grid-btn").onclick = () => {
        let width = parseInt(doc.getElementById("x-size").value, 10);
        let height = parseInt(doc.getElementById("y-size").value, 10);
        doc.getElementById("grid-setup").style.display = "none"

        setupTeams(doc, width, height);
    }

}

function setupTeams(doc, gridWidth, gridHeight) {
    doc.getElementById("pre-start").style.display = "block"
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    let colourArray = ["#ff0000","#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00"]
    let newBlobArray = []

    function getColour() {
        let colour = colourArray.pop();
        return colour || "#7070b0"
    }

    doc.getElementById("add-btn").onclick = () => {
        var x = parseInt(doc.getElementById("x-txt").value, 10)
        var y = parseInt(doc.getElementById("y-txt").value, 10)
        newBlobArray.push(new Blob(x, y, 1, getColour()))
    }

    doc.getElementById("start-btn").onclick = () => {
        disablePreStartControls(doc)
        setupGameEngineAndCanvas(doc, newBlobArray, gridWidth, gridHeight);
    }
}

function disablePreStartControls(doc) {
    document.getElementById("add-btn").disabled = true
    document.getElementById("start-btn").disabled = true
    doc.getElementById("pre-start").style.display = "none"
}

function setupGameEngineAndCanvas(doc, newBlobArray, gridWidth, gridHeight) {
    doc.getElementById("move-input-form").style.display = "block"
    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));
    gameState = new GameState(newBlobArray, gridWidth, gridHeight)

    canvasGameRenderer.Setup(gameState);
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
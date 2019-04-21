(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.blah = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Blob {
    constructor(x, y, number, colour = "#ff0000") {
        this.x = x
        this.y = y
        this.oldx = x
        this.oldy = y
        this.number = number;
        this.colour = colour
        this.vector = new Vector(0,0)
    }
}

module.exports = { Blob }
},{}],2:[function(require,module,exports){
//external events are:
//Turn submissions
// - firing angles
// - movements
//keyboard presses

//Which result in changes to the game state
//Such as angles/collisions being worked out
// With lives lost if hit.
//or blobs moving

//No loop really needed, but could detect keyboard events, as more fun than using a form.

//Game engine does NOT contain game state.
//It acts upon an event, and a game state, to create a new game state.
//Still sounds about right

//Immutable or mutable game state? I think mutable will be fine.
Vector = require('./Vector.js').Vector;
VectorCalculator = require('./VectorFromAngleCalculator.js')

function getCurrentBlob(gameState) {
    return gameState.Blobs[gameState.currentTurnIndex];
}

function keyLeft(gameState) {
    let currentBlob = getCurrentBlob(gameState);
    if (currentBlob.x > 1) {
        (moveLeft(currentBlob))
    }
    return gameState
}

function keyRight(gameState) {
    let currentBlob = getCurrentBlob(gameState);
    if (currentBlob.x < gameState.gridWidth) {
        (moveRight(getCurrentBlob(gameState)))
    }
    return gameState
}

function keyDown(gameState) {
    let currentBlob = getCurrentBlob(gameState);
    if(currentBlob.y > 1) {
        (moveDown(currentBlob))
    }
    return gameState
}

function keyUp(gameState) {
    let currentBlob = getCurrentBlob(gameState);
    if (currentBlob.y < gameState.gridHeight) {
        (moveUp(currentBlob))
    }
    return gameState
}

function nextPlayer (gameState) {
    var currentBlob = getCurrentBlob(gameState)
    currentBlob.oldx = currentBlob.x
    currentBlob.oldy = currentBlob.y
    gameState.currentTurnIndex += 1
    if (gameState.currentTurnIndex >= gameState.Blobs.length) {
        gameState.currentTurnIndex = 0
    }
    return gameState
}

function bearingFired (bearing, gameState) {
    let currentBlob = getCurrentBlob(gameState);
    let vector = VectorCalculator.calculateVector(bearing, 1);
    currentBlob.vector = vector
    return gameState
}

function moveUp(blob) {
    blob.y += 1 //OS grid references start in South West corner.
    return blob
}

function moveDown(blob) {
    blob.y -= 1
    return blob
}

function moveLeft(blob) {
    blob.x -= 1
    return blob
}

function moveRight(blob) {
    blob.x += 1
    return blob
}

module.exports = {
    keyLeft,
    keyRight,
    keyDown,
    keyUp,
    nextPlayer,
    bearingFired
}
},{"./Vector.js":5,"./VectorFromAngleCalculator.js":6}],3:[function(require,module,exports){
class GameState {
    constructor(blobs = [], gridWidth, gridHeight, currentTurnIndex = 0) {
        this.Blobs = blobs
        this.currentTurnIndex = currentTurnIndex
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.vector = null //Should this be on the blobs? Do we need two? (origin and destination)
    }
}

module.exports = {
    GameState
}
},{}],4:[function(require,module,exports){
//going to need some persistent state - so this feels like a class.

class keyRegistration {
    constructor(code, callBack) {
        this.code = code
        this.callBack = callBack
        this.ready = true
    }

    setReady(ready) {
        this.ready = ready
    }
}

class KeyboardInput {
    constructor(arrayOfKeyRegistrations) {
        this.keyRegistrations = arrayOfKeyRegistrations
    }

    keyDown (event) {
        let keyRegistration = this.keyRegistrations.find(keyReg => keyReg.code === event.code);
        if (keyRegistration !== undefined && keyRegistration.ready) {
            keyRegistration.callBack()
            keyRegistration.setReady(false)
        }
    }

    keyUp (event) {
        let keyRegistration = this.keyRegistrations
            .find(keyReg => keyReg.code === event.code);

        if (keyRegistration !== undefined) {
            keyRegistration.setReady(true);
        }
    }
}

module.exports = {KeyboardInput, keyRegistration}

},{}],5:[function(require,module,exports){
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

module.exports ={Vector}
},{}],6:[function(require,module,exports){
//https://softwareengineering.stackexchange.com/questions/179389/find-the-new-coordinates-using-a-starting-point-a-distance-and-an-angle

//Gist - trig is fine. _but_ js math libraries use radians not degrees.
//Can convert degrees to radians easily enough using ```radians = (degrees * (Math.PI/180)```

// Need to decide on a distance too. Could just be "bigger than the longest distance on the map"
// or could calculate distance to the edge (faff just to prevent it overflowing)
// or take distance as an input (could be good, in distance - more map reading).
// or set it at a finite distance


//so, fire at angle (simplest case for players)
//input angle in degrees (eg 10)
//soh cah toa in a right angle triangle
//Pick an arbitrary length for the hypotenuse? (greater than greatest distance)
//
Vector = require('./Vector.js').Vector;

function degreesToRadians (deg) {
    return (deg * (Math.PI/180))
}

function calculateVector(angleInDegrees, distance) {
    return angleRadiansAndDistanceToCoordinates(degreesToRadians(angleInDegrees), distance)
}

function angleRadiansAndDistanceToCoordinates(angleInRadians, distance) {
    //soh cah toa
    //sin(angle) = opp / hyp.
    //sin(angle) = x / distance
    //x = sin(angle) * distance
    let x = Math.sin(angleInRadians) * distance
    x = Math.round(x * 100) / 100

    //cosine(angle) = adj/hyp
    //cos(angle) * hyp = adj //where adj is y.
    let y = Math.cos(angleInRadians) * distance
    y = Math.round(y * 100) / 100
    return new Vector(x, y)
}

module.exports ={degreesToRadians, calculateVector}
},{"./Vector.js":5}],7:[function(require,module,exports){
class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup (gameState) {
        this.context = this.canvas.getContext("2d")
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gridWidth = gameState.gridWidth;
        this.gridHeight = gameState.gridHeight;
        this.squareWidth = this.width / this.gridWidth
        this.squareHeight = this.height / this.gridHeight
        this.clearWholeGameArea()

        //todo do this calculated from canvas and grid dimensions.
    }

    clearWholeGameArea() {
        let i;
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)

        let startx = 50;
        let starty = 50;
        let endx = 200;
        let endy = 200;

        for (let i = 0; i < this.gridWidth; i++) {
            startx = i * this.squareWidth
            endx = startx
            starty = 0
            endy = this.height
            drawGridLine(this.context, startx, starty, endx, endy);
        }

        for (i = 0; i < this.gridHeight; i++) {
            starty = i * this.squareHeight
            endy = starty
            startx = 0
            endx = this.width
            drawGridLine(this.context, startx, starty, endx, endy);
        }
    }

    RenderGameState(gameState){
        this.clearWholeGameArea()
        for (var i = 0; i < gameState.Blobs.length; i++) {
            var blob = gameState.Blobs[i]

            let res = this.CalculatePositionWidthAndHeight(blob.x, blob.y, this.gridWidth, this.gridHeight, this.width, this.squareWidth, this.squareHeight);

            if (gameState.currentTurnIndex === i) { //current blob
                var oldPositionRes = this.CalculatePositionWidthAndHeight(blob.oldx, blob.oldy, this.gridWidth, this.gridHeight, this.width, this.squareWidth, this.squareHeight);
                this.context.fillStyle = "#303050"
                // let squareSize = this.width / this.gridWidth
                this.context.fillRect(oldPositionRes.x - this.squareWidth/2, oldPositionRes.y - this.squareHeight/2, this.squareWidth, this.squareHeight)
            }
            this.context.fillStyle = blob.colour
            this.context.beginPath();
            this.context.arc(res.x, res.y, res.width / 2, 0, 2 * Math.PI);
            this.context.fill();
            this.context.strokeStyle = "#303030";
            this.context.lineWidth = 2
            this.context.stroke();

            drawShotFiredLine(this.context, blob, this.gridHeight, this.squareWidth, this.squareHeight)

            this.context.fillStyle = findContrastingTextColor(blob.colour)
            this.context.font = "30px Arial"
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(blob.number, res.x, res.y, 50)
        }

    }

    CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, gridWidth, gridHeight, canvasWidth, squareWidth, squareHeight) {
        return {
                x: findCenterOfGameSquareXInCanvasSpace(gridPositionX, squareWidth),
                y: findCenterOfGameSquareYInCanvasSpace(gridHeight, gridPositionY, squareHeight),
            width: squareWidth,
            height: squareHeight,
            radius: 25,
        }
    }
}

function findCenterOfGameSquareXInCanvasSpace(gridPositionX, squareWidth) {
    return (gridPositionX - 1) * (squareWidth) + (squareWidth / 2);
}

function findCenterOfGameSquareYInCanvasSpace(gridHeight, gridPositionY, squareHeight) {
    return ((gridHeight - gridPositionY) * squareHeight) + (squareHeight / 2);
}

function findContrastingTextColor(color){
    //source http://trendct.org/2016/01/22/how-to-choose-a-label-color-to-contrast-with-background/
    //could be better (move from this "half the hex total" algo to the w3c recommended brightness and
    // threshold described in the example. Would need to translate their rgb code to accept hex.
    return (color.replace('#','0x')) > (0xffffff/2) ? '#000000' : '#ffffff'
}

function drawGridLine(ctx, startx, starty, endx, endy) {
    let colour = "#50E0f0";
    let lineWidth = 1;

    drawLine(ctx, colour, lineWidth, startx, starty, endx, endy);
}

function drawShotFiredLine(ctx, blob, gridHeight, squareWidth, squareHeight) {
    let startx = findCenterOfGameSquareXInCanvasSpace(blob.x, squareWidth);
    let starty = findCenterOfGameSquareYInCanvasSpace(gridHeight, blob.y, squareHeight);

    drawLine(
        ctx,
        "#ff3500",
        4,
        startx,
        starty,
        startx + (blob.vector.x * squareWidth),
        starty - (blob.vector.y * squareHeight)
    )
}

function drawLine(ctx, colour, lineWidth, startx, starty, endx, endy) {
    ctx.strokeStyle = colour
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy)
    ctx.stroke()
}

module.exports = {  CanvasGameRenderer }
},{}],8:[function(require,module,exports){
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
        let bearing = parseInt(doc.getElementById("bearing").value, 10)
        console.log("Bearing: " + bearing)
        gameState = GameEngine.bearingFired(bearing, gameState);
        gameState = GameEngine.nextPlayer(gameState);
        updateCurrentTeamDiv(doc, gameState);
        canvasGameRenderer.RenderGameState(gameState);
        return false;
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

    doc.getElementById("move-input-form").onsubmit = finishButtonFunction(updateCurrentTeamDiv, doc)

    let ki = new KeyboardInput(keys);

    window.addEventListener("keydown", (e) => ki.keyDown(e), false);
    window.addEventListener("keyup", (e) => ki.keyUp(e), false);
}

module.exports = {
    setup
}
},{"./model/Blob.js":1,"./model/GameEngine":2,"./model/GameState.js":3,"./model/KeyboardInput.js":4,"./model/canvasGameRenderer":7}]},{},[8])(8)
});

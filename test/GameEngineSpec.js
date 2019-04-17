require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;
vectorCalc = require('../model/VectorFromAngleCalculator');

//todo get rid of runFramesUntilNothingElseChanges function, (and the "moved" variable Game Engine returns for it.
//You'll need to refactor these tests to have multiple ticks.


describe('On Keyboard Events', function (){
    it('Should move current player controlled blobs left', function (){
        let newBlobArray = [new Blob(3, 3, 1, "#AAFFAA"), new Blob(3,6,2)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should not move current player if would leave the map left', function (){
        let newBlobArray = [new Blob(1, 1, 1, "#AAFFAA")]
        let gameState = new GameState(newBlobArray, 2, 2)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(1)
        expect(gameState.Blobs[0].y).to.equal(1)
    })

    it('Should not move current player if would leave the map right', function (){
        let newBlobArray = [new Blob(2, 1, 1, "#AAFFAA")]
        let gameState = new GameState(newBlobArray, 2, 2)
        gameState = gameEngine.keyRight(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[0].y).to.equal(1)
    })

    it('Should not move current player if would leave the map top', function (){
        let newBlobArray = [new Blob(1, 2, 1, "#AAFFAA")]
        let gameState = new GameState(newBlobArray, 2, 2)
        gameState = gameEngine.keyUp(gameState)

        expect(gameState.Blobs[0].x).to.equal(1)
        expect(gameState.Blobs[0].y).to.equal(2)
    })

    it('Should not move current player if would leave the map bottom', function (){
        let newBlobArray = [new Blob(1, 1, 1, "#AAFFAA")]
        let gameState = new GameState(newBlobArray, 2, 2)
        gameState = gameEngine.keyDown(gameState)

        expect(gameState.Blobs[0].x).to.equal(1)
        expect(gameState.Blobs[0].y).to.equal(1)
    })

    it('should Add vector to the game state from bearing', function (){
        let newBlobArray = [new Blob(1, 1, 1, "#AAFFAA")]
        let gameState = new GameState(newBlobArray)

        gameState = gameEngine.bearingFired(90, gameState)
        expect(gameState.vector.x).to.be.above(0)
        expect(gameState.vector.y).to.equal(1)
    })

    it('should move the currentPlayer on when nextPlayer is invoked', function (){
        let newBlobArray = [new Blob(3, 3, 1, "#AAFFAA"), new Blob(3,6,1)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(3)
        expect(gameState.Blobs[1].x).to.equal(2)
    })

    it('currentPlayer should wrap around', function (){
        let newBlobArray = [new Blob(3, 3, 1, "#AAFFAA"), new Blob(3,6, 1)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('currentPlayer old positions should be updated at end of turn', function (){
        let newBlobArray = [new Blob(3, 3, 1, "#AAFFAA"), new Blob(3,6, 1)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].oldx).to.equal(3)
        expect(gameState.Blobs[0].oldy).to.equal(3)
        expect(gameState.Blobs[1].oldx).to.equal(3)
        expect(gameState.Blobs[1].oldy).to.equal(6)

        gameState = gameEngine.nextPlayer(gameState)
        expect(gameState.Blobs[0].oldx).to.equal(2)
        expect(gameState.Blobs[0].oldy).to.equal(3)
    })
})
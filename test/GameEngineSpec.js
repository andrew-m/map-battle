require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

//todo get rid of runFramesUntilNothingElseChanges function, (and the "moved" variable Game Engine returns for it.
//You'll need to refactor these tests to have multiple ticks.


describe('On Keyboard Events', function (){
    it('Should move current player controlled blobs left', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA"), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('should move the currentPlayer on when nextPlayer is invoked', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA"), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(3)
        expect(gameState.Blobs[1].x).to.equal(2)
    })

    it('currentPlayer should wrap around', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA"), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.nextPlayer(gameState)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('currentPlayer old positions should be updated at end of turn', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA"), new Blob(3,6)]
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
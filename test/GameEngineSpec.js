require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

//todo get rid of runFramesUntilNothingElseChanges function, (and the "moved" variable Game Engine returns for it.
//You'll need to refactor these tests to have multiple ticks.

describe('Game Engine On Clock Tick', function() {

})
describe ('The Game engines helper functions', function (){

})


describe('On Keyboard Events', function (){
    // it('Should move plyer controlled blobs left', function (){
    //     let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3,6)]
    //     let gameState = new GameState(newBlobArray)
    //     gameState = gameEngine.keyLeft(gameState)
    //
    //     expect(gameState.Blobs[0].x).to.equal(2)
    //     expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
    //     expect(gameState.Blobs[1].x).to.equal(3)
    // })
})
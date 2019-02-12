require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const CanvasGameRenderer = require('../model/canvasGameRenderer').CanvasGameRenderer;
const Blob = require('../model/Blob')

describe('Game Renderer for HTML canvas', function() {

    it('Should calculate canvas position when element is in bottom left corner', function (){
        let canvasWidth = 300;
        let gridWidth = 6;
        //so squares are 50 across.
        let canvasHeight = 600;
        let gridHeight = 12;
        //OS maps are sort of Zero indexed. But the reference describes the square,
        // east and north of the gridlines described in the reference.
        // OS references from bottom left corner.

        let result = new CanvasGameRenderer().CalculatePositionWidthAndHeight(
            1,1,gridWidth,gridHeight,canvasWidth,canvasHeight
        )

        //x, y, width, height
        //Screen references from top left corner
        expect(result.x).to.equal(25) //half a square from the left - because circles are rendered from the center
        expect(result.y).to.equal(25 + (11*50))
        expect(result.width).to.equal(50)
        expect(result.height).to.equal(50)
    })

    it('Should calculate canvas position when element is in bottom right corner', function (){
        let canvasWidth = 300;
        let gridWidth = 6;
        let canvasHeight = 600;
        let gridHeight = 12;
        let result = new CanvasGameRenderer().CalculatePositionWidthAndHeight(
            6,12,gridWidth,gridHeight,canvasWidth,canvasHeight
        )

        //x, y, width, height
        expect(result.x).to.equal(250)
        expect(result.y).to.equal(550)
        expect(result.width).to.equal(50)
        expect(result.height).to.equal(50)
    })
})

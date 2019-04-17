require('mocha')
const chai = require('chai')
const expect = chai.expect
const chaiAlmost = require('chai-almost');
chai.use(chaiAlmost());
var assert = require('assert');
vectorCalc = require('../model/VectorFromAngleCalculator');

describe('Should convert degrees to radians', function() {
    it('0 degrees is 0 radians', function() {
        let wasCalled = false
        let result = vectorCalc.degreesToRadians(0);
        //coerce to float, 0?
        expect(result).to.equal(0)
    })

    it('360 degrees is 2 pi radians', function() {
        let wasCalled = false

        let result = vectorCalc.degreesToRadians(360);
        //coerce to float, 0?
        expect(result).to.equal(2 * Math.PI)
    })
})

describe('should convert angles to vectors', function () {
    it('should return zero x and positive y for North', function () {
        let vector = vectorCalc.angleAndDistanceToCoordinatesold(vectorCalc.degreesToRadians(0), 1)
        expect(vector.x).to.equal(0)
        expect(vector.y).to.equal(1)
    });
    it('should return positive x and zero y for east', function () {
        let vector = vectorCalc.angleAndDistanceToCoordinatesold(vectorCalc.degreesToRadians(90), 1)
        expect(vector.x).to.almost.equal(1)
        expect(vector.y).to.almost.equal(0)
    });
});

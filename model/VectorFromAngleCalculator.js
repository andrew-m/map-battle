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

function somethingAdd (a, b){
    return a + b
}

function degreesToRadians (deg) {
    return (deg * (Math.PI/180))
}

function angleToCoordinates(angleInDegrees) {
    return angleAndDistanceToCoordinatesFromStackOverflow(angleInDegrees, 1)
}

function angleAndDistanceToCoordinatesold(angleInDegrees, distance) {
    //soh cah toa
    //sin(angle) = opp / hyp.
    //sin(angle) = x / distance
    //x = sin(angle) * distance
    let x = Math.sin(angleInDegrees) * distance

    //cosine(angle) = adj/hyp
    //cos(angle) * hyp = adj //where adj is y.
    let y = Math.cos(angleInDegrees) * distance
    return new Vector(x, y)
}

    function angleAndDistanceToCoordinatesFromStackOverflow(angle, distance) {
        let newX = Math.round(Math.cos(degreesToRadians(angle)) * distance);
        let newY = Math.round(Math.sin(degreesToRadians(angle)) * distance);

        return new Vector(newX, newY);
    }

module.exports ={somethingAdd, degreesToRadians, angleToCoordinates, angleAndDistanceToCoordinatesold}
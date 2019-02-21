class Blob {
    constructor(x, y, number, colour = "#ff0000") {
        this.x = x
        this.y = y
        this.oldx = x
        this.oldy = y
        this.number = number;
        this.colour = colour
    }
}

module.exports = { Blob }
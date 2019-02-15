var gameModel = require('./Constants');
//
// function drawGridLine (context, startx, starty, endx, endy) {
//      context.moveTo(startx, starty)
//     context.beginPath()
//     context.strokeStyle = "#50E0f0"
//     context.lineTo(endx, endy)
//     context.stroke()
//     return context;
// }

class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup () {
        this.context = this.canvas.getContext("2d")
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gridWidth = gameModel.grid.width;
        this.gridHeight = gameModel.grid.height;
        this.clearWholeGameArea()

        //todo do this calculated from canvas and grid dimensions.
    }

    clearWholeGameArea() {
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)

        let startx = 50;
        let starty = 50;
        let endx = 200;
        let endy = 200;

        var i =0
        var squareSize = this.width / this.gridWidth

        for (i = 0; i < this.gridWidth; i++) {
            startx = i * squareSize
            endx = startx
            starty = 0
            endy = this.height
            drawGridLine(this.context, startx, starty, endx, endy);
        }
        for (i = 0; i < this.gridHeight; i++) {
            starty = i * squareSize
            endy = starty
            startx = 0
            endx = this.width
            drawGridLine(this.context, startx, starty, endx, endy);
        }
    }


    RenderGameState(gameState){
        this.clearWholeGameArea()
        gameState.Blobs.forEach(
            blob => {
                this.context.fillStyle = blob.colour
                let res = this.CalculatePositionWidthAndHeight(blob.x, blob.y, this.gridWidth, this.gridHeight, this.width, this.height);
                this.context.beginPath();
                this.context.arc(res.x, res.y, res.width/2, 0, 2 * Math.PI);
                this.context.fill();
            }
        )
    }

    CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, gridWidth, gridHeight, canvasWidth, canvasHeight) {
        let squareSize = canvasWidth / gridWidth
        return {
            x: (gridPositionX - 1) * (squareSize) + (squareSize/2),
            y: ((gridHeight - gridPositionY) * squareSize) + (squareSize/2),
            width: 50,
            height: 50,
            radius: 25,
        }
    }
}

function drawGridLine(ctx, startx, starty, endx, endy) {
    ctx.strokeStyle = "#50E0f0"
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy)
    ctx.stroke()
}

module.exports = {  CanvasGameRenderer }
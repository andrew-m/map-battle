var gameModel = require('./Constants');

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
        let i;
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)

        let startx = 50;
        let starty = 50;
        let endx = 200;
        let endy = 200;

        var squareSize = this.width / this.gridWidth

        for (let i = 0; i < this.gridWidth; i++) {
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
            (blob, i) => {
                this.context.fillStyle = blob.colour
                let res = this.CalculatePositionWidthAndHeight(blob.x, blob.y, this.gridWidth, this.gridHeight, this.width);
                this.context.beginPath();
                this.context.arc(res.x, res.y, res.width/2, 0, 2 * Math.PI);
                this.context.fill();
                this.context.strokeStyle = "#303030";
                this.context.lineWidth = 2
                this.context.stroke();

                this.context.fillStyle = findContrastingTextColor(blob.colour)
                this.context.font = "30px Arial"
                this.context.textAlign = 'center';
                this.context.textBaseline = 'middle';
                this.context.fillText(i, res.x , res.y, 50)

            }
        )
    }

    CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, gridWidth, gridHeight, canvasWidth) {
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

function findContrastingTextColor(color){
    //source http://trendct.org/2016/01/22/how-to-choose-a-label-color-to-contrast-with-background/
    //could be better (move from this "half the hex total" algo to the w3c recommended brightness and
    // threshold described in the example. Would need to translate their rgb code to accept hex.
    return (color.replace('#','0x')) > (0xffffff/2) ? '#000000' : '#ffffff'
}

function drawGridLine(ctx, startx, starty, endx, endy) {
    ctx.strokeStyle = "#50E0f0"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startx, starty)
    ctx.lineTo(endx, endy)
    ctx.stroke()
}

module.exports = {  CanvasGameRenderer }
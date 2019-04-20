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
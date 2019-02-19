class GameState {
    constructor(blobs = [], gridWidth, gridHeight, currentTurnIndex = 0) {
        this.Blobs = blobs
        this.currentTurnIndex = currentTurnIndex
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }
}

module.exports = {
    GameState
}
class GameState {
    constructor(blobs = [], gridWidth, gridHeight, currentTurnIndex = 0) {
        this.Blobs = blobs
        this.currentTurnIndex = currentTurnIndex
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.vector = null //Should this be on the blobs? Do we need two? (origin and destination)
    }
}

module.exports = {
    GameState
}
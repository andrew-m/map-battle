class GameState {
    constructor(blobs = [], currentTurnIndex = 0) {
        this.Blobs = blobs
        this.currentTurnIndex = currentTurnIndex
    }
}

module.exports = {
    GameState
}
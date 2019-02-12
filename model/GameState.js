class GameState {
    constructor(blobs = []) {
        this.Blobs = blobs
        this.currentTurnIndex = 0
    }
}

module.exports = {
    GameState
}
//external events are:
//Turn submissions
// - firing angles
// - movements
//keyboard presses

//Which result in changes to the game state
//Such as angles/collisions being worked out
// With lives lost if hit.
//or blobs moving

//No loop really needed, but could detect keyboard events, as more fun than using a form.

//Game engine does NOT contain game state.
//It acts upon an event, and a game state, to create a new game state.
//Still sounds about right

//Immutable or mutable game state? I think mutable will be fine.

function getCurrentBlob(gameState) {
    return gameState.Blobs[gameState.currentTurnIndex];
}

function keyLeft(gameState) {
    (moveLeft(getCurrentBlob(gameState)))
    return gameState
}

function keyRight(gameState) {
    (moveRight(getCurrentBlob(gameState)))
    return gameState
}

function keyDown(gameState) {
    (moveDown(getCurrentBlob(gameState)))
    return gameState
}

function keyUp(gameState) {
    (moveUp(getCurrentBlob(gameState)))
    return gameState
}

function nextPlayer (gameState) {
    var currentBlob = getCurrentBlob(gameState)
    currentBlob.oldx = currentBlob.x
    currentBlob.oldy = currentBlob.y
    gameState.currentTurnIndex += 1
    if (gameState.currentTurnIndex >= gameState.Blobs.length) {
        gameState.currentTurnIndex = 0
    }
    return gameState
}

function moveUp(blob) {
    blob.y += 1 //OS grid references start in South West corner.
    return blob
}

function moveDown(blob) {
    blob.y -= 1
    return blob
}

function moveLeft(blob) {
    blob.x -= 1
    return blob
}

function moveRight(blob) {
    blob.x += 1
    return blob
}

module.exports = {
    keyLeft,
    keyRight,
    keyDown,
    keyUp,
    nextPlayer
}
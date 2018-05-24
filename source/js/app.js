'use strict';

function gameReady() {
    $('main').on('click', '[data-clickable-difficulty]', function(e) {
        gameLoop($(e.currentTarget).data('clickable-difficulty'));
    });
}

function gameLoop(difficulty) {
    let gridSize;
    switch (difficulty) {
        case "easy":
            gridSize = 4;
            break;
        case "medium":
            gridSize = 6;
            break;
        case "hard":
            gridSize = 8;
            break;
    }
    const game = new Game(gridSize);
    game.start();
    startClickListeners(game);
}

function startClickListeners(game) {
    $('main').on('click', '[data-clickable]', function(e) {
        game.processMove(e);
    });

    $('header').on('click', '[data-clickable-reset]', function(e) {
        game.restart();
    });

    $('header').on('click', '[data-clickable-new-game]', function(e) {
        location.reload();
    });
}

$(gameReady);
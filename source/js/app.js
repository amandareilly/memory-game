'use strict';

function gameLoop() {
    const game = new Game();
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
}

$(gameLoop);
'use strict';

function gameLoop() {
    const game = new Game();
    game.start();
    startClickListener(game);
}

function startClickListener(game) {
    $('main').on('click', '[data-clickable]', function(e) {
        game.processMove(e);
    });
}

$(gameLoop);
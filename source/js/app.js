'use strict';

function gameLoop() {
    const game = new Game();
    game.start();
    startClickListener();
}

function startClickListener() {
    $('main').on('click', '[data-clickable]', function(e) {
        console.log(e);
        console.log(e.currentTarget);

        $(e.currentTarget).toggleClass('flipped');
    });
}

$(gameLoop);
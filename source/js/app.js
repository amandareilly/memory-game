'use strict';

$('main').on('click', '[data-clickable]', function(e) {
    console.log(e);
    console.log(e.currentTarget);

    $(e.currentTarget).toggleClass('flipped');
})
'use strict';

class Game {
    // Takes a single argument, gridSize,
    // which must be an even integer greater
    // than or equal to four and less than or
    // equal to 8.  The default gridSize is 4.
    constructor(gridSize = 4) {
        // use constructor to call initialize function
        // to allow reset functionality without
        // duplicate code and still preserve use of
        // new keyword
        this.initialize(gridSize);
    }

    initialize(gridSize) {
        if (gridSize % 2 !== 0 || gridSize < 4 || gridSize > 8) {
            throw new Error("Grid size must be 4, 6, or 8.");
        }

        try {
            this.deck = new CardDeck(gridSize * gridSize);
        } catch (error) {
            throw error;
        }
        this.gridSize = gridSize;
        this.timer = new Timer();
        this.renderer = new Renderer();
        this.rating = new StarRating(gridSize);
        this.moves = 0;
        this.matchesRemaining = this.deck.numMatches;
        this.moveInProcess = false;
        this.firstCard = null;
    }

    start() {
        this.renderer.render('main', 'gameBoard', this);
        $('header').removeClass('hidden');
        this.drawScoreboard();
        this.timer.start();
    }

    restart() {
        this.timer.stop();
        this.initialize(this.gridSize);
        this.start();
    }

    processMove(e) {
        const clickedCard = e.currentTarget;
        const cardIcon = $(clickedCard).data('card');

        // if this class is already flipped, do nothing
        if ($(clickedCard).hasClass('flipped')) {
            console.log('exiting - card is already flipped');
            return;
        }

        $(clickedCard).addClass('flipped');

        setTimeout($.proxy(function() {
            if (this.moveInProcess) {
                if (this.firstCard === cardIcon) {
                    this.processValidMatch();
                } else {
                    this.processInvalidMatch();
                }
                this.finalizeMove();
            } else {
                this.moveInProcess = true;
                this.firstCard = cardIcon;
            }
        }, this), 1500);

    }

    processValidMatch() {
        $('.flipped').addClass('found').removeAttr('data-clickable').toggleClass('flipped');
        this.matchesRemaining--;
    }

    processInvalidMatch() {
        $('.flipped').parent().addClass('wrong');
        setTimeout(function() {
            $('.flipped').parent().removeClass('wrong');
        }, 1000);
        setTimeout(function() {
            $('.flipped').removeClass('flipped');
        }, 1500);
    }

    finalizeMove() {
        this.moves++;
        this.firstCard = null;
        this.moveInProcess = false;
        this.drawScoreboard();
        this.checkForWin();
    }

    drawScoreboard() {
        const stars = this.rating.visualizeStarRating(this.moves);
        $('.empty-stars').html(stars.empty);
        $('.filled-stars').html(stars.filled);
        $('#move-counter').html(`Moves: ${this.moves}`);
    }

    checkForWin() {
        if (this.matchesRemaining === 0) {
            // win
            this.timer.stop();
            // TODO: 
            // win modal
        }
    }
}
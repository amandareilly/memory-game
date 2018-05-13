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
        this.moves = 0;
        this.matchesRemaining = this.deck.numMatches;
        this.maxStarRating = this.gridSize;
        this.setScoringModel();
        this.currentStarRating = this.maxStarRating;
        this.excessMoves = 0;
        this.moveInProcess = false;
        this.firstCard = null;
    }

    setScoringModel() {
        this.starLossThreshold = ((this.gridSize * this.gridSize) / 2) + 3;
        this.starLossInterval = this.gridSize / 2;
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

        if (this.moveInProcess) {
            console.log(this.firstCard);
            if (this.firstCard === cardIcon) {
                console.log('valid match');
                this.processValidMatch();
            } else {
                console.log('invalid match');
                this.processInvalidMatch();
            }
            this.finalizeMove();
        } else {
            this.moveInProcess = true;
            this.firstCard = cardIcon;
        }
    }

    processValidMatch() {
        $('.flipped').addClass('found').removeAttr('data-clickable').toggleClass('flipped');
        this.matchesRemaining--;
    }

    processInvalidMatch() {
        console.log('process invalid match');
        $('.flipped').removeClass('flipped');
    }

    finalizeMove() {
        this.moves++;
        this.excessMoves++;
        this.firstCard = null;
        this.moveInProcess = false;
        this.calculateStarRating();
        this.drawScoreboard();
        this.checkForWin();
    }

    drawScoreboard() {
        $('#star-rating').html(`Star Rating: ${this.currentStarRating}`);
        $('#move-counter').html(`Moves: ${this.moves}`);
    }

    visualizeStarRating() {

    }

    calculateStarRating() {
        if (this.moves < this.starLossThreshold || this.currentStarRating === 1) {
            // has not yet lost any stars
            // or is already at the minimum star rating
            console.log('return from calculate');
            console.log(this.starLossThreshold);
            console.log(this.currentStarRating);
            return;
        }

        if (this.currentStarRating === this.maxStarRating && this.excessMoves === this.starLossThreshold) {
            // losting first star
            console.log('hit if');
            this.currentStarRating--;
            this.excessMoves = 0;
        } else if (this.excessMoves === this.starLossInterval) {
            console.log('hit else if');
            this.currentStarRating--;
            this.excessMoves = 0;
        } else {
            console.log(this.excessMoves);
            console.log('hit else');
        }
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
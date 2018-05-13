'use strict';

class Game {
    // Takes a single argument, gridSize,
    // which must be an even integer greater
    // than or equal to four and less than or
    // equal to 8.  The default gridSize is 4.
    constructor(gridSize = 4) {
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
        this.matchesFound = 0;
        this.starRating = this.gridSize;
        this.setScoringModel();
        this.moveInProcess = false;
    }

    setScoringModel() {
        this.starLossThreshold = (this.gridSize * this.gridSize) / 2;
        this.starLossInterval = this.gridSize / 2;
    }

    start() {
        this.renderer.render('main', 'gameBoard', this);
        // TODO: render score board
        this.timer.start();
    }

    processMove(e) {
        if (this.moveInProcess) {
            this.checkMove(e);
        } else {
            this.moveInProcess = true;
            // TODO: 
            // 1. set this.firstPick = clicked Card
        }
    }

    checkMove(e) {
        // TODO: 
        // CHECK TO SEE IF CARDS MATCH
    }

    processValidMatch() {
        // TODO:
        // PROCESS A VALID MATCH
    }

    processInvalidMatch() {
        // TODO: 
        // PROCESS AN INVALID MATCH
    }
}
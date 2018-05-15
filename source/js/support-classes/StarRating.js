class StarRating {
    constructor(gridSize) {
        this.starLossThreshold = ((gridSize * gridSize) / 2) + 3;
        this.starLossInterval = gridSize / 2;
        this.maxStarRating = gridSize;
        this.currentStarRating = gridSize;
        this.excessMoves = 0;
    }

    updateStarRating(moves) {
        if (moves) {
            // if a move has been made,
            // increment excessMoves
            this.excessMoves++;
        }
        if (moves < this.starLossThreshold || this.currentStarRating === 1) {
            // has not yet lost any stars
            // or is already at the minimum star rating
            return;
        }

        if (this.currentStarRating === this.maxStarRating && this.excessMoves === this.starLossThreshold) {
            // losting first star
            this.currentStarRating--;
            this.excessMoves = 0;
        } else if (this.excessMoves === this.starLossInterval) {
            this.currentStarRating--;
            this.excessMoves = 0;
        }
    }

    visualizeStarRating(moves) {
        this.updateStarRating(moves);
        let emptyStars = "";
        let filledStars = "";

        for (let i = 0; i < this.maxStarRating; i++) {
            emptyStars += '<i class="material-icons">star_border</i>';
        }
        for (let i = 0; i < this.maxStarRating; i++) {
            if (i < this.currentStarRating) {
                filledStars += '<i class="material-icons">star</i>';
            } else {
                filledStars += '<i class="material-icons unfilled">star</i>';
            }
        }

        return { empty: emptyStars, filled: filledStars };
    }

}
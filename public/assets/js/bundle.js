'use strict';


class CardDeck {
    // Takes one argument to determine the
    // total number of cards needed.  This
    // must be an even number, and must be
    // less than or equal to the number of 
    // available iconNames *2.  The deck will
    // have two of each card, in random order.
    constructor(numCards) {
        const iconNames = [
            'build',
            'delete',
            'face',
            'favorite',
            'grade',
            'home',
            'lightbulb_outline',
            'lock',
            'pets',
            'shopping_cart',
            'thumb_up',
            'thumb_down',
            'store',
            'visibility',
            'work',
            'local_florist',
            'play_arrow',
            'radio',
            'phone',
            'mail_outline',
            'send',
            'airplanemode_active',
            'battery_full',
            'insert_emoticon',
            'cloud',
            'folder_open',
            'desktop_windows',
            'headset',
            'keyboard_voice',
            'audiotrack',
            'brightness_3',
            'camera_alt',
            'wb_sunny',
            'directions_bike',
            'directions_boat',
            'directions_bus',
            'directions_car',
            'restaurant',
            'ac_unit',
            'beach_access',
            'casino',
            'child_friendly',
            'fitness_center',
            'pool',
            'spa',
            'cake'
        ];

        const numIcons = iconNames.length;

        if (numCards % 2 !== 0) {
            throw new Error("You must request an even number of cards.");
        } else if (numCards / 2 > numIcons) {
            throw new Error('Not enough cards available.');
        }

        const shuffledIcons = this.shuffle(iconNames).slice(0, numCards / 2).map(function(card) {
            return { "cardIcon": card }
        });
        this.deck = this.shuffle(shuffledIcons.concat(shuffledIcons));
        this.pointer = 0;
        this.deckLength = numCards;
        this.numMatches = this.deckLength / 2;
    }

    // Implementation of the "Fisher-Yates Shuffle"
    // (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    // From Mike Bostock (https://bost.ocks.org/mike/shuffle/)
    shuffle(array) {
        var m = array.length,
            t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    getNextCard() {
        this.pointer++;
        return this.deck[this.pointer--];
    }
}

const deck = new CardDeck(16);
'use strict';

class Renderer {
    render(selector, name, data = {}) {
        const template = Handlebars.partials[name];
        $(selector).html(template(data)).attr('class', 'container');
    }
}
class StarRating {
    constructor(gridSize) {
        this.starLossThreshold = ((gridSize * gridSize) / 2) + (gridSize / 2);
        this.starLossInterval = gridSize / 2;
        this.maxStarRating = Math.max(3, gridSize / 2);
        this.currentStarRating = this.maxStarRating;
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
'use strict';

class Timer {
    constructor(selector = '#timer') {
        this.selector = selector;
    }

    // returns current time in seconds
    getCurrentTime() {
        return Math.floor(Date.now() / 1000);
    }

    start() {
        this.startTime = this.getCurrentTime();
        this.updateTime();
        //update the time every second
        this.timer = setInterval(this.updateTime.bind(this), 1000);
    }

    updateTime() {
        const diff = this.getCurrentTime() - this.startTime;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        minutes = Math.floor(diff / 60);
        seconds = Math.floor(diff % 60);
        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            minutes = Math.floor(minutes % 60);
        }
        minutes = this.padTimeValue(minutes);
        seconds = this.padTimeValue(seconds);
        let timeString = `${minutes}:${seconds}`;
        if (hours) {
            timeString = `${hours}:${timeString}`;
        }
        const element = document.querySelector(this.selector);
        element.innerHTML = timeString;
        this.elapsedTime = timeString;
    }

    padTimeValue(val) {
        if (val < 10) {
            val = "0" + val;
        }
        return val;
    }

    stop() {
        clearInterval(this.timer);
    }
}
Handlebars.registerPartial("card", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"card-container\">\r\n    <div class=\"card\" data-card=\""
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "\" data-clickable>\r\n        <div class=\"card-side card-back blue darken-3\">\r\n            <i class=\"material-icons\">help</i>\r\n        </div>\r\n        <div class=\"card-side card-front blue lighten-1\">\r\n            <i class=\"material-icons\">"
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "</i>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true}));
Handlebars.registerPartial("gameBoard", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.card,depth0,{"name":"card","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"game-board grid-size-"
    + container.escapeExpression(((helper = (helper = helpers.gridSize || (depth0 != null ? depth0.gridSize : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"gridSize","hash":{},"data":data}) : helper)))
    + "\" data-js-click-container=\"js-click-container\">\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.deck : depth0)) != null ? stack1.deck : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"found-card hidden\"></div>\r\n    <div class=\"win-modal hidden\">\r\n        <h2>Congratulations!</h2>\r\n        <div id=\"star-rating-final\">\r\n            <div class=\"filled-stars\"></div>\r\n            <div class=\"empty-stars\"></div>\r\n        </div>\r\n        <p class=\"stat\"><span class=\"stat-label\">Time: </span><span class=\"stat-data\" data-stat-time></span></p>\r\n        <p class=\"stat\">\r\n            <span class=\"stat-label\">Moves:</span>\r\n            <span class=\"stat-data\" data-stat-moves></span>\r\n        </p>\r\n        <div class=\"new-game\">\r\n            <h2>Start a New Game</h2>\r\n            <button type=\"submit\" data-clickable-difficulty=\"easy\" class=\"btn btn-large green\">Easy</button>\r\n            <button type=\"submit\" data-clickable-difficulty=\"medium\" class=\"btn btn-large yellow black-text\">Medium</button>\r\n            <button type=\"submit\" data-clickable-difficulty=\"hard\" class=\"btn btn-large red\">Hard</button>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true}));
'use strict';

let game;

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
    if (typeof game == 'undefined') {
        game = new Game(gridSize);
        game.start();
        startClickListeners(game);
    } else {
        game.restart(gridSize);
    }
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
        this.currentFlippedCards = 0;
    }

    start() {
        this.renderer.render('main', 'gameBoard', this);
        $('header').removeClass('hidden');
        this.drawScoreboard();
        this.timer.start();
    }

    restart(gridSize = this.gridSize) {
        this.timer.stop();
        this.initialize(gridSize);
        this.start();
    }

    processMove(e) {
        const clickedCard = e.currentTarget;
        const cardIcon = $(clickedCard).data('card');

        // if this class is already flipped, do nothing
        if ($(clickedCard).hasClass('flipped')) {
            return;
        }

        // if there are already 2 flipped cards, do nothing
        // handles the case where a 3rd card is clicked while
        // animations are happening (using setTimeout);
        if (this.currentFlippedCards === 2) {
            return;
        }

        $(clickedCard).addClass('flipped');
        this.currentFlippedCards++;

        setTimeout($.proxy(function() {
            if (this.moveInProcess) {
                if (this.firstCard === cardIcon) {
                    this.processValidMatch();
                } else {
                    this.processInvalidMatch();
                }
            } else {
                this.moveInProcess = true;
                this.firstCard = cardIcon;
            }
        }, this), 1500);

    }

    processValidMatch() {
        const foundCard = $('.flipped').parent().html();

        $('.found-card').html(foundCard).removeClass('hidden');
        setTimeout(function() {
            $('.card-container>.flipped').addClass('found').removeAttr('data-clickable').removeClass('flipped');
        }, 800);
        setTimeout(function() {
            $('.found-card').empty().addClass('hidden');
        }, 1800);
        this.matchesRemaining--;
        this.finalizeMove();
    }

    processInvalidMatch() {
        $('.flipped').parent().addClass('wrong');
        setTimeout(function() {
            $('.flipped').parent().removeClass('wrong');
        }, 500);
        setTimeout(function() {
            $('.flipped').removeClass('flipped');
        }, 600);
        setTimeout($.proxy(function() {
            this.finalizeMove();
        }, this), 700);
    }

    finalizeMove() {
        this.moves++;
        this.firstCard = null;
        this.moveInProcess = false;
        this.currentFlippedCards = 0;
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
            $('header').addClass('hidden');
            $('.win-modal').removeClass('hidden');
            $('[data-stat-time]').html(this.timer.elapsedTime);
            $('[data-stat-moves]').html(this.moves);
            const stars = this.rating.visualizeStarRating(this.moves);
            $('.empty-stars').html(stars.empty);
            $('.filled-stars').html(stars.filled);
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhcmREZWNrLmpzIiwiUmVuZGVyZXIuanMiLCJTdGFyUmF0aW5nLmpzIiwiVGltZXIuanMiLCJ0ZW1wbGF0ZXMuanMiLCJhcHAuanMiLCJHYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmNsYXNzIENhcmREZWNrIHtcclxuICAgIC8vIFRha2VzIG9uZSBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlXHJcbiAgICAvLyB0b3RhbCBudW1iZXIgb2YgY2FyZHMgbmVlZGVkLiAgVGhpc1xyXG4gICAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciwgYW5kIG11c3QgYmVcclxuICAgIC8vIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIFxyXG4gICAgLy8gYXZhaWxhYmxlIGljb25OYW1lcyAqMi4gIFRoZSBkZWNrIHdpbGxcclxuICAgIC8vIGhhdmUgdHdvIG9mIGVhY2ggY2FyZCwgaW4gcmFuZG9tIG9yZGVyLlxyXG4gICAgY29uc3RydWN0b3IobnVtQ2FyZHMpIHtcclxuICAgICAgICBjb25zdCBpY29uTmFtZXMgPSBbXHJcbiAgICAgICAgICAgICdidWlsZCcsXHJcbiAgICAgICAgICAgICdkZWxldGUnLFxyXG4gICAgICAgICAgICAnZmFjZScsXHJcbiAgICAgICAgICAgICdmYXZvcml0ZScsXHJcbiAgICAgICAgICAgICdncmFkZScsXHJcbiAgICAgICAgICAgICdob21lJyxcclxuICAgICAgICAgICAgJ2xpZ2h0YnVsYl9vdXRsaW5lJyxcclxuICAgICAgICAgICAgJ2xvY2snLFxyXG4gICAgICAgICAgICAncGV0cycsXHJcbiAgICAgICAgICAgICdzaG9wcGluZ19jYXJ0JyxcclxuICAgICAgICAgICAgJ3RodW1iX3VwJyxcclxuICAgICAgICAgICAgJ3RodW1iX2Rvd24nLFxyXG4gICAgICAgICAgICAnc3RvcmUnLFxyXG4gICAgICAgICAgICAndmlzaWJpbGl0eScsXHJcbiAgICAgICAgICAgICd3b3JrJyxcclxuICAgICAgICAgICAgJ2xvY2FsX2Zsb3Jpc3QnLFxyXG4gICAgICAgICAgICAncGxheV9hcnJvdycsXHJcbiAgICAgICAgICAgICdyYWRpbycsXHJcbiAgICAgICAgICAgICdwaG9uZScsXHJcbiAgICAgICAgICAgICdtYWlsX291dGxpbmUnLFxyXG4gICAgICAgICAgICAnc2VuZCcsXHJcbiAgICAgICAgICAgICdhaXJwbGFuZW1vZGVfYWN0aXZlJyxcclxuICAgICAgICAgICAgJ2JhdHRlcnlfZnVsbCcsXHJcbiAgICAgICAgICAgICdpbnNlcnRfZW1vdGljb24nLFxyXG4gICAgICAgICAgICAnY2xvdWQnLFxyXG4gICAgICAgICAgICAnZm9sZGVyX29wZW4nLFxyXG4gICAgICAgICAgICAnZGVza3RvcF93aW5kb3dzJyxcclxuICAgICAgICAgICAgJ2hlYWRzZXQnLFxyXG4gICAgICAgICAgICAna2V5Ym9hcmRfdm9pY2UnLFxyXG4gICAgICAgICAgICAnYXVkaW90cmFjaycsXHJcbiAgICAgICAgICAgICdicmlnaHRuZXNzXzMnLFxyXG4gICAgICAgICAgICAnY2FtZXJhX2FsdCcsXHJcbiAgICAgICAgICAgICd3Yl9zdW5ueScsXHJcbiAgICAgICAgICAgICdkaXJlY3Rpb25zX2Jpa2UnLFxyXG4gICAgICAgICAgICAnZGlyZWN0aW9uc19ib2F0JyxcclxuICAgICAgICAgICAgJ2RpcmVjdGlvbnNfYnVzJyxcclxuICAgICAgICAgICAgJ2RpcmVjdGlvbnNfY2FyJyxcclxuICAgICAgICAgICAgJ3Jlc3RhdXJhbnQnLFxyXG4gICAgICAgICAgICAnYWNfdW5pdCcsXHJcbiAgICAgICAgICAgICdiZWFjaF9hY2Nlc3MnLFxyXG4gICAgICAgICAgICAnY2FzaW5vJyxcclxuICAgICAgICAgICAgJ2NoaWxkX2ZyaWVuZGx5JyxcclxuICAgICAgICAgICAgJ2ZpdG5lc3NfY2VudGVyJyxcclxuICAgICAgICAgICAgJ3Bvb2wnLFxyXG4gICAgICAgICAgICAnc3BhJyxcclxuICAgICAgICAgICAgJ2Nha2UnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgY29uc3QgbnVtSWNvbnMgPSBpY29uTmFtZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAobnVtQ2FyZHMgJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IHJlcXVlc3QgYW4gZXZlbiBudW1iZXIgb2YgY2FyZHMuXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobnVtQ2FyZHMgLyAyID4gbnVtSWNvbnMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgZW5vdWdoIGNhcmRzIGF2YWlsYWJsZS4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNodWZmbGVkSWNvbnMgPSB0aGlzLnNodWZmbGUoaWNvbk5hbWVzKS5zbGljZSgwLCBudW1DYXJkcyAvIDIpLm1hcChmdW5jdGlvbihjYXJkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFwiY2FyZEljb25cIjogY2FyZCB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5kZWNrID0gdGhpcy5zaHVmZmxlKHNodWZmbGVkSWNvbnMuY29uY2F0KHNodWZmbGVkSWNvbnMpKTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVja0xlbmd0aCA9IG51bUNhcmRzO1xyXG4gICAgICAgIHRoaXMubnVtTWF0Y2hlcyA9IHRoaXMuZGVja0xlbmd0aCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlIFwiRmlzaGVyLVlhdGVzIFNodWZmbGVcIlxyXG4gICAgLy8gKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlciVFMiU4MCU5M1lhdGVzX3NodWZmbGUpXHJcbiAgICAvLyBGcm9tIE1pa2UgQm9zdG9jayAoaHR0cHM6Ly9ib3N0Lm9ja3Mub3JnL21pa2Uvc2h1ZmZsZS8pXHJcbiAgICBzaHVmZmxlKGFycmF5KSB7XHJcbiAgICAgICAgdmFyIG0gPSBhcnJheS5sZW5ndGgsXHJcbiAgICAgICAgICAgIHQsIGk7XHJcblxyXG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxl4oCmXHJcbiAgICAgICAgd2hpbGUgKG0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudOKAplxyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cclxuICAgICAgICAgICAgdCA9IGFycmF5W21dO1xyXG4gICAgICAgICAgICBhcnJheVttXSA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICBhcnJheVtpXSA9IHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV4dENhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyKys7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVja1t0aGlzLnBvaW50ZXItLV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGRlY2sgPSBuZXcgQ2FyZERlY2soMTYpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFJlbmRlcmVyIHtcclxuICAgIHJlbmRlcihzZWxlY3RvciwgbmFtZSwgZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBIYW5kbGViYXJzLnBhcnRpYWxzW25hbWVdO1xyXG4gICAgICAgICQoc2VsZWN0b3IpLmh0bWwodGVtcGxhdGUoZGF0YSkpLmF0dHIoJ2NsYXNzJywgJ2NvbnRhaW5lcicpO1xyXG4gICAgfVxyXG59IiwiY2xhc3MgU3RhclJhdGluZyB7XHJcbiAgICBjb25zdHJ1Y3RvcihncmlkU2l6ZSkge1xyXG4gICAgICAgIHRoaXMuc3Rhckxvc3NUaHJlc2hvbGQgPSAoKGdyaWRTaXplICogZ3JpZFNpemUpIC8gMikgKyAoZ3JpZFNpemUgLyAyKTtcclxuICAgICAgICB0aGlzLnN0YXJMb3NzSW50ZXJ2YWwgPSBncmlkU2l6ZSAvIDI7XHJcbiAgICAgICAgdGhpcy5tYXhTdGFyUmF0aW5nID0gTWF0aC5tYXgoMywgZ3JpZFNpemUgLyAyKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGFyUmF0aW5nID0gdGhpcy5tYXhTdGFyUmF0aW5nO1xyXG4gICAgICAgIHRoaXMuZXhjZXNzTW92ZXMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN0YXJSYXRpbmcobW92ZXMpIHtcclxuICAgICAgICBpZiAobW92ZXMpIHtcclxuICAgICAgICAgICAgLy8gaWYgYSBtb3ZlIGhhcyBiZWVuIG1hZGUsXHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudCBleGNlc3NNb3Zlc1xyXG4gICAgICAgICAgICB0aGlzLmV4Y2Vzc01vdmVzKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb3ZlcyA8IHRoaXMuc3Rhckxvc3NUaHJlc2hvbGQgfHwgdGhpcy5jdXJyZW50U3RhclJhdGluZyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvLyBoYXMgbm90IHlldCBsb3N0IGFueSBzdGFyc1xyXG4gICAgICAgICAgICAvLyBvciBpcyBhbHJlYWR5IGF0IHRoZSBtaW5pbXVtIHN0YXIgcmF0aW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGFyUmF0aW5nID09PSB0aGlzLm1heFN0YXJSYXRpbmcgJiYgdGhpcy5leGNlc3NNb3ZlcyA9PT0gdGhpcy5zdGFyTG9zc1RocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAvLyBsb3N0aW5nIGZpcnN0IHN0YXJcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhclJhdGluZy0tO1xyXG4gICAgICAgICAgICB0aGlzLmV4Y2Vzc01vdmVzID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZXhjZXNzTW92ZXMgPT09IHRoaXMuc3Rhckxvc3NJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGFyUmF0aW5nLS07XHJcbiAgICAgICAgICAgIHRoaXMuZXhjZXNzTW92ZXMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aXN1YWxpemVTdGFyUmF0aW5nKG1vdmVzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGFyUmF0aW5nKG1vdmVzKTtcclxuICAgICAgICBsZXQgZW1wdHlTdGFycyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGZpbGxlZFN0YXJzID0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1heFN0YXJSYXRpbmc7IGkrKykge1xyXG4gICAgICAgICAgICBlbXB0eVN0YXJzICs9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+c3Rhcl9ib3JkZXI8L2k+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1heFN0YXJSYXRpbmc7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMuY3VycmVudFN0YXJSYXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGZpbGxlZFN0YXJzICs9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+c3RhcjwvaT4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsbGVkU3RhcnMgKz0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdW5maWxsZWRcIj5zdGFyPC9pPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IGVtcHR5OiBlbXB0eVN0YXJzLCBmaWxsZWQ6IGZpbGxlZFN0YXJzIH07XHJcbiAgICB9XHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgVGltZXIge1xyXG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IgPSAnI3RpbWVyJykge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm5zIGN1cnJlbnQgdGltZSBpbiBzZWNvbmRzXHJcbiAgICBnZXRDdXJyZW50VGltZSgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmdldEN1cnJlbnRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XHJcbiAgICAgICAgLy91cGRhdGUgdGhlIHRpbWUgZXZlcnkgc2Vjb25kXHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKHRoaXMudXBkYXRlVGltZS5iaW5kKHRoaXMpLCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmdldEN1cnJlbnRUaW1lKCkgLSB0aGlzLnN0YXJ0VGltZTtcclxuICAgICAgICBsZXQgaG91cnMgPSAwO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gMDtcclxuICAgICAgICBsZXQgc2Vjb25kcyA9IDA7XHJcbiAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDYwKTtcclxuICAgICAgICBzZWNvbmRzID0gTWF0aC5mbG9vcihkaWZmICUgNjApO1xyXG4gICAgICAgIGlmIChtaW51dGVzID49IDYwKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcihtaW51dGVzIC8gNjApO1xyXG4gICAgICAgICAgICBtaW51dGVzID0gTWF0aC5mbG9vcihtaW51dGVzICUgNjApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtaW51dGVzID0gdGhpcy5wYWRUaW1lVmFsdWUobWludXRlcyk7XHJcbiAgICAgICAgc2Vjb25kcyA9IHRoaXMucGFkVGltZVZhbHVlKHNlY29uZHMpO1xyXG4gICAgICAgIGxldCB0aW1lU3RyaW5nID0gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XHJcbiAgICAgICAgaWYgKGhvdXJzKSB7XHJcbiAgICAgICAgICAgIHRpbWVTdHJpbmcgPSBgJHtob3Vyc306JHt0aW1lU3RyaW5nfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGltZVN0cmluZztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gdGltZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwYWRUaW1lVmFsdWUodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCA8IDEwKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IFwiMFwiICsgdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuICAgIH1cclxufSIsIkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKFwiY2FyZFwiLCBIYW5kbGViYXJzLnRlbXBsYXRlKHtcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBhbGlhczE9Y29udGFpbmVyLmxhbWJkYSwgYWxpYXMyPWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImNhcmQtY29udGFpbmVyXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY2FyZFxcXCIgZGF0YS1jYXJkPVxcXCJcIlxuICAgICsgYWxpYXMyKGFsaWFzMSgoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2FyZEljb24gOiBkZXB0aDApLCBkZXB0aDApKVxuICAgICsgXCJcXFwiIGRhdGEtY2xpY2thYmxlPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1zaWRlIGNhcmQtYmFjayBibHVlIGRhcmtlbi0zXFxcIj5cXHJcXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPmhlbHA8L2k+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtc2lkZSBjYXJkLWZyb250IGJsdWUgbGlnaHRlbi0xXFxcIj5cXHJcXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnNcXFwiPlwiXG4gICAgKyBhbGlhczIoYWxpYXMxKChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXJkSWNvbiA6IGRlcHRoMCksIGRlcHRoMCkpXG4gICAgKyBcIjwvaT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKFwiZ2FtZUJvYXJkXCIsIEhhbmRsZWJhcnMudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gKChzdGFjazEgPSBjb250YWluZXIuaW52b2tlUGFydGlhbChwYXJ0aWFscy5jYXJkLGRlcHRoMCx7XCJuYW1lXCI6XCJjYXJkXCIsXCJkYXRhXCI6ZGF0YSxcImluZGVudFwiOlwiICAgICAgICBcIixcImhlbHBlcnNcIjpoZWxwZXJzLFwicGFydGlhbHNcIjpwYXJ0aWFscyxcImRlY29yYXRvcnNcIjpjb250YWluZXIuZGVjb3JhdG9yc30pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdyaWQtc2l6ZS1cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5ncmlkU2l6ZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZ3JpZFNpemUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImdyaWRTaXplXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS1qcy1jbGljay1jb250YWluZXI9XFxcImpzLWNsaWNrLWNvbnRhaW5lclxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlY2sgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmRlY2sgOiBzdGFjazEpLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDxkaXYgY2xhc3M9XFxcImZvdW5kLWNhcmQgaGlkZGVuXFxcIj48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwid2luLW1vZGFsIGhpZGRlblxcXCI+XFxyXFxuICAgICAgICA8aDI+Q29uZ3JhdHVsYXRpb25zITwvaDI+XFxyXFxuICAgICAgICA8ZGl2IGlkPVxcXCJzdGFyLXJhdGluZy1maW5hbFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmlsbGVkLXN0YXJzXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJlbXB0eS1zdGFyc1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxwIGNsYXNzPVxcXCJzdGF0XFxcIj48c3BhbiBjbGFzcz1cXFwic3RhdC1sYWJlbFxcXCI+VGltZTogPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJzdGF0LWRhdGFcXFwiIGRhdGEtc3RhdC10aW1lPjwvc3Bhbj48L3A+XFxyXFxuICAgICAgICA8cCBjbGFzcz1cXFwic3RhdFxcXCI+XFxyXFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN0YXQtbGFiZWxcXFwiPk1vdmVzOjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwic3RhdC1kYXRhXFxcIiBkYXRhLXN0YXQtbW92ZXM+PC9zcGFuPlxcclxcbiAgICAgICAgPC9wPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibmV3LWdhbWVcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMj5TdGFydCBhIE5ldyBHYW1lPC9oMj5cXHJcXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgZGF0YS1jbGlja2FibGUtZGlmZmljdWx0eT1cXFwiZWFzeVxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGFyZ2UgZ3JlZW5cXFwiPkVhc3k8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgZGF0YS1jbGlja2FibGUtZGlmZmljdWx0eT1cXFwibWVkaXVtXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1sYXJnZSB5ZWxsb3cgYmxhY2stdGV4dFxcXCI+TWVkaXVtPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGRhdGEtY2xpY2thYmxlLWRpZmZpY3VsdHk9XFxcImhhcmRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxhcmdlIHJlZFxcXCI+SGFyZDwvYnV0dG9uPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xufSxcInVzZVBhcnRpYWxcIjp0cnVlLFwidXNlRGF0YVwiOnRydWV9KSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGdhbWU7XHJcblxyXG5mdW5jdGlvbiBnYW1lUmVhZHkoKSB7XHJcbiAgICAkKCdtYWluJykub24oJ2NsaWNrJywgJ1tkYXRhLWNsaWNrYWJsZS1kaWZmaWN1bHR5XScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBnYW1lTG9vcCgkKGUuY3VycmVudFRhcmdldCkuZGF0YSgnY2xpY2thYmxlLWRpZmZpY3VsdHknKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2FtZUxvb3AoZGlmZmljdWx0eSkge1xyXG4gICAgbGV0IGdyaWRTaXplO1xyXG4gICAgc3dpdGNoIChkaWZmaWN1bHR5KSB7XHJcbiAgICAgICAgY2FzZSBcImVhc3lcIjpcclxuICAgICAgICAgICAgZ3JpZFNpemUgPSA0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibWVkaXVtXCI6XHJcbiAgICAgICAgICAgIGdyaWRTaXplID0gNjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImhhcmRcIjpcclxuICAgICAgICAgICAgZ3JpZFNpemUgPSA4O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgZ2FtZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGdhbWUgPSBuZXcgR2FtZShncmlkU2l6ZSk7XHJcbiAgICAgICAgZ2FtZS5zdGFydCgpO1xyXG4gICAgICAgIHN0YXJ0Q2xpY2tMaXN0ZW5lcnMoZ2FtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdhbWUucmVzdGFydChncmlkU2l6ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0Q2xpY2tMaXN0ZW5lcnMoZ2FtZSkge1xyXG4gICAgJCgnbWFpbicpLm9uKCdjbGljaycsICdbZGF0YS1jbGlja2FibGVdJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUucHJvY2Vzc01vdmUoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdoZWFkZXInKS5vbignY2xpY2snLCAnW2RhdGEtY2xpY2thYmxlLXJlc2V0XScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBnYW1lLnJlc3RhcnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2hlYWRlcicpLm9uKCdjbGljaycsICdbZGF0YS1jbGlja2FibGUtbmV3LWdhbWVdJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZ2FtZVJlYWR5KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIC8vIFRha2VzIGEgc2luZ2xlIGFyZ3VtZW50LCBncmlkU2l6ZSxcclxuICAgIC8vIHdoaWNoIG11c3QgYmUgYW4gZXZlbiBpbnRlZ2VyIGdyZWF0ZXJcclxuICAgIC8vIHRoYW4gb3IgZXF1YWwgdG8gZm91ciBhbmQgbGVzcyB0aGFuIG9yXHJcbiAgICAvLyBlcXVhbCB0byA4LiAgVGhlIGRlZmF1bHQgZ3JpZFNpemUgaXMgNC5cclxuICAgIGNvbnN0cnVjdG9yKGdyaWRTaXplID0gNCkge1xyXG4gICAgICAgIC8vIHVzZSBjb25zdHJ1Y3RvciB0byBjYWxsIGluaXRpYWxpemUgZnVuY3Rpb25cclxuICAgICAgICAvLyB0byBhbGxvdyByZXNldCBmdW5jdGlvbmFsaXR5IHdpdGhvdXRcclxuICAgICAgICAvLyBkdXBsaWNhdGUgY29kZSBhbmQgc3RpbGwgcHJlc2VydmUgdXNlIG9mXHJcbiAgICAgICAgLy8gbmV3IGtleXdvcmRcclxuICAgICAgICB0aGlzLmluaXRpYWxpemUoZ3JpZFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoZ3JpZFNpemUpIHtcclxuICAgICAgICBpZiAoZ3JpZFNpemUgJSAyICE9PSAwIHx8IGdyaWRTaXplIDwgNCB8fCBncmlkU2l6ZSA+IDgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR3JpZCBzaXplIG11c3QgYmUgNCwgNiwgb3IgOC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmRlY2sgPSBuZXcgQ2FyZERlY2soZ3JpZFNpemUgKiBncmlkU2l6ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcigpO1xyXG4gICAgICAgIHRoaXMucmF0aW5nID0gbmV3IFN0YXJSYXRpbmcoZ3JpZFNpemUpO1xyXG4gICAgICAgIHRoaXMubW92ZXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlc1JlbWFpbmluZyA9IHRoaXMuZGVjay5udW1NYXRjaGVzO1xyXG4gICAgICAgIHRoaXMubW92ZUluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmlyc3RDYXJkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGbGlwcGVkQ2FyZHMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCdtYWluJywgJ2dhbWVCb2FyZCcsIHRoaXMpO1xyXG4gICAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmRyYXdTY29yZWJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnQoZ3JpZFNpemUgPSB0aGlzLmdyaWRTaXplKSB7XHJcbiAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKGdyaWRTaXplKTtcclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc01vdmUoZSkge1xyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRDYXJkID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IGNhcmRJY29uID0gJChjbGlja2VkQ2FyZCkuZGF0YSgnY2FyZCcpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGlzIGNsYXNzIGlzIGFscmVhZHkgZmxpcHBlZCwgZG8gbm90aGluZ1xyXG4gICAgICAgIGlmICgkKGNsaWNrZWRDYXJkKS5oYXNDbGFzcygnZmxpcHBlZCcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBhbHJlYWR5IDIgZmxpcHBlZCBjYXJkcywgZG8gbm90aGluZ1xyXG4gICAgICAgIC8vIGhhbmRsZXMgdGhlIGNhc2Ugd2hlcmUgYSAzcmQgY2FyZCBpcyBjbGlja2VkIHdoaWxlXHJcbiAgICAgICAgLy8gYW5pbWF0aW9ucyBhcmUgaGFwcGVuaW5nICh1c2luZyBzZXRUaW1lb3V0KTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50RmxpcHBlZENhcmRzID09PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoY2xpY2tlZENhcmQpLmFkZENsYXNzKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RmxpcHBlZENhcmRzKys7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZUluUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlyc3RDYXJkID09PSBjYXJkSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1ZhbGlkTWF0Y2goKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSW52YWxpZE1hdGNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVJblByb2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENhcmQgPSBjYXJkSWNvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpLCAxNTAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1ZhbGlkTWF0Y2goKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRDYXJkID0gJCgnLmZsaXBwZWQnKS5wYXJlbnQoKS5odG1sKCk7XHJcblxyXG4gICAgICAgICQoJy5mb3VuZC1jYXJkJykuaHRtbChmb3VuZENhcmQpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuY2FyZC1jb250YWluZXI+LmZsaXBwZWQnKS5hZGRDbGFzcygnZm91bmQnKS5yZW1vdmVBdHRyKCdkYXRhLWNsaWNrYWJsZScpLnJlbW92ZUNsYXNzKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSwgODAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuZm91bmQtY2FyZCcpLmVtcHR5KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH0sIDE4MDApO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlc1JlbWFpbmluZy0tO1xyXG4gICAgICAgIHRoaXMuZmluYWxpemVNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0ludmFsaWRNYXRjaCgpIHtcclxuICAgICAgICAkKCcuZmxpcHBlZCcpLnBhcmVudCgpLmFkZENsYXNzKCd3cm9uZycpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5mbGlwcGVkJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3dyb25nJyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuZmxpcHBlZCcpLnJlbW92ZUNsYXNzKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSwgNjAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluYWxpemVNb3ZlKCk7XHJcbiAgICAgICAgfSwgdGhpcyksIDcwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxpemVNb3ZlKCkge1xyXG4gICAgICAgIHRoaXMubW92ZXMrKztcclxuICAgICAgICB0aGlzLmZpcnN0Q2FyZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tb3ZlSW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RmxpcHBlZENhcmRzID0gMDtcclxuICAgICAgICB0aGlzLmRyYXdTY29yZWJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0ZvcldpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTY29yZWJvYXJkKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJzID0gdGhpcy5yYXRpbmcudmlzdWFsaXplU3RhclJhdGluZyh0aGlzLm1vdmVzKTtcclxuICAgICAgICAkKCcuZW1wdHktc3RhcnMnKS5odG1sKHN0YXJzLmVtcHR5KTtcclxuICAgICAgICAkKCcuZmlsbGVkLXN0YXJzJykuaHRtbChzdGFycy5maWxsZWQpO1xyXG4gICAgICAgICQoJyNtb3ZlLWNvdW50ZXInKS5odG1sKGBNb3ZlczogJHt0aGlzLm1vdmVzfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9yV2luKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hdGNoZXNSZW1haW5pbmcgPT09IDApIHtcclxuICAgICAgICAgICAgLy8gd2luXHJcbiAgICAgICAgICAgIHRoaXMudGltZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBcclxuICAgICAgICAgICAgJCgnaGVhZGVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcud2luLW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zdGF0LXRpbWVdJykuaHRtbCh0aGlzLnRpbWVyLmVsYXBzZWRUaW1lKTtcclxuICAgICAgICAgICAgJCgnW2RhdGEtc3RhdC1tb3Zlc10nKS5odG1sKHRoaXMubW92ZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFycyA9IHRoaXMucmF0aW5nLnZpc3VhbGl6ZVN0YXJSYXRpbmcodGhpcy5tb3Zlcyk7XHJcbiAgICAgICAgICAgICQoJy5lbXB0eS1zdGFycycpLmh0bWwoc3RhcnMuZW1wdHkpO1xyXG4gICAgICAgICAgICAkKCcuZmlsbGVkLXN0YXJzJykuaHRtbChzdGFycy5maWxsZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==

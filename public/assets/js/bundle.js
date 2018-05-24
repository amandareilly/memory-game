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

        // if there are already 2 flipped cards, do nothing
        // handles the case where a 3rd card is clicked while
        // animations are happening (using setTimeout);
        if (this.currentFlippedCards === 2) {
            console.log('exiting - two cards already flipped');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhcmREZWNrLmpzIiwiUmVuZGVyZXIuanMiLCJTdGFyUmF0aW5nLmpzIiwiVGltZXIuanMiLCJ0ZW1wbGF0ZXMuanMiLCJhcHAuanMiLCJHYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5jbGFzcyBDYXJkRGVjayB7XHJcbiAgICAvLyBUYWtlcyBvbmUgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZVxyXG4gICAgLy8gdG90YWwgbnVtYmVyIG9mIGNhcmRzIG5lZWRlZC4gIFRoaXNcclxuICAgIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIsIGFuZCBtdXN0IGJlXHJcbiAgICAvLyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBcclxuICAgIC8vIGF2YWlsYWJsZSBpY29uTmFtZXMgKjIuICBUaGUgZGVjayB3aWxsXHJcbiAgICAvLyBoYXZlIHR3byBvZiBlYWNoIGNhcmQsIGluIHJhbmRvbSBvcmRlci5cclxuICAgIGNvbnN0cnVjdG9yKG51bUNhcmRzKSB7XHJcbiAgICAgICAgY29uc3QgaWNvbk5hbWVzID0gW1xyXG4gICAgICAgICAgICAnYnVpbGQnLFxyXG4gICAgICAgICAgICAnZGVsZXRlJyxcclxuICAgICAgICAgICAgJ2ZhY2UnLFxyXG4gICAgICAgICAgICAnZmF2b3JpdGUnLFxyXG4gICAgICAgICAgICAnZ3JhZGUnLFxyXG4gICAgICAgICAgICAnaG9tZScsXHJcbiAgICAgICAgICAgICdsaWdodGJ1bGJfb3V0bGluZScsXHJcbiAgICAgICAgICAgICdsb2NrJyxcclxuICAgICAgICAgICAgJ3BldHMnLFxyXG4gICAgICAgICAgICAnc2hvcHBpbmdfY2FydCcsXHJcbiAgICAgICAgICAgICd0aHVtYl91cCcsXHJcbiAgICAgICAgICAgICd0aHVtYl9kb3duJyxcclxuICAgICAgICAgICAgJ3N0b3JlJyxcclxuICAgICAgICAgICAgJ3Zpc2liaWxpdHknLFxyXG4gICAgICAgICAgICAnd29yaycsXHJcbiAgICAgICAgICAgICdsb2NhbF9mbG9yaXN0JyxcclxuICAgICAgICAgICAgJ3BsYXlfYXJyb3cnLFxyXG4gICAgICAgICAgICAncmFkaW8nLFxyXG4gICAgICAgICAgICAncGhvbmUnLFxyXG4gICAgICAgICAgICAnbWFpbF9vdXRsaW5lJyxcclxuICAgICAgICAgICAgJ3NlbmQnLFxyXG4gICAgICAgICAgICAnYWlycGxhbmVtb2RlX2FjdGl2ZScsXHJcbiAgICAgICAgICAgICdiYXR0ZXJ5X2Z1bGwnLFxyXG4gICAgICAgICAgICAnaW5zZXJ0X2Vtb3RpY29uJyxcclxuICAgICAgICAgICAgJ2Nsb3VkJyxcclxuICAgICAgICAgICAgJ2ZvbGRlcl9vcGVuJyxcclxuICAgICAgICAgICAgJ2Rlc2t0b3Bfd2luZG93cycsXHJcbiAgICAgICAgICAgICdoZWFkc2V0JyxcclxuICAgICAgICAgICAgJ2tleWJvYXJkX3ZvaWNlJyxcclxuICAgICAgICAgICAgJ2F1ZGlvdHJhY2snLFxyXG4gICAgICAgICAgICAnYnJpZ2h0bmVzc18zJyxcclxuICAgICAgICAgICAgJ2NhbWVyYV9hbHQnLFxyXG4gICAgICAgICAgICAnd2Jfc3VubnknLFxyXG4gICAgICAgICAgICAnZGlyZWN0aW9uc19iaWtlJyxcclxuICAgICAgICAgICAgJ2RpcmVjdGlvbnNfYm9hdCcsXHJcbiAgICAgICAgICAgICdkaXJlY3Rpb25zX2J1cycsXHJcbiAgICAgICAgICAgICdkaXJlY3Rpb25zX2NhcicsXHJcbiAgICAgICAgICAgICdyZXN0YXVyYW50JyxcclxuICAgICAgICAgICAgJ2FjX3VuaXQnLFxyXG4gICAgICAgICAgICAnYmVhY2hfYWNjZXNzJyxcclxuICAgICAgICAgICAgJ2Nhc2lubycsXHJcbiAgICAgICAgICAgICdjaGlsZF9mcmllbmRseScsXHJcbiAgICAgICAgICAgICdmaXRuZXNzX2NlbnRlcicsXHJcbiAgICAgICAgICAgICdwb29sJyxcclxuICAgICAgICAgICAgJ3NwYScsXHJcbiAgICAgICAgICAgICdjYWtlJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGNvbnN0IG51bUljb25zID0gaWNvbk5hbWVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKG51bUNhcmRzICUgMiAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCByZXF1ZXN0IGFuIGV2ZW4gbnVtYmVyIG9mIGNhcmRzLlwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bUNhcmRzIC8gMiA+IG51bUljb25zKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGVub3VnaCBjYXJkcyBhdmFpbGFibGUuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaHVmZmxlZEljb25zID0gdGhpcy5zaHVmZmxlKGljb25OYW1lcykuc2xpY2UoMCwgbnVtQ2FyZHMgLyAyKS5tYXAoZnVuY3Rpb24oY2FyZCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBcImNhcmRJY29uXCI6IGNhcmQgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZGVjayA9IHRoaXMuc2h1ZmZsZShzaHVmZmxlZEljb25zLmNvbmNhdChzaHVmZmxlZEljb25zKSk7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gMDtcclxuICAgICAgICB0aGlzLmRlY2tMZW5ndGggPSBudW1DYXJkcztcclxuICAgICAgICB0aGlzLm51bU1hdGNoZXMgPSB0aGlzLmRlY2tMZW5ndGggLyAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEltcGxlbWVudGF0aW9uIG9mIHRoZSBcIkZpc2hlci1ZYXRlcyBTaHVmZmxlXCJcclxuICAgIC8vIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXIlRTIlODAlOTNZYXRlc19zaHVmZmxlKVxyXG4gICAgLy8gRnJvbSBNaWtlIEJvc3RvY2sgKGh0dHBzOi8vYm9zdC5vY2tzLm9yZy9taWtlL3NodWZmbGUvKVxyXG4gICAgc2h1ZmZsZShhcnJheSkge1xyXG4gICAgICAgIHZhciBtID0gYXJyYXkubGVuZ3RoLFxyXG4gICAgICAgICAgICB0LCBpO1xyXG5cclxuICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZeKAplxyXG4gICAgICAgIHdoaWxlIChtKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnTigKZcclxuICAgICAgICAgICAgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG0tLSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXHJcbiAgICAgICAgICAgIHQgPSBhcnJheVttXTtcclxuICAgICAgICAgICAgYXJyYXlbbV0gPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgYXJyYXlbaV0gPSB0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5leHRDYXJkKCkge1xyXG4gICAgICAgIHRoaXMucG9pbnRlcisrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlY2tbdGhpcy5wb2ludGVyLS1dO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBkZWNrID0gbmV3IENhcmREZWNrKDE2KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBSZW5kZXJlciB7XHJcbiAgICByZW5kZXIoc2VsZWN0b3IsIG5hbWUsIGRhdGEgPSB7fSkge1xyXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5wYXJ0aWFsc1tuYW1lXTtcclxuICAgICAgICAkKHNlbGVjdG9yKS5odG1sKHRlbXBsYXRlKGRhdGEpKS5hdHRyKCdjbGFzcycsICdjb250YWluZXInKTtcclxuICAgIH1cclxufSIsImNsYXNzIFN0YXJSYXRpbmcge1xyXG4gICAgY29uc3RydWN0b3IoZ3JpZFNpemUpIHtcclxuICAgICAgICB0aGlzLnN0YXJMb3NzVGhyZXNob2xkID0gKChncmlkU2l6ZSAqIGdyaWRTaXplKSAvIDIpICsgKGdyaWRTaXplIC8gMik7XHJcbiAgICAgICAgdGhpcy5zdGFyTG9zc0ludGVydmFsID0gZ3JpZFNpemUgLyAyO1xyXG4gICAgICAgIHRoaXMubWF4U3RhclJhdGluZyA9IE1hdGgubWF4KDMsIGdyaWRTaXplIC8gMik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhclJhdGluZyA9IHRoaXMubWF4U3RhclJhdGluZztcclxuICAgICAgICB0aGlzLmV4Y2Vzc01vdmVzID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdGFyUmF0aW5nKG1vdmVzKSB7XHJcbiAgICAgICAgaWYgKG1vdmVzKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGEgbW92ZSBoYXMgYmVlbiBtYWRlLFxyXG4gICAgICAgICAgICAvLyBpbmNyZW1lbnQgZXhjZXNzTW92ZXNcclxuICAgICAgICAgICAgdGhpcy5leGNlc3NNb3ZlcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW92ZXMgPCB0aGlzLnN0YXJMb3NzVGhyZXNob2xkIHx8IHRoaXMuY3VycmVudFN0YXJSYXRpbmcgPT09IDEpIHtcclxuICAgICAgICAgICAgLy8gaGFzIG5vdCB5ZXQgbG9zdCBhbnkgc3RhcnNcclxuICAgICAgICAgICAgLy8gb3IgaXMgYWxyZWFkeSBhdCB0aGUgbWluaW11bSBzdGFyIHJhdGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RhclJhdGluZyA9PT0gdGhpcy5tYXhTdGFyUmF0aW5nICYmIHRoaXMuZXhjZXNzTW92ZXMgPT09IHRoaXMuc3Rhckxvc3NUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgLy8gbG9zdGluZyBmaXJzdCBzdGFyXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXJSYXRpbmctLTtcclxuICAgICAgICAgICAgdGhpcy5leGNlc3NNb3ZlcyA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV4Y2Vzc01vdmVzID09PSB0aGlzLnN0YXJMb3NzSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhclJhdGluZy0tO1xyXG4gICAgICAgICAgICB0aGlzLmV4Y2Vzc01vdmVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlzdWFsaXplU3RhclJhdGluZyhtb3Zlcykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhclJhdGluZyhtb3Zlcyk7XHJcbiAgICAgICAgbGV0IGVtcHR5U3RhcnMgPSBcIlwiO1xyXG4gICAgICAgIGxldCBmaWxsZWRTdGFycyA9IFwiXCI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXhTdGFyUmF0aW5nOyBpKyspIHtcclxuICAgICAgICAgICAgZW1wdHlTdGFycyArPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnN0YXJfYm9yZGVyPC9pPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXhTdGFyUmF0aW5nOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPCB0aGlzLmN1cnJlbnRTdGFyUmF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsZWRTdGFycyArPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnN0YXI8L2k+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbGxlZFN0YXJzICs9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHVuZmlsbGVkXCI+c3RhcjwvaT4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBlbXB0eTogZW1wdHlTdGFycywgZmlsbGVkOiBmaWxsZWRTdGFycyB9O1xyXG4gICAgfVxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFRpbWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJyN0aW1lcicpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBjdXJyZW50IHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgZ2V0Q3VycmVudFRpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xyXG4gICAgICAgIC8vdXBkYXRlIHRoZSB0aW1lIGV2ZXJ5IHNlY29uZFxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZVRpbWUuYmluZCh0aGlzKSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZSgpIHtcclxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5nZXRDdXJyZW50VGltZSgpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gMDtcclxuICAgICAgICBsZXQgbWludXRlcyA9IDA7XHJcbiAgICAgICAgbGV0IHNlY29uZHMgPSAwO1xyXG4gICAgICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKGRpZmYgLyA2MCk7XHJcbiAgICAgICAgc2Vjb25kcyA9IE1hdGguZmxvb3IoZGlmZiAlIDYwKTtcclxuICAgICAgICBpZiAobWludXRlcyA+PSA2MCkge1xyXG4gICAgICAgICAgICBob3VycyA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcclxuICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IobWludXRlcyAlIDYwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWludXRlcyA9IHRoaXMucGFkVGltZVZhbHVlKG1pbnV0ZXMpO1xyXG4gICAgICAgIHNlY29uZHMgPSB0aGlzLnBhZFRpbWVWYWx1ZShzZWNvbmRzKTtcclxuICAgICAgICBsZXQgdGltZVN0cmluZyA9IGAke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG4gICAgICAgIGlmIChob3Vycykge1xyXG4gICAgICAgICAgICB0aW1lU3RyaW5nID0gYCR7aG91cnN9OiR7dGltZVN0cmluZ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHRpbWVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IHRpbWVTdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcGFkVGltZVZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgPCAxMCkge1xyXG4gICAgICAgICAgICB2YWwgPSBcIjBcIiArIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XHJcbiAgICB9XHJcbn0iLCJIYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbChcImNhcmRcIiwgSGFuZGxlYmFycy50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgYWxpYXMxPWNvbnRhaW5lci5sYW1iZGEsIGFsaWFzMj1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJjYXJkLWNvbnRhaW5lclxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNhcmRcXFwiIGRhdGEtY2FyZD1cXFwiXCJcbiAgICArIGFsaWFzMihhbGlhczEoKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhcmRJY29uIDogZGVwdGgwKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIiBkYXRhLWNsaWNrYWJsZT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtc2lkZSBjYXJkLWJhY2sgYmx1ZSBkYXJrZW4tM1xcXCI+XFxyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIj5oZWxwPC9pPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLXNpZGUgY2FyZC1mcm9udCBibHVlIGxpZ2h0ZW4tMVxcXCI+XFxyXFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIj5cIlxuICAgICsgYWxpYXMyKGFsaWFzMSgoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY2FyZEljb24gOiBkZXB0aDApLCBkZXB0aDApKVxuICAgICsgXCI8L2k+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KSk7XG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbChcImdhbWVCb2FyZFwiLCBIYW5kbGViYXJzLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuICgoc3RhY2sxID0gY29udGFpbmVyLmludm9rZVBhcnRpYWwocGFydGlhbHMuY2FyZCxkZXB0aDAse1wibmFtZVwiOlwiY2FyZFwiLFwiZGF0YVwiOmRhdGEsXCJpbmRlbnRcIjpcIiAgICAgICAgXCIsXCJoZWxwZXJzXCI6aGVscGVycyxcInBhcnRpYWxzXCI6cGFydGlhbHMsXCJkZWNvcmF0b3JzXCI6Y29udGFpbmVyLmRlY29yYXRvcnN9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSk7XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwiZ2FtZS1ib2FyZCBncmlkLXNpemUtXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuZ3JpZFNpemUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmdyaWRTaXplIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJncmlkU2l6ZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGRhdGEtanMtY2xpY2stY29udGFpbmVyPVxcXCJqcy1jbGljay1jb250YWluZXJcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGFsaWFzMSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZWNrIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5kZWNrIDogc3RhY2sxKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8ZGl2IGNsYXNzPVxcXCJmb3VuZC1jYXJkIGhpZGRlblxcXCI+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcIndpbi1tb2RhbCBoaWRkZW5cXFwiPlxcclxcbiAgICAgICAgPGgyPkNvbmdyYXR1bGF0aW9ucyE8L2gyPlxcclxcbiAgICAgICAgPGRpdiBpZD1cXFwic3Rhci1yYXRpbmctZmluYWxcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZpbGxlZC1zdGFyc1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZW1wdHktc3RhcnNcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8cCBjbGFzcz1cXFwic3RhdFxcXCI+PHNwYW4gY2xhc3M9XFxcInN0YXQtbGFiZWxcXFwiPlRpbWU6IDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwic3RhdC1kYXRhXFxcIiBkYXRhLXN0YXQtdGltZT48L3NwYW4+PC9wPlxcclxcbiAgICAgICAgPHAgY2xhc3M9XFxcInN0YXRcXFwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJzdGF0LWxhYmVsXFxcIj5Nb3Zlczo8L3NwYW4+XFxyXFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInN0YXQtZGF0YVxcXCIgZGF0YS1zdGF0LW1vdmVzPjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvcD5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm5ldy1nYW1lXFxcIj5cXHJcXG4gICAgICAgICAgICA8aDI+U3RhcnQgYSBOZXcgR2FtZTwvaDI+XFxyXFxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGRhdGEtY2xpY2thYmxlLWRpZmZpY3VsdHk9XFxcImVhc3lcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWxhcmdlIGdyZWVuXFxcIj5FYXN5PC9idXR0b24+XFxyXFxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGRhdGEtY2xpY2thYmxlLWRpZmZpY3VsdHk9XFxcIm1lZGl1bVxcXCIgY2xhc3M9XFxcImJ0biBidG4tbGFyZ2UgeWVsbG93IGJsYWNrLXRleHRcXFwiPk1lZGl1bTwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBkYXRhLWNsaWNrYWJsZS1kaWZmaWN1bHR5PVxcXCJoYXJkXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1sYXJnZSByZWRcXFwiPkhhcmQ8L2J1dHRvbj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbn0sXCJ1c2VQYXJ0aWFsXCI6dHJ1ZSxcInVzZURhdGFcIjp0cnVlfSkpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIGdhbWVSZWFkeSgpIHtcclxuICAgICQoJ21haW4nKS5vbignY2xpY2snLCAnW2RhdGEtY2xpY2thYmxlLWRpZmZpY3VsdHldJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWVMb29wKCQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjbGlja2FibGUtZGlmZmljdWx0eScpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnYW1lTG9vcChkaWZmaWN1bHR5KSB7XHJcbiAgICBsZXQgZ3JpZFNpemU7XHJcbiAgICBzd2l0Y2ggKGRpZmZpY3VsdHkpIHtcclxuICAgICAgICBjYXNlIFwiZWFzeVwiOlxyXG4gICAgICAgICAgICBncmlkU2l6ZSA9IDQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJtZWRpdW1cIjpcclxuICAgICAgICAgICAgZ3JpZFNpemUgPSA2O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaGFyZFwiOlxyXG4gICAgICAgICAgICBncmlkU2l6ZSA9IDg7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGdyaWRTaXplKTtcclxuICAgIGdhbWUuc3RhcnQoKTtcclxuICAgIHN0YXJ0Q2xpY2tMaXN0ZW5lcnMoZ2FtZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0Q2xpY2tMaXN0ZW5lcnMoZ2FtZSkge1xyXG4gICAgJCgnbWFpbicpLm9uKCdjbGljaycsICdbZGF0YS1jbGlja2FibGVdJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGdhbWUucHJvY2Vzc01vdmUoZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdoZWFkZXInKS5vbignY2xpY2snLCAnW2RhdGEtY2xpY2thYmxlLXJlc2V0XScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBnYW1lLnJlc3RhcnQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2hlYWRlcicpLm9uKCdjbGljaycsICdbZGF0YS1jbGlja2FibGUtbmV3LWdhbWVdJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZ2FtZVJlYWR5KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIC8vIFRha2VzIGEgc2luZ2xlIGFyZ3VtZW50LCBncmlkU2l6ZSxcclxuICAgIC8vIHdoaWNoIG11c3QgYmUgYW4gZXZlbiBpbnRlZ2VyIGdyZWF0ZXJcclxuICAgIC8vIHRoYW4gb3IgZXF1YWwgdG8gZm91ciBhbmQgbGVzcyB0aGFuIG9yXHJcbiAgICAvLyBlcXVhbCB0byA4LiAgVGhlIGRlZmF1bHQgZ3JpZFNpemUgaXMgNC5cclxuICAgIGNvbnN0cnVjdG9yKGdyaWRTaXplID0gNCkge1xyXG4gICAgICAgIC8vIHVzZSBjb25zdHJ1Y3RvciB0byBjYWxsIGluaXRpYWxpemUgZnVuY3Rpb25cclxuICAgICAgICAvLyB0byBhbGxvdyByZXNldCBmdW5jdGlvbmFsaXR5IHdpdGhvdXRcclxuICAgICAgICAvLyBkdXBsaWNhdGUgY29kZSBhbmQgc3RpbGwgcHJlc2VydmUgdXNlIG9mXHJcbiAgICAgICAgLy8gbmV3IGtleXdvcmRcclxuICAgICAgICB0aGlzLmluaXRpYWxpemUoZ3JpZFNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoZ3JpZFNpemUpIHtcclxuICAgICAgICBpZiAoZ3JpZFNpemUgJSAyICE9PSAwIHx8IGdyaWRTaXplIDwgNCB8fCBncmlkU2l6ZSA+IDgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR3JpZCBzaXplIG11c3QgYmUgNCwgNiwgb3IgOC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmRlY2sgPSBuZXcgQ2FyZERlY2soZ3JpZFNpemUgKiBncmlkU2l6ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcigpO1xyXG4gICAgICAgIHRoaXMucmF0aW5nID0gbmV3IFN0YXJSYXRpbmcoZ3JpZFNpemUpO1xyXG4gICAgICAgIHRoaXMubW92ZXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlc1JlbWFpbmluZyA9IHRoaXMuZGVjay5udW1NYXRjaGVzO1xyXG4gICAgICAgIHRoaXMubW92ZUluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmlyc3RDYXJkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGbGlwcGVkQ2FyZHMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCdtYWluJywgJ2dhbWVCb2FyZCcsIHRoaXMpO1xyXG4gICAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB0aGlzLmRyYXdTY29yZWJvYXJkKCk7XHJcbiAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKHRoaXMuZ3JpZFNpemUpO1xyXG4gICAgICAgIHRoaXMuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTW92ZShlKSB7XHJcbiAgICAgICAgY29uc3QgY2xpY2tlZENhcmQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgY29uc3QgY2FyZEljb24gPSAkKGNsaWNrZWRDYXJkKS5kYXRhKCdjYXJkJyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoaXMgY2xhc3MgaXMgYWxyZWFkeSBmbGlwcGVkLCBkbyBub3RoaW5nXHJcbiAgICAgICAgaWYgKCQoY2xpY2tlZENhcmQpLmhhc0NsYXNzKCdmbGlwcGVkJykpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V4aXRpbmcgLSBjYXJkIGlzIGFscmVhZHkgZmxpcHBlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgYWxyZWFkeSAyIGZsaXBwZWQgY2FyZHMsIGRvIG5vdGhpbmdcclxuICAgICAgICAvLyBoYW5kbGVzIHRoZSBjYXNlIHdoZXJlIGEgM3JkIGNhcmQgaXMgY2xpY2tlZCB3aGlsZVxyXG4gICAgICAgIC8vIGFuaW1hdGlvbnMgYXJlIGhhcHBlbmluZyAodXNpbmcgc2V0VGltZW91dCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEZsaXBwZWRDYXJkcyA9PT0gMikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXhpdGluZyAtIHR3byBjYXJkcyBhbHJlYWR5IGZsaXBwZWQnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChjbGlja2VkQ2FyZCkuYWRkQ2xhc3MoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGbGlwcGVkQ2FyZHMrKztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlSW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJzdENhcmQgPT09IGNhcmRJY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzVmFsaWRNYXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NJbnZhbGlkTWF0Y2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2FyZCA9IGNhcmRJY29uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyksIDE1MDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzVmFsaWRNYXRjaCgpIHtcclxuICAgICAgICBjb25zdCBmb3VuZENhcmQgPSAkKCcuZmxpcHBlZCcpLnBhcmVudCgpLmh0bWwoKTtcclxuXHJcbiAgICAgICAgJCgnLmZvdW5kLWNhcmQnKS5odG1sKGZvdW5kQ2FyZCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5jYXJkLWNvbnRhaW5lcj4uZmxpcHBlZCcpLmFkZENsYXNzKCdmb3VuZCcpLnJlbW92ZUF0dHIoJ2RhdGEtY2xpY2thYmxlJykucmVtb3ZlQ2xhc3MoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5mb3VuZC1jYXJkJykuZW1wdHkoKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfSwgMTgwMCk7XHJcbiAgICAgICAgdGhpcy5tYXRjaGVzUmVtYWluaW5nLS07XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZU1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzSW52YWxpZE1hdGNoKCkge1xyXG4gICAgICAgICQoJy5mbGlwcGVkJykucGFyZW50KCkuYWRkQ2xhc3MoJ3dyb25nJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmZsaXBwZWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnd3JvbmcnKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5mbGlwcGVkJykucmVtb3ZlQ2xhc3MoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9LCA2MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5hbGl6ZU1vdmUoKTtcclxuICAgICAgICB9LCB0aGlzKSwgNzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZU1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlcysrO1xyXG4gICAgICAgIHRoaXMuZmlyc3RDYXJkID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1vdmVJblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGbGlwcGVkQ2FyZHMgPSAwO1xyXG4gICAgICAgIHRoaXMuZHJhd1Njb3JlYm9hcmQoKTtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yV2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Njb3JlYm9hcmQoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnMgPSB0aGlzLnJhdGluZy52aXN1YWxpemVTdGFyUmF0aW5nKHRoaXMubW92ZXMpO1xyXG4gICAgICAgICQoJy5lbXB0eS1zdGFycycpLmh0bWwoc3RhcnMuZW1wdHkpO1xyXG4gICAgICAgICQoJy5maWxsZWQtc3RhcnMnKS5odG1sKHN0YXJzLmZpbGxlZCk7XHJcbiAgICAgICAgJCgnI21vdmUtY291bnRlcicpLmh0bWwoYE1vdmVzOiAke3RoaXMubW92ZXN9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JXaW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hlc1JlbWFpbmluZyA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyB3aW5cclxuICAgICAgICAgICAgdGhpcy50aW1lci5zdG9wKCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFxyXG4gICAgICAgICAgICAkKCdoZWFkZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJy53aW4tbW9kYWwnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJ1tkYXRhLXN0YXQtdGltZV0nKS5odG1sKHRoaXMudGltZXIuZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zdGF0LW1vdmVzXScpLmh0bWwodGhpcy5tb3Zlcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJzID0gdGhpcy5yYXRpbmcudmlzdWFsaXplU3RhclJhdGluZyh0aGlzLm1vdmVzKTtcclxuICAgICAgICAgICAgJCgnLmVtcHR5LXN0YXJzJykuaHRtbChzdGFycy5lbXB0eSk7XHJcbiAgICAgICAgICAgICQoJy5maWxsZWQtc3RhcnMnKS5odG1sKHN0YXJzLmZpbGxlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19

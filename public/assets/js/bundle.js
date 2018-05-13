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
        // this.t = setTimeout(this.updateTime.bind(this), 500);
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

  return "<div class=\"card front\" data-card=\""
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "\" data-clickable>\r\n    <i class=\"material-icons\">"
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "</i>\r\n</div> ";
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
    + "</div>";
},"usePartial":true,"useData":true}));
'use strict';

$('main').on('click', '[data-clickable]', function(e) {
    console.log(e);
    console.log(e.currentTarget);

    $(e.currentTarget).toggleClass('flipped');
})
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

const game = new Game();
game.start();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhcmREZWNrLmpzIiwiUmVuZGVyZXIuanMiLCJUaW1lci5qcyIsInRlbXBsYXRlcy5qcyIsImFwcC5qcyIsIkdhbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuY2xhc3MgQ2FyZERlY2sge1xyXG4gICAgLy8gVGFrZXMgb25lIGFyZ3VtZW50IHRvIGRldGVybWluZSB0aGVcclxuICAgIC8vIHRvdGFsIG51bWJlciBvZiBjYXJkcyBuZWVkZWQuICBUaGlzXHJcbiAgICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyLCBhbmQgbXVzdCBiZVxyXG4gICAgLy8gbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBudW1iZXIgb2YgXHJcbiAgICAvLyBhdmFpbGFibGUgaWNvbk5hbWVzICoyLiAgVGhlIGRlY2sgd2lsbFxyXG4gICAgLy8gaGF2ZSB0d28gb2YgZWFjaCBjYXJkLCBpbiByYW5kb20gb3JkZXIuXHJcbiAgICBjb25zdHJ1Y3RvcihudW1DYXJkcykge1xyXG4gICAgICAgIGNvbnN0IGljb25OYW1lcyA9IFtcclxuICAgICAgICAgICAgJ2J1aWxkJyxcclxuICAgICAgICAgICAgJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgICdmYWNlJyxcclxuICAgICAgICAgICAgJ2Zhdm9yaXRlJyxcclxuICAgICAgICAgICAgJ2dyYWRlJyxcclxuICAgICAgICAgICAgJ2hvbWUnLFxyXG4gICAgICAgICAgICAnbGlnaHRidWxiX291dGxpbmUnLFxyXG4gICAgICAgICAgICAnbG9jaycsXHJcbiAgICAgICAgICAgICdwZXRzJyxcclxuICAgICAgICAgICAgJ3Nob3BwaW5nX2NhcnQnLFxyXG4gICAgICAgICAgICAndGh1bWJfdXAnLFxyXG4gICAgICAgICAgICAndGh1bWJfZG93bicsXHJcbiAgICAgICAgICAgICdzdG9yZScsXHJcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JyxcclxuICAgICAgICAgICAgJ3dvcmsnLFxyXG4gICAgICAgICAgICAnbG9jYWxfZmxvcmlzdCcsXHJcbiAgICAgICAgICAgICdwbGF5X2Fycm93JyxcclxuICAgICAgICAgICAgJ3JhZGlvJyxcclxuICAgICAgICAgICAgJ3Bob25lJyxcclxuICAgICAgICAgICAgJ21haWxfb3V0bGluZScsXHJcbiAgICAgICAgICAgICdzZW5kJyxcclxuICAgICAgICAgICAgJ2FpcnBsYW5lbW9kZV9hY3RpdmUnLFxyXG4gICAgICAgICAgICAnYmF0dGVyeV9mdWxsJyxcclxuICAgICAgICAgICAgJ2luc2VydF9lbW90aWNvbicsXHJcbiAgICAgICAgICAgICdjbG91ZCcsXHJcbiAgICAgICAgICAgICdmb2xkZXJfb3BlbicsXHJcbiAgICAgICAgICAgICdkZXNrdG9wX3dpbmRvd3MnLFxyXG4gICAgICAgICAgICAnaGVhZHNldCcsXHJcbiAgICAgICAgICAgICdrZXlib2FyZF92b2ljZScsXHJcbiAgICAgICAgICAgICdhdWRpb3RyYWNrJyxcclxuICAgICAgICAgICAgJ2JyaWdodG5lc3NfMycsXHJcbiAgICAgICAgICAgICdjYW1lcmFfYWx0JyxcclxuICAgICAgICAgICAgJ3diX3N1bm55JyxcclxuICAgICAgICAgICAgJ2RpcmVjdGlvbnNfYmlrZScsXHJcbiAgICAgICAgICAgICdkaXJlY3Rpb25zX2JvYXQnLFxyXG4gICAgICAgICAgICAnZGlyZWN0aW9uc19idXMnLFxyXG4gICAgICAgICAgICAnZGlyZWN0aW9uc19jYXInLFxyXG4gICAgICAgICAgICAncmVzdGF1cmFudCcsXHJcbiAgICAgICAgICAgICdhY191bml0JyxcclxuICAgICAgICAgICAgJ2JlYWNoX2FjY2VzcycsXHJcbiAgICAgICAgICAgICdjYXNpbm8nLFxyXG4gICAgICAgICAgICAnY2hpbGRfZnJpZW5kbHknLFxyXG4gICAgICAgICAgICAnZml0bmVzc19jZW50ZXInLFxyXG4gICAgICAgICAgICAncG9vbCcsXHJcbiAgICAgICAgICAgICdzcGEnLFxyXG4gICAgICAgICAgICAnY2FrZSdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBudW1JY29ucyA9IGljb25OYW1lcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChudW1DYXJkcyAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgcmVxdWVzdCBhbiBldmVuIG51bWJlciBvZiBjYXJkcy5cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW1DYXJkcyAvIDIgPiBudW1JY29ucykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBlbm91Z2ggY2FyZHMgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2h1ZmZsZWRJY29ucyA9IHRoaXMuc2h1ZmZsZShpY29uTmFtZXMpLnNsaWNlKDAsIG51bUNhcmRzIC8gMikubWFwKGZ1bmN0aW9uKGNhcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgXCJjYXJkSWNvblwiOiBjYXJkIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRlY2sgPSB0aGlzLnNodWZmbGUoc2h1ZmZsZWRJY29ucy5jb25jYXQoc2h1ZmZsZWRJY29ucykpO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWNrTGVuZ3RoID0gbnVtQ2FyZHM7XHJcbiAgICAgICAgdGhpcy5udW1NYXRjaGVzID0gdGhpcy5kZWNrTGVuZ3RoIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgXCJGaXNoZXItWWF0ZXMgU2h1ZmZsZVwiXHJcbiAgICAvLyAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVyJUUyJTgwJTkzWWF0ZXNfc2h1ZmZsZSlcclxuICAgIC8vIEZyb20gTWlrZSBCb3N0b2NrIChodHRwczovL2Jvc3Qub2Nrcy5vcmcvbWlrZS9zaHVmZmxlLylcclxuICAgIHNodWZmbGUoYXJyYXkpIHtcclxuICAgICAgICB2YXIgbSA9IGFycmF5Lmxlbmd0aCxcclxuICAgICAgICAgICAgdCwgaTtcclxuXHJcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGXigKZcclxuICAgICAgICB3aGlsZSAobSkge1xyXG5cclxuICAgICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW504oCmXHJcbiAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtLS0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxyXG4gICAgICAgICAgICB0ID0gYXJyYXlbbV07XHJcbiAgICAgICAgICAgIGFycmF5W21dID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgIGFycmF5W2ldID0gdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXh0Q2FyZCgpIHtcclxuICAgICAgICB0aGlzLnBvaW50ZXIrKztcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWNrW3RoaXMucG9pbnRlci0tXTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZGVjayA9IG5ldyBDYXJkRGVjaygxNik7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgcmVuZGVyKHNlbGVjdG9yLCBuYW1lLCBkYXRhID0ge30pIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMucGFydGlhbHNbbmFtZV07XHJcbiAgICAgICAgJChzZWxlY3RvcikuaHRtbCh0ZW1wbGF0ZShkYXRhKSkuYXR0cignY2xhc3MnLCAnY29udGFpbmVyJyk7XHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBUaW1lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciA9ICcjdGltZXInKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybnMgY3VycmVudCB0aW1lIGluIHNlY29uZHNcclxuICAgIGdldEN1cnJlbnRUaW1lKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcclxuICAgICAgICAvL3VwZGF0ZSB0aGUgdGltZSBldmVyeSBzZWNvbmRcclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVUaW1lLmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRpbWUoKSB7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZ2V0Q3VycmVudFRpbWUoKSAtIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgICAgIGxldCBob3VycyA9IDA7XHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSAwO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gMDtcclxuICAgICAgICBtaW51dGVzID0gTWF0aC5mbG9vcihkaWZmIC8gNjApO1xyXG4gICAgICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKGRpZmYgJSA2MCk7XHJcbiAgICAgICAgaWYgKG1pbnV0ZXMgPj0gNjApIHtcclxuICAgICAgICAgICAgaG91cnMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyA2MCk7XHJcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgJSA2MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1pbnV0ZXMgPSB0aGlzLnBhZFRpbWVWYWx1ZShtaW51dGVzKTtcclxuICAgICAgICBzZWNvbmRzID0gdGhpcy5wYWRUaW1lVmFsdWUoc2Vjb25kcyk7XHJcbiAgICAgICAgbGV0IHRpbWVTdHJpbmcgPSBgJHttaW51dGVzfToke3NlY29uZHN9YDtcclxuICAgICAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICAgICAgdGltZVN0cmluZyA9IGAke2hvdXJzfToke3RpbWVTdHJpbmd9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3Rvcik7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSB0aW1lU3RyaW5nO1xyXG4gICAgICAgIC8vIHRoaXMudCA9IHNldFRpbWVvdXQodGhpcy51cGRhdGVUaW1lLmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFkVGltZVZhbHVlKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgPCAxMCkge1xyXG4gICAgICAgICAgICB2YWwgPSBcIjBcIiArIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XHJcbiAgICB9XHJcbn0iLCJIYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbChcImNhcmRcIiwgSGFuZGxlYmFycy50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgYWxpYXMxPWNvbnRhaW5lci5sYW1iZGEsIGFsaWFzMj1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbjtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJjYXJkIGZyb250XFxcIiBkYXRhLWNhcmQ9XFxcIlwiXG4gICAgKyBhbGlhczIoYWxpYXMxKChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jYXJkSWNvbiA6IGRlcHRoMCksIGRlcHRoMCkpXG4gICAgKyBcIlxcXCIgZGF0YS1jbGlja2FibGU+XFxyXFxuICAgIDxpIGNsYXNzPVxcXCJtYXRlcmlhbC1pY29uc1xcXCI+XCJcbiAgICArIGFsaWFzMihhbGlhczEoKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNhcmRJY29uIDogZGVwdGgwKSwgZGVwdGgwKSlcbiAgICArIFwiPC9pPlxcclxcbjwvZGl2PiBcIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJQYXJ0aWFsKFwiZ2FtZUJvYXJkXCIsIEhhbmRsZWJhcnMudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gKChzdGFjazEgPSBjb250YWluZXIuaW52b2tlUGFydGlhbChwYXJ0aWFscy5jYXJkLGRlcHRoMCx7XCJuYW1lXCI6XCJjYXJkXCIsXCJkYXRhXCI6ZGF0YSxcImluZGVudFwiOlwiICAgICAgICBcIixcImhlbHBlcnNcIjpoZWxwZXJzLFwicGFydGlhbHNcIjpwYXJ0aWFscyxcImRlY29yYXRvcnNcIjpjb250YWluZXIuZGVjb3JhdG9yc30pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJnYW1lLWJvYXJkIGdyaWQtc2l6ZS1cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5ncmlkU2l6ZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZ3JpZFNpemUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImdyaWRTaXplXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgZGF0YS1qcy1jbGljay1jb250YWluZXI9XFxcImpzLWNsaWNrLWNvbnRhaW5lclxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmRlY2sgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmRlY2sgOiBzdGFjazEpLHtcIm5hbWVcIjpcImVhY2hcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiPC9kaXY+XCI7XG59LFwidXNlUGFydGlhbFwiOnRydWUsXCJ1c2VEYXRhXCI6dHJ1ZX0pKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4kKCdtYWluJykub24oJ2NsaWNrJywgJ1tkYXRhLWNsaWNrYWJsZV0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdmbGlwcGVkJyk7XHJcbn0pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgICAvLyBUYWtlcyBhIHNpbmdsZSBhcmd1bWVudCwgZ3JpZFNpemUsXHJcbiAgICAvLyB3aGljaCBtdXN0IGJlIGFuIGV2ZW4gaW50ZWdlciBncmVhdGVyXHJcbiAgICAvLyB0aGFuIG9yIGVxdWFsIHRvIGZvdXIgYW5kIGxlc3MgdGhhbiBvclxyXG4gICAgLy8gZXF1YWwgdG8gOC4gIFRoZSBkZWZhdWx0IGdyaWRTaXplIGlzIDQuXHJcbiAgICBjb25zdHJ1Y3RvcihncmlkU2l6ZSA9IDQpIHtcclxuICAgICAgICBpZiAoZ3JpZFNpemUgJSAyICE9PSAwIHx8IGdyaWRTaXplIDwgNCB8fCBncmlkU2l6ZSA+IDgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR3JpZCBzaXplIG11c3QgYmUgNCwgNiwgb3IgOC5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmRlY2sgPSBuZXcgQ2FyZERlY2soZ3JpZFNpemUgKiBncmlkU2l6ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcigpO1xyXG4gICAgICAgIHRoaXMubW92ZXMgPSAwO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlc1JlbWFpbmluZyA9IHRoaXMuZGVjay5udW1NYXRjaGVzO1xyXG4gICAgICAgIHRoaXMubWF0Y2hlc0ZvdW5kID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJSYXRpbmcgPSB0aGlzLmdyaWRTaXplO1xyXG4gICAgICAgIHRoaXMuc2V0U2NvcmluZ01vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5tb3ZlSW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2NvcmluZ01vZGVsKCkge1xyXG4gICAgICAgIHRoaXMuc3Rhckxvc3NUaHJlc2hvbGQgPSAodGhpcy5ncmlkU2l6ZSAqIHRoaXMuZ3JpZFNpemUpIC8gMjtcclxuICAgICAgICB0aGlzLnN0YXJMb3NzSW50ZXJ2YWwgPSB0aGlzLmdyaWRTaXplIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcignbWFpbicsICdnYW1lQm9hcmQnLCB0aGlzKTtcclxuICAgICAgICAvLyBUT0RPOiByZW5kZXIgc2NvcmUgYm9hcmRcclxuICAgICAgICB0aGlzLnRpbWVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc01vdmUoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVJblByb2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja01vdmUoZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlSW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gVE9ETzogXHJcbiAgICAgICAgICAgIC8vIDEuIHNldCB0aGlzLmZpcnN0UGljayA9IGNsaWNrZWQgQ2FyZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja01vdmUoZSkge1xyXG4gICAgICAgIC8vIFRPRE86IFxyXG4gICAgICAgIC8vIENIRUNLIFRPIFNFRSBJRiBDQVJEUyBNQVRDSFxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NWYWxpZE1hdGNoKCkge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgLy8gUFJPQ0VTUyBBIFZBTElEIE1BVENIXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0ludmFsaWRNYXRjaCgpIHtcclxuICAgICAgICAvLyBUT0RPOiBcclxuICAgICAgICAvLyBQUk9DRVNTIEFOIElOVkFMSUQgTUFUQ0hcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbmdhbWUuc3RhcnQoKTsiXX0=

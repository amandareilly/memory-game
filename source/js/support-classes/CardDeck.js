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
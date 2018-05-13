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
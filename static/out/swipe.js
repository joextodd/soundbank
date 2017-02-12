'use strict';

/*
 * Detect a swipe, and handle response.
 */
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var swipeThreshold = 150;
var body = document.getElementsByTagName('body')[0];
var audio = document.getElementsByTagName('audio')[0];

body.addEventListener('touchstart', function (event) {
    touchstartX = event.pageX;
    touchstartY = event.pageY;
}, false);

body.addEventListener('touchend', function (event) {
    touchendX = event.pageX;
    touchendY = event.pageY;
    handleGesture();
}, false);

/*
 * Swipe to new song on a full swipe, otherwise force
 * play, as this is restricted on mobile devices.
 */
var handleGesture = function handleGesture() {
    if (Math.abs(touchendX - touchstartX) > swipeThreshold) {
        document.location.href = '/discover';
        audio.play();
    } else {
        audio.play();
    }
};
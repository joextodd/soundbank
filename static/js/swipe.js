/*
 * Detect a swipe, and handle response.
 */
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

const swipeThreshold = 150;
const body = document.getElementsByTagName('body')[0];
const audio = document.getElementsByTagName('audio')[0];

body.addEventListener('touchstart', (event) => {
    touchstartX = event.pageX;
    touchstartY = event.pageY;
}, false);

body.addEventListener('touchend', (event) => {
    touchendX = event.pageX;
    touchendY = event.pageY;
    handleGesture();
}, false);

/*
 * Swipe to new song on a full swipe, otherwise force
 * play, as this is restricted on mobile devices.
 */
const handleGesture = () => {
    if (Math.abs(touchendX - touchstartX) > swipeThreshold) {
        document.location.href = '/discover';
        audio.play();
    } else {
    	audio.play();
    }
}
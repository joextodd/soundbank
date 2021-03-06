/*
 * Detect a swipe, and handle response.
 */
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const swipeThreshold = 150;
const body = document.querySelector('body');
const audio = document.querySelector('audio');

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
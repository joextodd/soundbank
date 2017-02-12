/*
 * Go to next song when finished.
 */
document.querySelector('audio').onended = () => {
	window.location.href = '/discover';
};
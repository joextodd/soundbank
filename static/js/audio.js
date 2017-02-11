/*
 * Go to next song when finished.
 */
const audio = document.getElementsByTagName('audio')[0];

audio.onended = () => {
	window.location.href = '/discover';
};
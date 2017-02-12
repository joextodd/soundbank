/*
 * Go to next song when finished.
 */
document.getElementsByTagName('audio')[0].onended = () => {
	window.location.href = '/discover';
};
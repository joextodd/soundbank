'use strict';

/*
 * Go to next song when finished.
 */
document.querySelector('audio').onended = function () {
  window.location.href = '/discover';
};
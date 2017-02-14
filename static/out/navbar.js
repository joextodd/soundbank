'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
 * Open/close a full screen nav menu.
 */
var menuOpen = false;
var height = 80;
var nav = document.querySelector('nav');
var menu = document.querySelector('.menu');
var links = [].concat(_toConsumableArray(document.querySelectorAll('.links')));

var openMenu = function openMenu() {
  if (!menuOpen) {
    // Open menu and add overlay classes
    nav.classList.add('menu-open');
    links.forEach(function (link) {
      link.classList.add('menu-open-links');
    });
    var margin = (window.screen.height - height * (links.length + 1)) / 4;
    links[0].style.marginTop = margin + 'px';
    menuOpen = true;
  } else {
    // Close menu, remove classes
    nav.classList.remove('menu-open');
    links.forEach(function (link) {
      link.classList.remove('menu-open-links');
    });
    links[0].style.marginTop = '0px';
    menuOpen = false;
  }
};

menu.onclick = openMenu;
menu.touchstart = openMenu;
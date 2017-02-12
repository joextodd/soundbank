'use strict';
/*
 * Open/close a full screen nav menu.
 */
'use-strict';

var menuOpen = false;
var height = 80;
var nav = document.getElementsByTagName('nav')[0];
var menu = document.getElementsByClassName('menu')[0];
var links = [].slice.call(document.getElementsByClassName('links'));

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
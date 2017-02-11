/*
 * Open/close a full screen nav menu.
 */
'use-strict';

let menuOpen = false;
const height = 80;
const nav = document.getElementsByTagName('nav')[0];
const menu = document.getElementsByClassName('menu')[0];
const links = [].slice.call(document.getElementsByClassName('links'));

const openMenu = () => {
  if (!menuOpen) {
    // Open menu and add overlay classes
    nav.className += ' menu-open';
    links.forEach((link) => {
      link.className += ' menu-open-links';
    });
    const margin = (window.screen.height - (height * (links.length + 1))) / 4;
    links[0].style.marginTop = `${margin}px`;
    menuOpen = true;
  } else {
    // Close menu, remove classes
    nav.className = nav.className.replace(' menu-open', '');
    links.forEach((link) => {
      link.className = link.className.replace(' menu-open-links', '');
    });
    links[0].style.marginTop = '0px';
    menuOpen = false;
  }
}

menu.onclick = openMenu;
menu.touchstart = openMenu;

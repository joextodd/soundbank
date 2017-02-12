/*
 * Open/close a full screen nav menu.
 */
let menuOpen = false;
const height = 80;
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu');
const links = [...document.querySelectorAll('.links')];

const openMenu = () => {
  if (!menuOpen) {
    // Open menu and add overlay classes
    nav.classList.add('menu-open');
    links.forEach((link) => {
      link.classList.add('menu-open-links');
    });
    const margin = (window.screen.height - (height * (links.length + 1))) / 4;
    links[0].style.marginTop = `${margin}px`;
    menuOpen = true;
  } else {
    // Close menu, remove classes
    nav.classList.remove('menu-open');
    links.forEach((link) => {
      link.classList.remove('menu-open-links');
    });
    links[0].style.marginTop = '0px';
    menuOpen = false;
  }
}

menu.onclick = openMenu;
menu.touchstart = openMenu;

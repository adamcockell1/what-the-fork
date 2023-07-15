'use strict';

const navBar = document.querySelector('.navBar');
const navButtons = document.getElementsByClassName('navButton');
const icon = document.querySelector('.icon');
const main = document.querySelector('.main');

/* Theme and color button functions */

let filters = ['invert(0)', 'grayscale(0)'];

function theme() {
    if (filters.includes('invert(1)')) {
        // Disable color inversion effect and update button text
        filters[0] = 'invert(0)';
        document.querySelector('.themeBtn').textContent = 'DARK MODE';
    } else {
        // Enable color inversion effect and update button text
        filters[0] = 'invert(1)';
        document.querySelector('.themeBtn').textContent = 'LIGHT MODE';
    }
    // Overwrite currently applied filters with what is stored in the filters list
    document.documentElement.style.filter = filters.join(' ');
}

function color() {
    if (filters.includes('grayscale(1)')) {
        // Disable grayscale effect and update button text
        filters[1] = 'grayscale(0)';
        document.querySelector('.colorBtn').textContent = 'FULL COLOR';
    } else {
        // Enable grayscale effect and update button text
        filters[1] = 'grayscale(1)';
        document.querySelector('.colorBtn').textContent = 'GRAYSCALE';
    }
    // Overwrite currently applied filters with what is stored in the filters list
    document.documentElement.style.filter = filters.join(' ');
}

/* Logo fade in on page load */

window.addEventListener('load', () => {
    // Set icon origin point
    icon.style.transition = '1s';
    icon.style.left = (window.innerWidth - icon.width) / 2 + 'px';
    icon.style.top = (window.innerHeight - icon.height) / 2 + 'px';
    icon.style.opacity = '1';
});

/* Navbar reveal and image scale/transform on scoll */

window.addEventListener('scroll', () => {
    // Define scaling and translation functions
    let scale = 100 - window.scrollY / 5.25;
    // (window.innerWidth - icon.width) / 2 is the initial position (center)
    // (window.scrollY * window.innerWidth) / 1000 translates to the top left corner
    // window.scrollY / X determines the 'padding' between the edges and the icon
    let left =
        (window.innerWidth - icon.width) / 2 -
        (window.scrollY * window.innerWidth) / 1000 +
        window.scrollY / 6.8;
    let top =
        (window.innerHeight - icon.height) / 2 -
        (window.scrollY * window.innerHeight) / 1000 +
        window.scrollY / 10.2;

    if (window.scrollY <= 500) {
        // Disable the navbar for the duration of the icon transform effect
        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].disabled = true;
        }
        navBar.style.opacity = '0';
        // Disable transition for snappier effect
        icon.style.transition = 'none';
        // Scale and translate icon
        icon.style.transform = 'scale(' + scale + '%)';
        icon.style.left = left + 'px';
        icon.style.top = top + 'px';
    } else {
        // Fix transform inaccuracies caused by jumps in scrollY value
        // The values below are the same as the translation functions defined above,
        // but solved and simplified with 500 in place of window.scrollY
        icon.style.transform = 'scale(4.8%)';
        icon.style.left = 73.53 - icon.width / 2 + 'px';
        icon.style.top = 49.02 - icon.height / 2 + 'px';
        // Re-enable the navbar after the icon transform effect finishes
        navBar.style.opacity = '1';
        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].disabled = false;
        }
    }
});

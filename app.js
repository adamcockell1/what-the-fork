"use strict";

const navBar = document.querySelector(".navBar");
const navButtons = document.getElementsByClassName("navButton");
const icon = document.querySelector(".icon");
const main = document.querySelector(".main");

/* Theme and color button functions */

let filters = [];

function theme() {
    if (filters.includes("invert(1)")) {
        // Find and remove invert from the list of filters and update button text
        filters.splice(filters.indexOf("invert(1)"), 1);
        document.querySelector(".themeBtn").textContent = "DARK MODE";
    } else {
        // Add invert to the list of filters and update button text
        filters.push("invert(1)");
        document.querySelector(".themeBtn").textContent = "LIGHT MODE";
    }
    // Overwrite currently applied filters with what is stored in the filters list
    document.documentElement.style.filter = filters.join(" ");
}

function color() {
    if (filters.includes("grayscale(1)")) {
        // Find and remove grayscale from the list of filters and update button text
        filters.splice(filters.indexOf("grayscale(1)"), 1);
        document.querySelector(".colorBtn").textContent = "FULL COLOR";
    } else {
        // Add grayscale to the list of filters and update button text
        filters.push("grayscale(1)");
        document.querySelector(".colorBtn").textContent = "GRAYSCALE";
    }
    // Overwrite currently applied filters with what is stored in the filters list
    document.documentElement.style.filter = filters.join(" ");
}

/* Logo fade in on page load */

window.addEventListener("load", () => {
    // Set icon origin point
    icon.style.transition = "1s";
    icon.style.left = (window.innerWidth - icon.width) / 2 + "px";
    icon.style.top = (window.innerHeight - icon.height) / 2 + "px";
    icon.style.opacity = "1";
});

/* Navbar reveal and image scale/transform on scoll */

window.addEventListener("scroll", () => {
    let scale = 100 - window.scrollY / 5.75;
    let left =
        (window.innerWidth - icon.width) / 2 -
        (window.scrollY * window.innerWidth) / window.innerHeight;
    let top =
        (window.innerHeight - icon.height) / 2 -
        (window.scrollY * window.innerHeight) / window.innerWidth;

    if (window.scrollY <= 500) {
        // Disable the navbar for the duration of the icon transform effect
        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].disabled = true;
        }
        navBar.style.opacity = "0";
        // Disable transition for snappier effect
        icon.style.transition = "none";
        // Scale and translate icon
        icon.style.transform = "scale(" + scale + "%)";
        icon.style.left = left + "px";
        icon.style.top = top + "px";
    } else {
        // Re-enable transition for color/theme changes
        icon.style.transition = "0.5s";
        // Re-enable the navbar after the icon transform effect finishes
        navBar.style.opacity = "1";
        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].disabled = false;
        }
    }
});

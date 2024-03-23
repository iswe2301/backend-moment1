"use strict";

// Hämtar element och lagrar i variabler
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-xmark');

// Skapar klickhändelselyssnare för menyknappen, anonym funktion
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show'); // Växlar mellan klassen show för att visa/dölja mobilmenyn

    // Kontrollerar om mobilmenyn visas eller inte
    if (mobileMenu.classList.contains('show')) {
        // Om menyn visas, gör hamburgerikonen osynlig och kryssikonen synlig
        menuIcon.style.opacity = "0";
        closeIcon.style.opacity = "1";
        closeIcon.style.transform = "translate(-50%, -50%) rotate(360deg)"; // Animerar kryssikonen med en rotation på 360 grader
    } else {
        // Om menyn inte visas, gör hamburgerikonen synlig och kryssikonen osynlig
        menuIcon.style.opacity = "1";
        closeIcon.style.opacity = "0";
        closeIcon.style.transform = "translate(-50%, -50%) rotate(-360deg)"; // Återställer kryssikonens rotation
    }
});


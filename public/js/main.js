"use strict";

// Hämtar element och lagrar i variabler
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuIcon = document.querySelector(".fa-bars");
const closeIcon = document.querySelector(".fa-xmark");
const containerEl = document.getElementById("overlay");
const submitEl = document.getElementById("submit");
const formEl = document.getElementById("form-container");
const errorEl = document.getElementById("error-message");

// Skapar klickhändelselyssnare för menyknappen, anonym funktion
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show"); // Växlar mellan klassen show för att visa/dölja mobilmenyn
    containerEl.classList.toggle("opacity"); // Växlar mellan visa/dölja opacity när menyn klickas

    // Kontrollerar om mobilmenyn visas eller inte
    if (mobileMenu.classList.contains("show")) {
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

// Kontrollerar om formuläret finns på sidan
if (formEl) {
    // Lägger till en händelselyssnare vid klick på submit-knappen
    submitEl.addEventListener("click", (event) => {
        // Förhindrar formuläret från att skickas om det inte är giltigt
        if (!formEl.checkValidity()) {
            event.preventDefault();
            errorEl.style.display = "flex"; // Visar felmeddelandet om formuläret inte är giltigt
        } else {
            errorEl.style.display = "none"; // Döljer felmeddelandet om formuläret är giltigt
        }
    });

    // Hämtar alla input och select-element från formuläret och lagrar i variabel
    const formInputs = formEl.querySelectorAll("input, select");

    // Lägger till händelselyssnare för varje input och select i formuläret
    formInputs.forEach(input => {
        input.addEventListener("input", () => {
            // Kontrollerar om formuläret är giltigt
            if (formEl.checkValidity()) {
                errorEl.style.display = "none"; // Döljer felmeddelandet när fomruläret är giltigt
            }
        });
    });
}
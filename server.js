// Inkluderar express
const express = require("express");
const app = express(); // Startar applikationen med express
const port = 3000;

// View engine = EJS
app.set("view engine", "ejs");

// Statiska filer i katalogen public
app.use(express.static("public"));

// Route för att dirigera besökare till en sida
app.get("/", (req, res) => {
    res.render("index"); // Renderar startsidan
});

app.get("/addcourse", (req, res) => {
    res.render("addcourse"); // Renderar undersida
});

app.get("/about", (req, res) => {
    res.render("about"); // Renderar undersida
});

// Startar applikationen
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});
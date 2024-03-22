// Inkluderar msql-paketet
const mysql = require("mysql");

// Inkluderar express
const express = require("express");
const app = express(); // Startar applikationen med express
const port = 3000;

// View engine = EJS
app.set("view engine", "ejs");

// Statiska filer i katalogen public
app.use(express.static("public"));

// Inkluderar urlencoded för att kunna läsa in formulärdata
app.use(express.urlencoded({ extended: true }));

// Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "courses",
    password: "mysqlpassword",
    database: "courses"
});

// Kontrollerar errors vid anslutning
connection.connect((error) => {
    if (error) {
        console.error("Anslutning misslyckades: " + error); // Skriver ut felmeddelande
        return;
    }
    console.log("Ansluten till MySQL!") // Skriver ut success-meddelande vid lyckad anslutning
});

// Route för att dirigera besökare till en sida
app.get("/", async (req, res) => {
    res.render("index"); // Renderar startsidan
});

app.get("/addcourse", async (req, res) => {
    res.render("addcourse"); // Renderar undersida
});

app.get("/about", async (req, res) => {
    res.render("about"); // Renderar undersida
});

// Tar emot formulärdata och läser in den skickade datan från formuläret
app.post("/", async (req, res) => {
    const code = req.body.code;
    const name = req.body.name;
    const syllabus = req.body.syllabus;
    const progression = req.body.progression;

    // Skapar SQL fråga för inserts och sätter värdena till den inlästa datan
    const result = await connection.query("INSERT INTO Course(CourseCode, CourseName, Syllabus, Progression)VALUES(?, ?, ?, ?)",
        [code, name, syllabus, progression]
    );
    res.redirect("/"); // Omdirigerar till startsidan för att visa kurser
});

// Startar applikationen
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});

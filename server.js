// Inkluderar postgre
const { Client } = require("pg");

// Inkluderar .env-filen med anslutningsinställningar
require("dotenv").config();

// Inkluderar express
const express = require("express");
const app = express(); // Startar applikationen med express

// View engine = EJS
app.set("view engine", "ejs");

// Statiska filer i katalogen public
app.use(express.static("public"));

// Inkluderar urlencoded för att kunna läsa in formulärdata
app.use(express.urlencoded({ extended: true }));

// Ansluter till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});

// Kontrollerar errors vid anslutning
client.connect((error) => {
    if (error) {
        console.error("Anslutning misslyckades: " + error); // Skriver ut felmeddelande
        return;
    }
    console.log("Ansluten till databasen!") // Skriver ut success-meddelande vid lyckad anslutning
});
// Route för att dirigera besökare till en sida
app.get("/", async (req, res) => {
    // Läser ut information från databasen genom SQL-fråga
    const result = await client.query("SELECT * from course", (error, result) => {
        if (error) {
            console.log("Fel vid DB-fråga");
        } else {
            res.render("index", {
                courses: result.rows
            }); // Renderar startsidan och skickar med resultatets rader
        }
    });
});

// Skapar en route för att hantera GET-förfrågningar
app.get("/delete-course/:id", async (req, res) => {
    // Hämtar kursens ID från URL-parametern ':id'
    const courseId = req.params.id;
    // Ställer en DB-fråga för att ta bort en kurs med det specifika ID:t från databasen
    const result = await client.query("DELETE FROM course WHERE id = $1", [courseId], (error, result) => {
        // Kontrollerar och loggar om det finns ett fel vid körning
        if (error) {
            console.error("Fel vid borttagning av kurs: " + error);
        } else {
            // Annars loggas kursen som raderades
            console.log("Kurs raderad med ID: ", courseId);
            // Omdirigerar besökaren tillbaka till startsidan efter att ha raderat kursen
            res.redirect("/");
        }
    });
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

    // Skapar DB fråga för inserts och sätter värdena till den inlästa datan
    const result = await client.query("INSERT INTO course(coursecode, coursename, syllabus, progression)VALUES($1, $2, $3, $4)",
        [code, name, syllabus, progression], (error, result) => {
            // Kontrollerar och loggar om det finns ett fel vid körning
            if (error) {
                console.error("Fel vid insättning av kurs: " + error);
            } else {
                // Annars loggas kursen som lagts till
                console.log("Kurs tillagd med kurskod: ", code);
                // Omdirigerar besökaren tillbaka till startsidan efter att ha lagt till kursen
                res.redirect("/");
            }
        });
});

app.get("/check-rows", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM Course");
        console.log(result.rows); // Loggar alla rader från tabellen Course
        res.send(result.rows); // Skickar alla rader som svar, så du kan se dem i webbläsaren
    } catch (error) {
        console.error("Fel vid hämtning av rader: ", error);
        res.send("Fel vid hämtning av rader");
    }
});

// Startar applikationen/servern
app.listen(process.env.PORT, () => {
    console.log("Server startad på port: " + process.env.PORT);
});

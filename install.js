// Inkluderar msql-paketet
const mysql = require("mysql");

// Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});

// Kontrollerar errors vid anslutning
connection.connect((error) => {
    if (error) {
        console.error("Anslutning misslyckades: " + error); // Skriver ut felmeddelande
        return;
    }
    console.log("Ansluten till MySQL!") // Skriver ut success-meddelande vid lyckad anslutning
});
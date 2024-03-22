// Inkluderar msql-paketet
const mysql = require("mysql");

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

/* Skapar ny databas med SQL-fråga
connection.query("CREATE DATABASE courses;", (error, results) => {
    if(error) throw error;
    console.log("Databas skapad");
}); */
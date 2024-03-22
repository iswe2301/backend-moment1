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

/* Skapar en drop-tabell till databasen med SQL-fråga
connection.query("DROP TABLE IF EXISTS Course;", (error, results) => {
    if (error) throw error;
    console.log("Tabellen Course raderad.");
}); */

/* Skapar en tabell till databasen med SQL-fråga
connection.query(`CREATE TABLE Course (
    CourseID    INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode  VARCHAR(15) NOT NULL,
    CourseName  VARCHAR(150) NOT NULL,
    Syllabus    VARCHAR(255) NOT NULL,
    Progression VARCHAR(2) NOT NULL,
    CreateDate  DATETIME DEFAULT CURRENT_TIMESTAMP)`, (error, results) => {
    if (error) throw error;
    console.log("Tabellen Course skapad.");
}); */
// Inkluderar postgre
const { Client } = require("pg");

// Inkluderar .env-filen med anslutningsinställningar
require("dotenv").config();

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

// Skapar en tabell
client.query(`
CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    coursecode  VARCHAR(15) NOT NULL,
    coursename  VARCHAR(150) NOT NULL,
    syllabus    VARCHAR(255) NOT NULL,
    progression CHAR(1) NOT NULL,
    createdate  TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`, (error, results) => {
    if (error) throw error;
    console.log("Tabellen course skapad!");
});
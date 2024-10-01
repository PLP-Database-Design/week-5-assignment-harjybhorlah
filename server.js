//import Dependencies

const express = require("express");
const app = express()
const mysql = require("mysql2");
const dotenv = require("dotenv");


//configure environment variable
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    if(err) {
        return console.log("Error connecting to the database", err)
    }
    console.log("Sucessfully connected to Mysql, There is a Wedding today", db.threadId)
})
 


//Question 1
// Retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
}) 

// Question 2
// Retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
}) 


// Question 3
// Filter patients by First Name
app.get('', (req, res) => {
    const getFirstname = "SELECT * FROM patients ORDER BY  first_name"
    db.query(getFirstname, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
})

// Question 4
// Retrieve all providers by their specialty
app.get('', (req, res) => {
    const getSpecialty = " SELECT * FROM providers ORDER BY provider_specialty"
    db.query(getSpecialty, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
}) 

// start listening to the server
app.listen(3300, () => {
    console.log("server is running on port 3300...")
})

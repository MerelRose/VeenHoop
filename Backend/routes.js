const express = require('express');
const conn = require("./conn");

const { loginDocent } = require("./controllers/login");
const { registerDocent } = require("./controllers/register");

module.exports = function (app) {
    // Middleware to parse JSON data
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post("/loginDocent", loginDocent);
    app.post("/registerDocent", registerDocent);

    app.get("/blokken", function (req, res) {
        let sql = "SELECT * FROM blokken";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });

    app.get("/cijfers", function (req, res) {
        let sql = "SELECT * FROM cijfers";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });

    app.get("/docenten", function (req, res) {
        let sql = "SELECT * FROM docenten";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });

    app.get("/klassen", function (req, res) {
        let sql = "SELECT * FROM klassen";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });

    app.get("/leerlingen", function (req, res) {
        // Get klas_id from query parameters
        const klas_id = req.query.klas_id;
    
        // Check if klas_id is provided
        if (!klas_id) {
            return res.status(400).send("klas_id is required");
        }
    
        // SQL query to select students based on klas_id
        let sql = "SELECT * FROM leerlingen WHERE klas_id = ?";
        
        // Execute the query with klas_id as a parameter
        conn.query(sql, [klas_id], function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });

    app.get("/vakken", function (req, res) {
        let sql = "SELECT * FROM vakken";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });



};
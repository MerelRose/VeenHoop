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

    app.post("/cijfers", function (req, res) {
        const { klas_id, vak_id, leerlingen } = req.body;
    
        // Validate input
        if (!klas_id || !vak_id || !Array.isArray(leerlingen)) {
            return res.status(400).send("klas_id, vak_id, and leerlingen are required");
        }
    
        const sql = "INSERT INTO cijfers (leerling_id, klas_id, vak_id, cijfer) VALUES ?";
        const values = leerlingen.map(leerling => [leerling.leerling_id, klas_id, vak_id, leerling.cijfer]);
    
        console.log("Executing SQL:", sql, "with values:", values); // Log the SQL and values
    
        conn.query(sql, [values], function (err, result) {
            if (err) {
                console.error("Error executing query:", err); // Log the error
                return res.status(500).send("Error saving grades: " + err.message); // Send detailed error message
            }
            res.send({ message: "Grades saved successfully", result });
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

    app.get("/leerlingen/all", function (req, res) {
        // SQL query to select all students
        const sql = "SELECT * FROM leerlingen";
    
        // Execute the query
        conn.query(sql, function (err, rows) {
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

    app.get("/historische", function (req, res) {
        let sql = "SELECT * FROM historische_cijfers";
        conn.query(sql, function (err, rows) {
            if (err) {
                res.status(500).send("Error retrieving data");
            } else {
                res.send(rows);
            }
        });
    });



};
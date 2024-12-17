const express = require('express');
const conn = require("./conn");

const { loginDocent, loginLeerling } = require("./controllers/login");
const { registerDocent, registerLeerling } = require("./controllers/register");

module.exports = function (app) {
    // Middleware to parse JSON data
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post("/loginDocent", loginDocent);
    app.post("/registerDocent", registerDocent);

    app.post("/registerLeerling", registerLeerling);
    app.post("/loginLeerling", loginLeerling);

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

    app.get("/klassen", function (req, res) {
        const klasId = req.query.klas_id;
    
        // Validate if the leerling_id is provided
        if (!klasId) {
            return res.status(400).send("Missing 'klas_id' query parameter");
        }
    
        // SQL query to fetch cijfers for the specified leerling_id
        const sql = "SELECT * FROM cijfers WHERE klas_id = ?";
        
        conn.query(sql, [klasId], function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send("Error retrieving data");
            } else {
                if (rows.length === 0) {
                    res.status(404).send("No cijfers found for the specified klas_id");
                } else {
                    res.json(rows);
                }
            }
        });
    });

    app.get("/cijfers", function (req, res) {
        const leerlingId = req.query.leerling_id;
    
        // Validate if the leerling_id is provided
        if (!leerlingId) {
            return res.status(400).send("Missing 'leerling_id' query parameter");
        }
    
        // SQL query to fetch cijfers for the specified leerling_id
        const sql = "SELECT * FROM cijfers WHERE leerling_id = ?";
        
        conn.query(sql, [leerlingId], function (err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send("Error retrieving data");
            } else {
                if (rows.length === 0) {
                    res.status(404).send("No cijfers found for the specified leerling_id");
                } else {
                    res.json(rows);
                }
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
        let obj1 = req.body[0];
        let arr1 = Object.keys(obj1).map((key) => [obj1[key]]);
        let sql = `INSERT INTO cijfers (leerling_id, vak_id, cijfer) VALUES (?, ?, ?)`;
        conn.query(sql, arr1, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Error adding the Cijfer");
            } else {
                res.send("Cijfer successfully added!");
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
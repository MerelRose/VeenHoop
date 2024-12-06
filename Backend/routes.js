const express = require('express');
const conn = require("./conn");

const { loginDocent, loginLeerling } = require("./controllers/login");
const { registerDocent, registerLeerling } = require("./controllers/register");

module.exports = function (app) {
    // Middleware to parse JSON data
    app.use(express.json()); 
    app.use(express.urlencoded({ extended: false }));

    app.post('/gemiddelde/:vak_id', (req, res) => {
        const vakId = parseInt(req.params.vak_id);

        if (isNaN(vakId)) {
            return res.status(400).send({ error: "Invalid vak_id parameter" });
        }

        // Step 1: Calculate the average score for the given vak_id
        const calculateSql = `
            SELECT AVG(cijfer) AS gemiddelde 
            FROM cijfers 
            WHERE vak_id = ?`;

        conn.query(calculateSql, [vakId], (err, results) => {
            if (err) {
                console.error("Error calculating average:", err);
                return res.status(500).send({ error: "Database error while calculating average" });
            }

            const gemiddelde = results[0]?.gemiddelde;

            if (gemiddelde === null || gemiddelde === undefined) {
                return res.status(404).send({ error: "No cijfers found for the specified vak_id" });
            }

            // Step 2: Insert or update the average in the 'blokken' table
            const upsertSql = `
                INSERT INTO blokken (vak_id, gemiddelde_cijfer, created_at, updated_at)
                VALUES (?, ?, NOW(), NOW())
                ON DUPLICATE KEY UPDATE 
                gemiddelde_cijfer = VALUES(gemiddelde_cijfer), 
                updated_at = NOW()`;

            conn.query(upsertSql, [vakId, gemiddelde], (upsertErr) => {
                if (upsertErr) {
                    console.error("Error updating blokken table:", upsertErr);
                    return res.status(500).send({ error: "Database error while updating blokken table" });
                }

                return res.send({
                    message: "Average score successfully calculated and updated",
                    vak_id: vakId,
                    gemiddelde_cijfer: gemiddelde,
                });
            });
        });
    });

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
const express = require('express');
const conn = require("./conn");
const bcrypt = require("bcryptjs");

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

    app.post("/klassen", function (req, res) {
        let obj1 = req.body[0];
        let arr1 = Object.keys(obj1).map((key) => [obj1[key]]);
        let sql = `INSERT INTO klassen (naam) VALUES (?)`;
        conn.query(sql, arr1, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Error adding the klas");
            } else {
                res.send("klas successfully added!");
            }
        });
    });

    app.delete("/klassen/:id", function (req, res) {
        let sql = "DELETE FROM klassen WHERE klas_id = ?";
        conn.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.status(500).send("Error deleting data");
            } else if (result.affectedRows === 0) {
                res.status(404).send("klas niet gevonden");
            } else {
                res.send({ message: "klas is verwijderd"});
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
        const { klas_id, vak_id, leerlingen } = req.body;
    
        if (!klas_id || !vak_id || !leerlingen || leerlingen.length === 0) {
            return res.status(400).send("Missing klas_id, vak_id, or leerlingen data");
        }
    
        const sql = "INSERT INTO cijfers (leerling_id, vak_id, cijfer) VALUES ?";
        const values = leerlingen.map((leerling) => [leerling.leerling_id, vak_id, leerling.cijfer]);
    
        conn.query(sql, [values], function (err, result) {
            if (err) {
                console.error("Error inserting cijfers:", err);
                return res.status(500).send("Error saving cijfers");
            }
    
            res.send({ message: "Cijfers successfully added!", insertedRows: result.affectedRows });
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

    app.put("/docenten/:id", async function (req, res) {
        const docentId = req.params.id;
        const { name, email, password, role_id } = req.body;
    
        if (!name || !email || !role_id) {
            return res.status(400).send("Missing 'name', 'email', or 'role_id' in request body");
        }
    
        let hashedPassword = null;
    
        if (password) {
            try {
                hashedPassword = await bcrypt.hash(password, 10);
            } catch (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error processing password");
            }
        }
    
        const sql = `
            UPDATE docenten 
            SET name = ?, email = ?, 
            ${password ? "password = ?," : ""} 
            role_id = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE docent_id = ?`;
    
        const params = password
            ? [name, email, hashedPassword, role_id, docentId]
            : [name, email, role_id, docentId];
    
        conn.query(sql, params, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating docent");
            } else if (result.affectedRows === 0) {
                res.status(404).send("Docent not found");
            } else {
                res.send({ message: "Docent updated successfully" });
            }
        });
    });
    
    app.delete("/docenten/:id", function (req, res) {
        let sql = "DELETE FROM docenten WHERE docent_id = ?";
        conn.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.status(500).send("Error deleting data");
            } else if (result.affectedRows === 0) {
                res.status(404).send("docent niet gevonden");
            } else {
                res.send({ message: "docent is verwijderd"});
            }
        });
     });

    app.get("/klassen/all", function (req, res) {
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

    app.put("/leerlingen/:id", async function (req, res) {
        const leerlingId = req.params.id;
        const { name, email, password, klas_id } = req.body;
    
        if (!name || !email || !klas_id) {
            return res.status(400).send("Missing 'name', 'email', or 'klas_id' in request body");
        }
    
        let hashedPassword = null;
    
        if (password) {
            try {
                hashedPassword = await bcrypt.hash(password, 10);
            } catch (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error processing password");
            }
        }
    
        const sql = `
            UPDATE leerlingen 
            SET name = ?, email = ?, 
            ${password ? "password = ?," : ""} 
            klas_id = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE leerling_id = ?`;
    
        const params = password
            ? [name, email, hashedPassword, klas_id, leerlingId]
            : [name, email, klas_id, leerlingId];
    
        conn.query(sql, params, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send("Error updating leerling");
            } else if (result.affectedRows === 0) {
                res.status(404).send("Leerling not found");
            } else {
                res.send({ message: "Leerling updated successfully" });
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
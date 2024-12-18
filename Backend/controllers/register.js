const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../conn");

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Docent
const registerDocent = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please add all fields" });
        }

        // Check if user exists in MySQL
        connection.query('SELECT * FROM docenten WHERE email = ?', [email], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Insert the new user into MySQL with role_id = 1 (default role as 'user')
                const docent = { name, email, password: hashedPassword, role_id: 1 }; // Default role_id = 1
                connection.query('INSERT INTO docenten SET ?', docent, (err, result) => {
                    if (err) throw err;

                    // Generate token with the user's role (role_id = 1)
                    const token = generateToken(result.insertId, 1); // Role ID 1 corresponds to 'user'

                    res.status(201).json({
                        docent_id: result.insertId, // MySQL returns inserted ID
                        name: docent.name,
                        email: docent.email,
                        role: 'docent', // Automatically set to 'user'
                        id: result.insertId, // MySQL returns inserted ID
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// Register user
const registerLeerling = async (req, res) => {
    const { name, email, password, klas_id } = req.body;

    try {
        if (!name || !email || !password || !klas_id ) {
            return res.status(400).json({ message: "Please add all fields" });
        }

        // Check if user exists in MySQL
        connection.query('SELECT * FROM leerlingen WHERE email = ?', [email], async (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Insert the new user into MySQL
                const user = { name, email, password: hashedPassword, klas_id };
                connection.query('INSERT INTO leerlingen SET ?', user, (err, result) => {
                    if (err) throw err;

                    res.status(201).json({
                        leerling_id: result.insertId, // MySQL returns inserted ID
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        klas_id: user.klas_id,
                    });
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { registerDocent, registerLeerling };
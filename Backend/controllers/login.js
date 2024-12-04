const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../conn"); // MySQL connection

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Login user without asyncHandler
const loginDocent = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Please add all fields" });
    }

    try {
        // Check if user exists in MySQL
        connection.query('SELECT * FROM docenten WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }

            if (results.length > 0) {
                const docent = results[0];

                // Compare entered password with hashed password
                const isMatch = await bcrypt.compare(password, docent.password);

                if (isMatch) {
                    // Fetch user's role from the 'roles' table using the 'role_id'
                    connection.query('SELECT role_name FROM roles WHERE role_id = ?', [docent.role_id], (err, roleResults) => {
                        if (err) {
                            return res.status(500).json({ message: "Database error", error: err });
                        }

                        if (roleResults.length > 0) {
                            const role = roleResults[0].role_name; // Get role name based on role_id

                            // If passwords match, generate a JWT and return user info including the role
                            return res.json({
                                id: docent.id,
                                name: docent.name,
                                email: docent.email,
                                role: role, // Return the role
                                token: generateToken(docent.id, role), // Include role in JWT token
                            });
                        } else {
                            return res.status(400).json({ message: "Role not found" });
                        }
                    });
                } else {
                    return res.status(400).json({ message: "Invalid credentials 1" });
                }
            } else {
                return res.status(400).json({ message: "Invalid credentials 2" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { loginDocent };
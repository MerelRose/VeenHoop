const jwt = require("jsonwebtoken");
const connection = require("../conn");

// Middleware to protect routes and verify JWT
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data (id, role) to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

// Middleware to restrict access to `leerling` resources
const restrictToLeerling = (req, res, next) => {
    const { role } = req.user;

    if (role === "leerling" || role === "docent" || role === "admin") {
        return next(); // Allow access for leerling, docent, and admin
    }

    return res.status(403).json({ message: "Access denied." });
};

// Middleware to restrict access to `docent` resources
const restrictToDocent = (req, res, next) => {
    const { role } = req.user;

    if (role === "docent" || role === "admin") {
        return next(); // Allow access for docent and admin
    }

    return res.status(403).json({ message: "Access denied." });
};

// Middleware to restrict access to `admin` resources
const restrictToAdmin = (req, res, next) => {
    const { role } = req.user;

    if (role === "admin") {
        return next(); // Allow access only for admin
    }

    return res.status(403).json({ message: "Access denied. Admins only." });
};

module.exports = {
    protect,
    restrictToLeerling,
    restrictToDocent,
    restrictToAdmin,
};

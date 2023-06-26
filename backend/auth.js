const jwt = require('jsonwebtoken');

const CRED = {
    email: "admin",
    password: "admin",
};

const JWT_SECRET = "secret";

class Auth {
    static login(req, res) {
        const { email, password } = req.body;
        if (email === CRED.email && password === CRED.password) {
            const token = jwt.sign({ email }, JWT_SECRET, {
                expiresIn: "1h",
            });
            res.status(200).json({
                message: "Login successful",
                token,
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials",
            });
        }
    }

    static verifyToken(req, res, next) {
        const token = req.headers["authorization"];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
            });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
    }
}

module.exports = Auth;

const jwt= require("jsonwebtoken");
const {User} =require("../models");
const authConfig = require("../config/auth.config.js");

 const verifyToken = async (req, res, next) => {
    console.log("Verifying token...",req.headers);
    const token =req.headers["authorization"];
 
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }
 
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), authConfig.secret);
        console.log("Token decoded:", decoded);
        req.userId = decoded.id;
 
        const user = await User.findByPk(req.userId);
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
 
 const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const role = await user.getRole();

        const adminRole = role && role.name === "Admin";
        if (adminRole) {
            next();
            return;
        }
 
        res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
 const isMember = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const role = await user.getRole();
 
        const modRole = role && role.name === "Member";
        if (modRole) {
            next();
            return;
        }
 
        res.status(403).json({ message: "Require Member Role!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 

module.exports = {
    verifyToken,
    isAdmin,
    isMember,
};
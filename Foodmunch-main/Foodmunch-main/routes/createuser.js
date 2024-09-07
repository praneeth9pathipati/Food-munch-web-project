const express = require('express')
const router=express.Router();

const User=require("../models/user")
router.post("/createuser", async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Error creating user" });
    }
});

router.post("/loginuser", async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData || userData.password !== req.body.password) {
            res.status(400).json({ error: "Invalid credentials" });
        } else {
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Error logging in" });
    }
});

module.exports=router;
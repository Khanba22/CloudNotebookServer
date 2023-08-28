const express = require("express")
const router = express.Router();
const User = require("../models/User")
const connectToMongo = require("../database/database");
const Notes = require("../models/Notes");

router.get("/", async (req, res) => {
    console.log(req.query);
    await connectToMongo();
    let data = req.query;
    res.redirect(`https://cloudnotebook-2uop.onrender.com/login?username=${data.username}&id=${data.id}`)
})

module.exports = router

const express = require("express")
const router = express.Router();
const User = require("../models/User")
const connectToMongo = require("../database/database")

router.post("/", async (req, res) => {
    const user = req.body;
    try {
        connectToMongo()
        await User.create({
            username: user.username,
            password: user.password,
            email:user.email,
            nickname: user.nickname,
        })
        res.json("Account Creation Successful")
    } catch (error) {
        const keyValues = error.keyValue;
        console.log(error.keyValue)
        if(error.code === 11000 && (keyValues.email!==undefined||keyValues.email!==null) )
        res.json("The User With this Email already exists");
    }

})

module.exports = router

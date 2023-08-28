const express = require("express")
const router = express.Router()
const connectToMongo = require("../database/database")
const User = require("../models/User")
const disconnect = require("../database/database")

router.post("/",(req,res)=>{
    connectToMongo();
    const user = req.body;
    User.findOne({
        username:user.username,
        password:user.password
    }).then((response)=>{
        const sending = {
            notes:response.notes,
            nickname:response.nickname
        }
        res.json(sending)
    }).catch(err=>{console.log(err)})
})

module.exports = router
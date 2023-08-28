const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const User = require("../models/User")
const connectToMongo = require("../database/database")

router.post("/", async (req, res) => {
    const user = req.body;
    connectToMongo()
    await User.updateOne({ username: user.username }, {
        $pull: {
            notes:{
                _id:user._id
            }
        }
    }).catch(err=>{console.log(err)})
    res.json("Done")
})

module.exports = router

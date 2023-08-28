const express = require("express")
const router = express.Router()
const connectToMongo = require("../database/database")
const User = require("../models/User")

router.post("/", async (req, response) => {
    let send = [];
    connectToMongo();
    const user = req.body;
    if (user._id == null) {
        console.log("Creating New Note")
        await User.findOneAndUpdate({ username: user.username }, {
            $push: {
                notes: {
                    title: user.title,
                    content: user.content,
                }
            }

        }).then((res) => { }).catch(err => {
            console.log("Error in creating")
        })
        await User.aggregate(
            [
                {
                    $match: {
                        username: user.username,
                    },
                }, {
                    $project:
                    {
                        _id: 0,
                        notes: 1,
                    },
                },
                {
                    $unwind: "$notes",
                },
            ]
        ).then((data) => { send = data[data.length - 1] }).catch(err => { })
    }
    else {
        await User.updateOne(
            { username: user.username, 'notes._id': user._id },
            {
                $set: {
                    "notes.$.title": user.title,
                    "notes.$.content": user.content
                }
            }
        ).catch(err=>{});
    }
    response.json(send)
})

module.exports = router
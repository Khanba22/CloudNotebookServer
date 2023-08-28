const express = require("express")
const router = express.Router();
const User = require("../models/User")
const connectToMongo = require("../database/database");

const isPresent = async (username, noteId) => {
    var notes = [];
    let flag = false;
    connectToMongo()
    await User.aggregate(
        [
            {
                $match: {
                    username: username
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
            }
        ]
    ).then(data => {
        if (data == null) {
            notes = null;
        }else if(data === []){
            notes = null;
        } else {
            notes = data
        }
    }).catch(err => { console.log(err) })
    if (notes != null) {
        if (notes.length > 0) {
            notes.forEach(noteObj => {
                let note = noteObj.notes
                if (JSON.stringify(note._id).split('"')[1] === noteId) {
                    flag = true
                }
            })
        }
    }
    return flag
}

const loginWithoutNote  = async (username, password)=>{
    var result = "Internal Server Error";
    await User.findOne({ username: username }).then(user => {
        if (user !== null) {
            if (user.password === password) {
                result = "Login SuccessFul"
            } else {
                result = "Wrong Password"
            }
        } else {
            result = "No Such User Exist"
        }
    }).catch(err => { console.log(err) })
    return result
}

const loginWithNote = async (username, password, noteUser, noteId) => {
    var result = "Internal Server Error";
    var reqNote;
    const presentInSender = await isPresent(noteUser, noteId)
    var presentInReceiver = false
    if (presentInSender) {
        reqNote = await retrieveNote(noteUser, noteId)
        presentInReceiver = await isPresent(username, noteId)
    }
    await User.findOne({ username: username }).then(user => {
        if (user !== null) {
            if (user.password === password) {
                if (!presentInReceiver) {
                    addNote(username, reqNote)
                    result = "Login SuccessFul"
                    if (!presentInSender) {
                        result = "Login Successful+No Note Found"
                    }
                }else{
                    result = "Login SuccessFul"
                    if (!presentInSender) {
                        result = "Login Successful+No Note Found"
                    }
                }
            } else {
                result = "Wrong Password"
            }
        } else {
            result = "No Such User Exist"
        }
    }).catch(err => { console.log(err) })
    return result;
}

const retrieveNote = async (noteUser, noteId) => {
    connectToMongo()
    let notes;
    var reqNote
    await User.findOne({ username: noteUser }).then(data => {
        notes = data.notes
        notes.forEach(note => {
            if (JSON.stringify(note._id).split('"')[1] === noteId) {
                reqNote = note
            }
        })
    }).catch(err => { console.log(err) })
    if (reqNote === null) {
        return null
    } else {
        return reqNote
    }
}

const addNote = async (username, note) => {
    if (note) {
        await User.updateOne({ username: username }, {
            $push: {
                notes: note,
            }
        }).catch(err => { console.error(err) })
    }
}


router.post("/", async (req, res) => {
    const { username, password, noteUser, noteId } = req.body;
    var result;
    await connectToMongo()
    try{
        if (noteUser!==null) {
            result = await loginWithNote(username, password, noteUser, noteId)
        }else{
            result = await loginWithoutNote(username,password)
        }
    }catch(err){
        console.log(err)
    }
    res.json(result)
})

module.exports = router

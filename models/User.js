const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    nickname: {
        type: String,
        required: true
    },
    notes: [{
        id:Number,
        title:String,
        content:{
            type: Object,
        }
    }]
})

module.exports = mongoose.model("User", UserSchema)
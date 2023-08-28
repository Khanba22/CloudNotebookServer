const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,

        },
    }
)

module.exports = mongoose.model("Notes", NoteSchema)
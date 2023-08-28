// const mongoose = require("mongoose")
const express = require("express")
const app = express()
app.use(express.static("public"))
app.use(express.json())
// const Notes = require("./models/Notes")
// const User = require("./models/User")
const port = 5000
// const connectToMongo = require("./database/database")

//available Routes
app.use("/login",require("./routes/login"))
app.use("/signup", require("./routes/signup"))
app.use("/cloudnotebook",require("./routes/cloudnotebook"))
app.use("/cloudnotebook/notes",require("./routes/note"))
app.use("/cloudnotebook/delete",require("./routes/deletenote"))
app.use("/cloudnotebook/share",require("./routes/share"))

//Server Listener
app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`)
})
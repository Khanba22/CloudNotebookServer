const { default: mongoose } = require("mongoose");

const connectToMongo = async()=>{
    await mongoose.connect("mongodb+srv://mushan27:Mushan27@cloudnotebook.chhd83p.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    }).catch((err)=>{
        console.log("Connection Unsuccessful");
    })
}


module.exports  = connectToMongo;
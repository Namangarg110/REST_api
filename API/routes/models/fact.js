const mongoose = require('mongoose')


//create a schema
const factSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    author: String,
})

//export the model
module.exports=mongoose.model('Fact',factSchema)
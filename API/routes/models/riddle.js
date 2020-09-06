const mongoose = require('mongoose')

const riddleSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Riddle : String,
    Answer : String,
})

module.exports=mongoose.model('Riddle',riddleSchema)
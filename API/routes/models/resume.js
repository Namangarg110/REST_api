const mongoose = require('mongoose')


//create a schema
const resumeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name : String,
    Address : String,
    Phone_No : String,
    
    Prog_Languages : String,
    Competitive : String,
    Linkdin : String,
    Motto : String,

})

//export the model
module.exports=mongoose.model('Resume',resumeSchema)
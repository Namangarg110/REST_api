const express = require('express');

const router = express.Router();
const mongoose =require('mongoose');
const Resume= require('./models/resume');
const riddle = require('./models/riddle');

router.get('/',(req,res,next)=>
{
    Resume
        .countDocuments()
        .exec((err,count)=>
    {
        var random =Math.floor(Math.random()* count)
        Resume
            .findOne()
            .skip(random)
            .exec()
            .then((result)=>
            {
                console.log(result)
                res.status(200).json(result)
            })
            .catch((err)=>
            {
                console.log(err)
                res.status(500).json(err)
            })
    })

})

router.post('/',(req,res,next)=>{
    
    
    const resume= new Resume({
        _id: new mongoose.Types.ObjectId(),
        Name : req.body.Name,
        Address : req.body.Address,
        Phone_No : req.body.Phone_No,
        
        Prog_Languages : req.body.Prog_Languages,
        Competitive : req.body.Competitive,
        Linkdin : req.body.Linkdin,
        Motto : req.body.Motto,
    })
    resume
        .save()
        .then((result)=>{
            console.log(result)
            res.status(200).json(
            {
                message: 'Post request works',
                createdFact: result
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;
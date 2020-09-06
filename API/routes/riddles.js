const express = require('express');

const router = express.Router();
const mongoose =require('mongoose');

const Riddle = require('./models/riddle');
const { Router } = require('express');


router.get('/',(req,res,next)=>
{
    Riddle
        .countDocuments()
        .exec((err,count)=>
    {
        var random =Math.floor(Math.random()* count)
        Riddle
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
    
    //create new instance of model
    const riddle= new Riddle({
        _id: new mongoose.Types.ObjectId(),
        Riddle : req.body.Riddle,
        Answer : req.body.Answer,
    })
    riddle
        .save()
        .then((result)=>{
            console.log(result)
            res.status(200).json(
            {
                message: 'Post request works',
                createdRiddle: result
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:riddlesId',(req,res,next)=>{
    const id=req.params.riddlesId;


    Riddle.remove({_id: id})
        .exec()
        .then((result)=>{
               console.log(result)
               res.status(200).json(result) 
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
})

module.exports =router
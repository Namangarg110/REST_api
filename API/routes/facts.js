const express = require('express');
const { routes } = require('../../app');

const router = express.Router();
const mongoose =require('mongoose');
const Fact= require('./models/fact');


router.get('/',(req,res,next)=>
{
    Fact
        .countDocuments()
        .exec((err,count)=>
    {
        var random =Math.floor(Math.random()* count)
        Fact
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
    const fact= new Fact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author,
    })
    fact
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

router.delete('/:factsId',(req,res,next)=>{
    const id=req.params.factsId;


    Fact.remove({_id: id})
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

module.exports = router;
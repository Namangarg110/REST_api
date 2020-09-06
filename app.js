const express= require('express');

const app = express();

const morgan=require('morgan');

const bodyParser = require('body-parser');

const factrouter =require('./API/routes/facts');
const riddlerouter = require('./API/routes/riddles');
const resumerouter = require('./API/routes/resumes')


const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://user:user@cluster0.hqydl.azure.mongodb.net/Cluster0?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    if (req.method==="OPTIONS") 
    {
        res.header('Access=Control-Allow-Method','PUT,GET,POST,DELETE,PATCH')
        return res.status(200).json({})
    }
    next();
})

app.use('/facts',factrouter);  
app.use('/riddles',riddlerouter);
app.use('/resumes',resumerouter);

module.exports = app;
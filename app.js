const express = require('express')
const mongoose = require('mongoose')
const morgan    = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const ejs = require('ejs')
require('dotenv').config()
const Form = require('./model/forms')
const app = express()
const { Parser } = require('json2csv')


//environment variables
let port = process.env.PORT || 3000
const dburi = process.env.dbURI


//download csv file
app.get('/download', (req, res) => {
    Form.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const fields = ['firstName', 'lastName', 'parentFirstName', 'parentLastName', 'parentEmail', 'parentPhone', 'state', 'stateOutsideNigeria', 'address', 'comments', 'date']
            const opts = { fields }
            try {
                const parser = new Parser(opts)
                const csv = parser.parse(data)
                res.attachment('data.csv')
                res.status(200).send(csv)
            } catch (err) {
                console.error(err)
            }
        }
    })
})


//view engine
app.set('view engine', 'ejs')

//middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))



//database connection   
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to db')
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
})
.catch((err) => console.log(err))
 
//routes
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html')
})
 

app.post('/reg-form',(req, res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const parentFirstName = req.body.parentFirstName
    const parentLastName  = req.body.parentLastName
    const parentEmail = req.body.parentEmail
    const parentPhone = req.body.parentPhone
    const state = req.body.state 
    const address = req.body.address
    const comments = req.body.comments

    const data = {  
        firstName,
        lastName,
        parentFirstName,
        parentLastName,
        parentEmail,
        parentPhone,
        state,
        address,
        comments
    }


    Form.findOne({parentEmail: parentEmail})
    .then((result)=>{
        if(result == null){
            const form = new Form(data)
            form.save()
            .then((result)=>{
                res.sendFile(__dirname + '/public/success.html')
            })
            .catch((err)=>{
                console.log(err)
            })
        }else if(result == parentEmail && Form.date !== Date.now){
            const form = new Form(data)
            form.save()
            .then((result)=>{
                res.sendFile(__dirname + '/public/success.html')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else {
            res.sendFile(__dirname + '/public/already.html')
        }
    })
    .catch((err)=>{ 
        console.log(err)
    }
    )


})

app.get('/dashboard', (req, res)=>{
    Form.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('dashboard', {forms: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.get('download', (req, res)=>{
    Form.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('dashboard', {forms: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
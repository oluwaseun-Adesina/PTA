const express = require('express')
const mongoose = require('mongoose')
const morgan    = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const ejs = require('ejs')
require('dotenv').config()
const Form = require('./model/forms')
const app = express()

let port = process.env.PORT || 3000

const dburi = process.env.db_URI

//view engine
app.set('view engine', 'ejs')

//middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))



//database connection   
mongoose.connect('mongodb://127.0.0.1:27017/parents', {useNewUrlParser: true, useUnifiedTopology: true})
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

    const newForm = new Form(data)
    newForm.save()
    .then(()=>{
        res.sendFile(__dirname + '/public/success.html')
    })
    .catch((err) => console.log(err))
    
    // Form.create(data)
    // .then(()=>{
    //     console.log(data)
    //     res.sendFile(__dirname + '/public/success.html')
    // })
    // .catch((err) => console.log(err))



})

  
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`)
// })
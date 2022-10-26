const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    parentFirstName: {
        type: String,
        required: true
    },
    parentLastName: {
        type: String,
        required: true
    },
    parentEmail: {
        type: String,
        unique: true,
        required: true
    },
    parentPhone: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    stateOutsideNigeria: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now  
    }
}, {timestamps: true})

const Form = mongoose.model('Form', formSchema)
module.exports = Form
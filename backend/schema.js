const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    datec: {
        type: String,
        required: true
    },
    plc: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    casedetails: {
        type: String,
        required: true
    }
})

const Client = module.exports = mongoose.model('Client', ClientSchema);
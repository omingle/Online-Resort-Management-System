const mongoose = require('mongoose')

const resortSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    resortname: {
        type: String,
        default:''
    },
    resortimages:{
        type: Object,
        required: true
    },
    phone: {
        type: Number,
        default: 0
    },
    rate:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        default: ""
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    },
    addressline1: {
        type: String,
        default:''
    },
    addressline2: {
        type: String,
        default:''
    },
    country:{
        type: String,
        default:''
    },
    state:{
        type: String,
        default:''
    },
    city:{
        type: String,
        default:''
    },
    zipcode:{
        type: Number,
        default:0
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Resorts", resortSchema)
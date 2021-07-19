const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    roomno: {
        type: String,
        default:''
    },
    roomtitle: {
        type: String,
        default:''
    },
    roomdescription: {
        type: String,
        default:''
    },
    roomcategory: {
        type: String,
        default:''
    },
    isbooked: {
        type: Boolean,
        default: false
    },
    checkindate: {
        type: String,
        default: ''
    },
    checkoutdate: {
        type: String,
        default: ''
    },
    roomprice: {
        type: Number,
        default: 0
    },
    roomimages:{
        type: Object,
        required: true
    },
    isdiscount: {
        type: Boolean,
        default: false
    },
    discountedprice: {
        type: Number,
        default: 0
    },
    discountnote: {
        type: String,
        default:''
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Rooms", roomSchema)
const mongoose = require('mongoose')


const roomCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    owner_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("RoomCategory", roomCategorySchema)
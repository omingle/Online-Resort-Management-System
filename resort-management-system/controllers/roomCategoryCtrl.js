const RoomCategory = require('../models/roomCategoryModel')
const Resorts = require('../models/resortModel')
const Users = require('../models/userModel')

const roomCategoryCtrl = {
    getRoomCategories: async(req, res) =>{
        try {
            // console.log("abc");
            // const user = await Users.findById(req.user.id).select('name email')
            // if(!user) return res.status(400).json({msg: "User does not exist."})
            
            // const {_id} = user;
            // console.log(user + "   " + _id);
            const roomCategories = await RoomCategory.find()
            res.json(roomCategories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createRoomCategory: async (req, res) =>{
        try {
            // if user have role = 2 ---> Owner
            // only owner can create , delete and update category
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            const {_id} = user;
            const {name} = req.body;

            const roomCategory = await RoomCategory.findOne({name})
            if(roomCategory) return res.status(400).json({msg: "This category already exists."})

            const newRoomCategory = new RoomCategory({
                name, owner_id: _id
            })

            await newRoomCategory.save()
            res.json({msg: "Created a Room category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteRoomCategory: async(req, res) =>{
        try {
            // Change it with rooms instead of resort

            // const resorts = await Resorts.findOne({roomCategory: req.params.id})
            // if(resorts) return res.status(400).json({
            //     msg: "Please delete all resorts with a relationship."
            // })

            await RoomCategory.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateRoomCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await RoomCategory.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = roomCategoryCtrl
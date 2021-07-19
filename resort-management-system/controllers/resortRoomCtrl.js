const Rooms = require('../models/resortRoomModel')
const Users = require('../models/userModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const resortRoomCtrl = {
    getResortRooms: async(req, res) =>{
        try {
            const features = new APIfeatures(Rooms.find(), req.query)
            .filtering().sorting().paginating()

            const rooms = await features.query

            res.json({
                status: 'success',
                result: rooms.length,
                rooms: rooms
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createResortRoom: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('email')
            
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            const {_id} = user;

            const {roomno, roomtitle, roomdescription, roomcategory, roomprice, roomimages, isdiscount, discountedprice, discountnote} = req.body;

            const room = await Rooms.findOne({roomno: roomno})
            if(room)
                return res.status(400).json({msg: "This room number already exists."})


            if(!roomimages) return res.status(400).json({msg: "No image upload"})

            const newRoom = new Rooms({
                owner_id: _id, roomno, roomtitle, roomdescription, roomcategory, roomprice, roomimages, isdiscount, discountedprice, discountnote
            })

            await newRoom.save()
            res.json({msg: "Room is added to your Resort"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteResortRoom: async(req, res) =>{
        try {
            await Rooms.findByIdAndDelete(req.params.id)
            res.json({msg: "Room is deleted from your resort"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateResortRoom: async(req, res) =>{
        try {
            const {roomno, roomtitle, roomdescription, roomcategory, roomprice, roomimages, isdiscount, discountedprice, discountnote} = req.body;
            if(!roomimages) return res.status(400).json({msg: "No image upload"})

            await Rooms.findOneAndUpdate({_id: req.params.id}, {
                roomno, roomtitle, roomdescription, roomcategory, roomprice, roomimages, isdiscount, discountedprice, discountnote
            })

            res.json({msg: "Room is Updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = resortRoomCtrl
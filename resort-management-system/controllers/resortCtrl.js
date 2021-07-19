const Resorts = require('../models/resortModel')
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

const resortCtrl = {
    getResorts: async(req, res) =>{
        try {
            const features = new APIfeatures(Resorts.find(), req.query)
            .filtering().sorting().paginating()

            const resorts = await features.query

            res.json({
                status: 'success',
                result: resorts.length,
                resorts: resorts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createResort: async(req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('email')
            
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            const {_id} = user;

            const {resortname, resortimages, phone, category, addressline1, addressline2, country, state, city, zipcode} = req.body;
            if(!resortimages) return res.status(400).json({msg: "No image upload"})

            const resort = await Resorts.findOne({resort_id})
            if(resort)
                return res.status(400).json({msg: "This resort already exists."})

            const newResort = new Resorts({
                resortname, resortimages, phone, category,addressline1, addressline2, country, state, city, zipcode
            })

            await newResort.save()
            res.json({msg: "Created a resort"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteResort: async(req, res) =>{
        try {
            await Resorts.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Resort"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateResort: async(req, res) =>{
        try {
            const {resortname, resortimages, phone, category, addressline1, addressline2, country, state, city, zipcode} = req.body;
            if(!resortimages) return res.status(400).json({msg: "No image upload"})

            await Resorts.findOneAndUpdate({_id: req.params.id}, {
                resortname, resortimages, phone, category, addressline1, addressline2, country, state, city, zipcode
            })

            res.json({msg: "Updated a Resort"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = resortCtrl
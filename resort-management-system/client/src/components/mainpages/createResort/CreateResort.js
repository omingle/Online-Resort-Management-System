import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    owner_id: '',
    resortname: '',
    phone: 0,
    category: '',
    addressline1: '',
    addressline2: '',
    country: '',
    state: '',
    city: '',
    zipcode : 0,
    _id: ''
}

function CreateResort() {
    const state = useContext(GlobalState)
    const [resort, setResort] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [resortimages, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [isOwner] = state.userAPI.isOwner
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [resorts] = state.resortsAPI.resorts
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.resortsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            resorts.forEach(resort => {
                if(resort._id === param.id) {
                    setResort(resort)
                    setImages(resort.resortimages)
                }
            })
        }else{
            setOnEdit(false)
            setResort(initialState)
            setImages(false)
        }
    }, [param.id, resorts])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if((!isAdmin) && (!isOwner)) return alert("You're not an admin or onwer of resort")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if((!isAdmin) && (!isOwner)) return alert("You're not an admin or owner of resort")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: resortimages.public_id}, {
                headers: {Authorization: token}
            })

            // await axios.post('/api/destroy', {public_id: resortimages.public_id})

            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setResort({...resort, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            // alert(resortimages)
            if((!isAdmin) && (!isOwner)) return alert("You're not an admin or owner of resort")
            if(!resortimages) return alert("No Image Uploaded")

            if(onEdit){
                await axios.put(`/api/resorts/${resort._id}`, {...resort, resortimages}, {
                    headers: {Authorization: token}
                })
                // await axios.put(`/api/resorts/${resort._id}`, {...resort, resortimages})
            }else{
                await axios.post('/api/resorts', {...resort, resortimages}, {
                    headers: {Authorization: token}
                })
                // await axios.put('/api/resorts', {...resort, resortimages})
            }
            setCallback(!callback)
            // history.push("/")
            history.goBack();
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: resortimages ? "block" : "none"
    }
    return (
        <div className="create_resort">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={resortimages ? resortimages.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>
            

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="owner_id">Your Resort ID</label>
                    <input type="text" name="owner_id" id="owner_id" required
                    value={resort.owner_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="resortname">Resort Name</label>
                    <input type="resortname" name="resortname" id="resortname" required
                    value={resort.resortname} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" id="phone" required
                    value={resort.phone} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="addressline1">Address Line 1</label>
                    <input type="text" name="addressline1" id="addressline1" required
                    value={resort.addressline1} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="addressline2">Address Line 2</label>
                    <input type="text" name="addressline2" id="addressline2"
                    value={resort.addressline2} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" required
                    value={resort.city} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="state">State</label>
                    <input type="text" name="state" id="state" required
                    value={resort.state} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" required
                    value={resort.country} onChange={handleChangeInput} />
                </div>
                   
                <div className="row">
                    <label htmlFor="zipcode">ZIP Code</label>
                    <input type="number" name="zipcode" id="zipcode" required
                    value={resort.zipcode} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="category">Categories: </label>
                    <select name="category" value={resort.category} onChange={handleChangeInput} >
                        <option value="">Select Resort Category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateResort
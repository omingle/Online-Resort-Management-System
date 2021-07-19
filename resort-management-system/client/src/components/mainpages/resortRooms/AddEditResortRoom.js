import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    roomno: '',
    roomtitle: '',
    roomdescription: '',
    roomcategory: '',
    roomprice: '',
    isdiscount: false,
    discountedprice: '',
    discountnote: '',
    _id: ''
}

function AddEditResortRoom() {
    const state = useContext(GlobalState)
    const [resortRoom, setResortRoom] = useState(initialState)
    const [roomcategories] = state.roomCategoriesAPI.roomcategories
    const [roomimages, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isOwner] = state.userAPI.isOwner
    const [token] = state.token
    const [owner_id, setOwnerID] = useState('');

    const history = useHistory()
    const param = useParams()

    const [rooms] = state.roomsAPI.rooms
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.roomsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            rooms.forEach(room => {
                if(room._id === param.id) {
                    setResortRoom(room)
                    setImages(room.roomimages)
                }
            })
        }else{
            setOnEdit(false)
            setResortRoom(initialState)
            setImages(false)
        }
    }, [param.id, rooms])


    const getOwnerID = async e =>{
        try {
            
            const res = await axios.get('/user/infor', {
                headers: {Authorization: token}
            })
            setOwnerID(res.data._id)
            // alert(res.data._id)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isOwner) return alert("You're not an owner of resort")
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
            if(!isOwner) return alert("You're not an owner of resort")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: roomimages.public_id}, {
                headers: {Authorization: token}
            })

            // await axios.post('/api/destroy', {public_id: roomimages.public_id})

            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setResortRoom({...resortRoom, [name]:value})
    }

    const handleToggleClick = e =>{
        if(document.getElementById("isdiscount").checked === true) {
            document.getElementById("disprice").style.display = "";
            document.getElementById("disnote").style.display = "";
            resortRoom.isdiscount = true;
        }
        else {
            document.getElementById("disprice").style.display = "none";
            document.getElementById("disnote").style.display = "none";
            resortRoom.isdiscount = false;
            resortRoom.discountedprice = 0;
            resortRoom.discountnote = '';
        }
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            // alert(roomimages)
            if(!isOwner) return alert("You're not an owner of resort")
            if(!roomimages) return alert("No Image Uploaded")

            if(onEdit){
                await axios.put(`/api/rooms/${resortRoom._id}`, {...resortRoom, roomimages}, {
                    headers: {Authorization: token}
                })
                // await axios.put(`/api/rooms/${resortRoom._id}`, {...resortRoom, roomimages})
            }else{
                await axios.post('/api/rooms', {...resortRoom, roomimages}, {
                    headers: {Authorization: token}
                })
                // await axios.put('/api/rooms', {...resortRoom, roomimages})
            }
            setCallback(!callback)
            // history.push("/")
            history.goBack();
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: roomimages ? "block" : "none"
    }
    return (
        <div className="create_resort">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={roomimages ? roomimages.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="roomno">Room No.</label>
                    <input type="text" name="roomno" id="roomno" required
                    value={resortRoom.roomno} onChange={handleChangeInput} disabled={onEdit} onFocus={e => getOwnerID()} autoFocus/>
                </div>

                <div className="row">
                    <label htmlFor="roomtitle">Room Title</label>
                    <input type="text" name="roomtitle" id="roomtitle" required
                    value={resortRoom.roomtitle} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="roomdescription">Room Description</label>
                    <textarea type="text" name="roomdescription" id="roomdescription" rows="10" required
                    value={resortRoom.roomdescription} onChange={handleChangeInput}></textarea>
                </div>

                <div className="row">
                    <label htmlFor="roomcategory">Room Category: </label>
                    <select name="roomcategory" value={resortRoom.roomcategory} onChange={handleChangeInput} >
                        <option value="">Select Room Category</option>
                        {
                            roomcategories.map(roomcategory => (
                                roomcategory.owner_id === owner_id ?
                                    <option value={roomcategory._id} key={roomcategory._id}>
                                        {roomcategory.name}
                                    </option>
                                    : ''
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label htmlFor="roomprice">Room Price</label>
                    <input type="number" name="roomprice" id="roomprice" min="1" required
                    value={resortRoom.roomprice} onChange={handleChangeInput} />
                </div>

                <div className="row" style={{display: "flex", justifyContent:"space-between"}}>
                    <label htmlFor="isdiscount">Do you want to give Discount?</label>
                    <label class="switch">
                        <input type="checkbox" name="isdiscount" id="isdiscount" value={resortRoom.isdiscount} onClick={handleToggleClick}/>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div className="row" id="disprice" style={{display:"none"}}>
                    <label htmlFor="discountedprice">Discounted Price</label>
                    <input type="number" name="discountedprice" id="discountedprice" min="0"
                    value={resortRoom.discountedprice} onChange={handleChangeInput} />
                </div>

                <div className="row" id="disnote" style={{display:"none"}}>
                    <label htmlFor="state">Discount Note</label>
                    <input type="text" name="discountnote" id="discountnote"
                    value={resortRoom.discountnote} onChange={handleChangeInput} />
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default AddEditResortRoom
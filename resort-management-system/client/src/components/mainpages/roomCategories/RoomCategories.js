import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function RoomCategories() {
    const state = useContext(GlobalState)
    const [roomCategories] = state.roomCategoriesAPI.roomcategories
    const [roomCategory, setRoomCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.roomCategoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setRoomID] = useState('')
    const [owner_id, setOnwerID] = useState('');

    const createRoomCategory = async e =>{
        e.preventDefault()
        
        try {
            if(onEdit){
                const res = await axios.put(`/room_cat/room_category/${id}`, {name: roomCategory}, {
                    headers: {Authorization: token}
                })
                
                alert(res.data.msg)
            }else{
                
                const res = await axios.post('/room_cat/room_category', {name: roomCategory}, {
                    headers: {Authorization: token}
                })
                
                alert(res.data.msg)
            }
            setOnEdit(false)
            setRoomCategory('')
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    // const getRoomAllCategories = async () =>{
    //     const res = await axios.get('/room_cat/room_category')
    //     setRoomAllCatories(res.data)
    // }
    
    const editRoomCategory = async (id, name) =>{
        setRoomID(id)
        setRoomCategory(name)
        setOnEdit(true)
    }

    const deleteRoomCategory = async id =>{
        try {
            const res = await axios.delete(`/room_cat/room_category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const getOwnerID = async e =>{
        try {
            
            const res = await axios.get('/user/infor', {
                headers: {Authorization: token}
            })
            setOnwerID(res.data._id)
            // alert(res.data._id)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            
            <form onSubmit={createRoomCategory}>
                <label htmlFor="roomCategory">Room Category</label>
                <input type="text" name="roomCategory" value={roomCategory} required
                onChange={e => setRoomCategory(e.target.value)} onFocus={e => getOwnerID()} autoFocus/>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                
                {
                    roomCategories.map(roomCategory => (
                        roomCategory.owner_id === owner_id ?
                            <div className="row" key={roomCategory._id}>
                                <p>{roomCategory.name}</p>
                                <div>
                                    <button onClick={() => editRoomCategory(roomCategory._id, roomCategory.name)}>Edit</button>
                                    <button onClick={() => deleteRoomCategory(roomCategory._id)}>Delete</button>
                                </div>
                            </div>
                        : ''
                    ))
                }
            </div>
        </div>
    )
}

export default RoomCategories
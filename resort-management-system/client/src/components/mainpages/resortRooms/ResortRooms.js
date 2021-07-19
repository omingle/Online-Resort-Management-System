import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import RoomItem from '../utils/roomItem/RoomItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
import {useParams, Link} from 'react-router-dom'


function ResortRooms({ownr_id}) {
    const params = useParams()
    const state = useContext(GlobalState)
    const [rooms, setRooms] = state.roomsAPI.rooms
    const [isOwner] = state.userAPI.isOwner
    const [token] = state.token
    const [callback, setCallback] = state.roomsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [owner_id, setOwnerID] = useState('');

    const handleCheck = (id) =>{
        rooms.forEach(room => {
            if(room._id === id) room.checked = !room.checked
        })
        setRooms([...rooms])
    }

    const deleteRoom = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteRoom = axios.delete(`/api/rooms/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteRoom
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        rooms.forEach(room => {
            room.checked = !isCheck
        })
        setRooms([...rooms])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        rooms.forEach(room => {
            if(room.checked) deleteRoom(room._id, room.roomimages.public_id)
        })
    }
    
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

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters owner_id={params.id} ownr_id={ownr_id}/>
        
        {
            isOwner && 
            <div className="delete-all">
                {/* <button onClick={addRoom}>Add Room</button> */}
                <Link to="/add_room"><button style={{border: "1px solid #2196F3", color: "#2196F3", margin: "0 20px"}} onFocus={e => getOwnerID()} autoFocus>Add Room</button></Link>
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button className="blueBorderButton" onClick={deleteAll}>Delete All</button>
            </div>
        }

        <div className="resorts">
            {
                rooms.map(room => { 
                    if((room.owner_id === params.id) || (room.owner_id === owner_id) || (room.owner_id === ownr_id)) {
                        return <RoomItem key={room._id} room={room}
                        isOwner={isOwner} deleteRoom={deleteRoom} handleCheck={handleCheck} />
                    }
                })
            } 
        </div>

        <LoadMore />
        {rooms.length === 0 && <Loading />}
        </>
    )
}

export default ResortRooms
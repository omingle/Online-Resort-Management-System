import {useContext} from 'react'
import React from 'react'
import {GlobalState} from '../../../../GlobalState'
import BtnRender from './BtnRender'

function RoomItem({room, isOwner, deleteRoom, handleCheck}) {
    const state = useContext(GlobalState)
    const [roomcategories] = state.roomCategoriesAPI.roomcategories

    return (
        <div className="resort_room_card">
            {
                isOwner && <input type="checkbox" checked={room.checked}
                onChange={() => handleCheck(room._id)} />
            }
            <img src={room.roomimages.url} alt="" />

            <div className="resort_box">
                <h2 title={room.roomtitle}>{room.roomtitle}</h2>
                {
                    roomcategories.map(roomcategory => (
                        roomcategory._id === room.roomcategory ?
                            <h3>{roomcategory.name}</h3>
                            : ''
                    ))
                }
                
                <h3>₹ {room.roomprice}</h3>
                <p>{room.roomdescription}</p>
            </div>
            
            
            <BtnRender room={room} deleteRoom={deleteRoom} />
        </div>
    )
}

export default RoomItem
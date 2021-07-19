import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({room, deleteRoom}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [isOwner] = state.userAPI.isOwner
    const addCart = state.userAPI.addCart

    
    return (    
        <div className="row_btn">
            {
                (isAdmin || isOwner) ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteRoom(room._id, room.roomimages.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_room/${room._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(room)}>
                        Book
                    </Link>
                    <Link id="btn_view" to={`/room_detail/${room._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
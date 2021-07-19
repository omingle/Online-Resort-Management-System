import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({resort, deleteResort}) {
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
                    onClick={() =>deleteResort(resort._id, resort.resortimages.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_resort/${resort._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    {/* <Link id="btn_buy" to="#!" onClick={() => addCart(resort)}>
                        Book
                    </Link> */}
                    <Link id="btn_view" to={`/detail/${resort._id}`} style={{width: "100%"}}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
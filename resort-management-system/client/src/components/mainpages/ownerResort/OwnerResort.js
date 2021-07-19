import React, {useState, useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {useParams, Link} from 'react-router-dom'

function OwnerResort() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [resorts] = state.resortsAPI.resorts
    // const [ownerResortID] = state.userAPI.ownerResortID
    const [detailResort, setDetailResort] = useState([])

    useEffect(() =>{
        if(params.id){
            resorts.forEach(resort => {
                if(resort.owner_id === params.id) setDetailResort(resort)
            })
        }
    },[params.id, resorts])

    if(detailResort.length === 0) return null;

    return (
        <>
            <div className="detail-owner-resort">
                <img src={detailResort.resortimages.url} alt="" />
                <div className="box-detail box-detail-owner">
                    {/* <div className="row"> */}
                        <h2>{detailResort.resortname}</h2>
                        <h6>Owner #ID: {detailResort.owner_id}</h6>
                    {/* </div> */}
                    <span>{detailResort.addressline1 + "," }</span><br/>
                    <span>{detailResort.addressline2 + "," }</span><br/>       {/* used rate instead of price */}
                    <span>{detailResort.city + ", " + detailResort.state + ", "}</span><br/>
                    <span>{detailResort.country + " - " + detailResort.zipcode + "."}</span>
                    <p>Phone: {detailResort.phone}</p>
                    
                    <div className="roomsBtn" style={{width:"50%"}}>
                        <Link id="roomsEditBtn" to={`/edit_resort/${detailResort._id}`}>
                            Edit Resort Details
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerResort
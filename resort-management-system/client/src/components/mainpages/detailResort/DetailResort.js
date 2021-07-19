import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ResortItem from '../utils/resortItem/ResortItem'
import ResortRooms from '../resortRooms/ResortRooms'

function DetailResort() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [resorts] = state.resortsAPI.resorts
    // const addCart = state.userAPI.addCart
    const [detailResort, setDetailResort] = useState([])
    const [categories] = state.categoriesAPI.categories

    useEffect(() =>{
        if(params.id){

            resorts.forEach(resort => {
                if(resort._id === params.id) setDetailResort(resort)
            })
        }
    },[params.id, resorts])

    if(detailResort.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailResort.resortimages.url} alt="" />
                <div className="box-detail box-detail-user">
                    <div className="row">
                        <h2>{detailResort.resortname}</h2>
                        {/* <h6>#id: {detailResort.owner_id}</h6> */}
                    </div>
                    {
                        categories.map(category => (
                            detailResort.category === category._id ? 
                            <h6>{category.name}</h6>
                            : ''
                        ))
                    }
                    
                    <h5>{detailResort.addressline1 + ", " + detailResort.addressline2}</h5>        {/* used rate instead of price */}
                    <h5>{detailResort.city + ", " + detailResort.state + ", " + detailResort.country + " - " + detailResort.zipcode + "."}</h5>
                    <h6>{detailResort.phone}</h6>
                    {/* <Link to="/cart" className="cart"
                    onClick={() => addCart(detailResort)}>
                        Buy Now
                    </Link> */}
                    <Link to={`/roomsof/${detailResort.owner_id}`} className="roomsBtn">View and Book Rooms</Link>
                </div>
            </div>
            <hr /><br/>  
            <div>
                <h1 style={{textAlign:"center"}}>Rooms available</h1>
                <ResortRooms ownr_id={detailResort.owner_id}/>
            </div>
            <br/>
            <br/>
            <hr />
            <br/>
            <div>
                <h1 style={{textAlign:"center", color:"rgb(3, 165, 206)"}}>Similar Resorts</h1>
                <div className="resorts">
                    {
                        resorts.map(resort => {
                            return resort.category === detailResort.category 
                                ? <ResortItem key={resort._id} resort={resort} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailResort
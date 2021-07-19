import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import RoomItem from '../utils/roomItem/RoomItem'


function DetailResortRoom() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [rooms] = state.roomsAPI.rooms
    const addCart = state.userAPI.addCart
    const [detailRoom, setDetailRoom] = useState([])
    const [roomcategories] = state.roomCategoriesAPI.roomcategories
    
    // const initialState = {
    //     checkindate: '',
    //     checkoutdate: ''
    // }
    
    // const [dates, setDates] = useState(initialState)

    // const handleChangeInput = e =>{
    //     const {name, value} = e.target
    //     setDates({...dates, [name]:value})

        // alert((new Date(value)).isLaterDate(new Date()));
        
        // if(name === "checkoutdate") {
            
        //     if((new Date(value)).isLaterDate(new Date(dates.checkindate))) {
        //         alert("Please select valid dates");
        //     }
        //     else {
        //         setDates({...dates, [name]:value})
        //     }
        // }
        // else {
        //     setDates({...dates, [name]:value})
        // }
        // alert(dates.checkindate + " - " + dates.checkoutdate);
        
    // }

    // Date.prototype.isLaterDate = function(pDate) {
    //     return (
    //       this.getFullYear() >= pDate.getFullYear() &&
    //       this.getMonth() >= pDate.getMonth() &&
    //       this.getDate() >= pDate.getDate()
    //     );
    //   }

    useEffect(() =>{
        if(params.id){

            rooms.forEach(room => {
                if(room._id === params.id) setDetailRoom(room)
            })
        }
    },[params.id, rooms])

    if(detailRoom.length === 0) return null;

    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth()+1; //January is 0!
    // var yyyy = today.getFullYear();
    // if(dd<10){
    //         dd='0'+dd
    //     } 
    //     if(mm<10){
    //         mm='0'+mm
    //     } 

    // today = yyyy+'-'+mm+'-'+dd;


    // var minCout = new Date(dates.checkindate);
    // var ddd = minCout.getDate();
    // var mmm = minCout.getMonth()+1; //January is 0!
    // var yyyyy = minCout.getFullYear();
    // if(ddd<10){
    //         ddd='0'+ddd
    //     } 
    //     if(mmm<10){
    //         mmm='0'+mmm
    //     } 

    // minCout = yyyyy+'-'+mmm+'-'+ddd;


    return (
        <>
            <div className="detail-room">
                <img src={detailRoom.roomimages.url} alt="" />
                <div className="box-detail-room">
                    <h5>Room No.: {detailRoom.roomno}</h5>
                    <div className="row">
                        <h2>{detailRoom.roomtitle}</h2>
                        {/* <h6>#id: {detailRoom.owner_id}</h6> */}
                    </div>
                    <p>{detailRoom.roomdescription}</p>        {/* used rate instead of price */}
                    {/* <h3>{detailRoom.roomcategory}</h3> */}
                    {
                        roomcategories.map(roomcategory => (
                            roomcategory._id === detailRoom.roomcategory ?
                                <p className="roomCat">Room Category: <b>{roomcategory.name}</b></p>
                                : ''
                        ))
                    }
                    
                    {
                        (detailRoom.isdiscount) ? 
                        <>
                            <strike><p>₹ {detailRoom.roomprice}</p></strike>
                            <h3>₹ {detailRoom.discountedprice}</h3>
                            <p className="discountNote">{detailRoom.discountnote}</p>
                        </>
                        :
                        <>
                            <h3>₹ {detailRoom.roomprice}</h3>
                        </>
                    }

                    { 
                        (detailRoom.isbooked) ? 
                        <>
                            <h3>Room is currently not available. Please book other room or try after some time. Thank You.</h3>
                        </>
                        : 
                        <>
                            {/* <div>
                                <label htmlFor="checkindate">Check-in Date: </label>
                                <input type="date" id="checkindate" name="checkindate" 
                                onChange={handleChangeInput} min={today} max="2025-12-31" required/>
                                <br/>
                                <label htmlFor="checkoutdate">Check-out Date: </label>
                                <input type="date" id="checkoutdate" name="checkoutdate"
                                onChange={handleChangeInput} min={minCout} max="2025-12-31" required/>
                            </div> */}
                            <Link to="/cart" className="roomBookBtn"
                            onClick={() => addCart(detailRoom)}>
                                Book Now
                            </Link>
                        </>
                    }
                    
                </div>
            </div>

            <div>
                <h2>Similar Rooms</h2>
                <div className="resorts">
                    {
                        rooms.map(room => {
                            return room.roomcategory === detailRoom.roomcategory 
                                ? <RoomItem key={room._id} room={room} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailResortRoom
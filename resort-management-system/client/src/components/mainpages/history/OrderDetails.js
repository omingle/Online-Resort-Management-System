import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <div>
                <h3>Booked by: </h3>{orderDetails.address.recipient_name}
                <h3>Address: </h3>{orderDetails.address.line1 + ", " + orderDetails.address.line2 + ", " + orderDetails.address.city + ", "} <br/> {orderDetails.address.state  + " - " + orderDetails.address.postal_code}
            </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>{orderDetails.address.line1 + ", "} <br/> {orderDetails.address.line2 + ", "} <br/> {orderDetails.address.city + ", "} <br/> {orderDetails.address.state}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table> */}

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Room Details</th>
                        <th>Number of Rooms booked</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.roomimages.url} alt="" /></td>
                            <td>Room No. : {item.roomno} <br/> {item.roomtitle} <br/>{item.roomdescription}</td>
                            <td>{item.quantity}</td>
                            <td>₹ {item.roomprice}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails
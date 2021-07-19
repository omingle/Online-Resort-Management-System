import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [isOwner] = state.userAPI.isOwner
    const [token] = state.token
    const [resorts] = state.resortsAPI.resorts
    var resortName;

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
                else if(isOwner){
                    const res = await axios.get('/user/ownerhistory', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    },[token, isAdmin, isOwner, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>

            {isAdmin ? '' : <h4>You have {history.length} Booking(s)</h4>}
            
            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        {isOwner ? '' : <th>Resort Name</th>}
                        <th>Date of Booking</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            
                            <tr key={items._id}>
                                {items.cart.map(item =>(
                                        resorts.forEach(resort => {
                                            if(resort.owner_id === item.owner_id) {
                                                {resortName = resort.resortname}
                                            }
                                            // alert(resort.owner_id + " " + resort.resortname + " ---> " + item.owner_id);
                                        }
                                    )))}
                                <td>{items.paymentID}</td>
                                {isOwner ? '' : <td>{resortName}</td>}
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
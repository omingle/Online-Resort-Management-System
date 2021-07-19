import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.roomprice)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    // const increment = (id) =>{
    //     cart.forEach(item => {
    //         if(item._id === id){
    //             item.quantity += 1
    //         }
    //     })

    //     setCart([...cart])
    //     addToCart(cart)
    // }

    // const decrement = (id) =>{
    //     cart.forEach(item => {
    //         if(item._id === id){
    //             item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
    //         }
    //     })

    //     setCart([...cart])
    //     addToCart(cart)
    // }

    const removeRoom = id =>{
        if(window.confirm("Do you want to remove this room?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully booked room(s).")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div>
            {
                cart.map(room => (
                    <div className="detail-room cart" key={room._id}>
                        <img src={room.roomimages.url} alt="" />

                        <div className="box-detail">
                            <h2>{room.roomtitle}</h2>

                            <h3>₹ {room.roomprice}</h3>
                            <p>{room.roomdescription}</p>
                            {/* <p>{room.content}</p> */}

                            <div className="amount">
                                {/* <button onClick={() => decrement(room._id)}> - </button> */}
                                {/* <span>{room.quantity}</span> */}
                                {/* <button onClick={() => increment(room._id)}> + </button> */}
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeRoom(room._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h2>Total: ₹ {total}</h2>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
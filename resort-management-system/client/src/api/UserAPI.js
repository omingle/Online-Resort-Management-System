import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    const [ownerResortID, setResortID] = useState()

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    
                    if(res.data.role === 1)
                    {
                        setIsAdmin(true)
                    }
                    else if (res.data.role === 2){
                        setIsOwner(true)
                        setResortID(res.data._id)
                    }
                    else {
                        setIsOwner(false)
                        setIsAdmin(false)
                    }
                    
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])


    const addCart = async (room) => {
        if(!isLogged) return alert("Please login to continue booking")

        const check = cart.every(item =>{
            return item._id !== room._id
        })

        if(check){
            setCart([...cart, {...room, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...room, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This room has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isOwner: [isOwner, setIsOwner],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        ownerResortID: [ownerResortID, setResortID]
    }
}

export default UserAPI
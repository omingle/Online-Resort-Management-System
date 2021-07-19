import {useState, useEffect} from 'react'
import axios from 'axios'

function RoomCategoriesAPI() {
    const [roomcategories, setRoomCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getRoomCategories = async () =>{
            const res = await axios.get('/room_cat/room_category')
            setRoomCategories(res.data)
        }

        getRoomCategories()
    },[callback])
    return {
        roomcategories: [roomcategories, setRoomCategories],
        callback: [callback, setCallback]
    }
}

export default RoomCategoriesAPI
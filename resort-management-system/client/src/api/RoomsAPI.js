import {useState, useEffect} from 'react'
import axios from 'axios'


function RoomsAPI() {
    const [rooms, setRooms] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getRooms = async () => {
            const res = await axios.get(`/api/rooms?limit=${page*9}&${category}&${sort}&roomtitle[regex]=${search}`)
            setRooms(res.data.rooms)
            setResult(res.data.result)
        }
        getRooms()
    },[callback, category, sort, search, page])
    
    return {
        rooms: [rooms, setRooms],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default RoomsAPI
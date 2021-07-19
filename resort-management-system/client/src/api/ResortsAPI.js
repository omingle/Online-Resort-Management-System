import {useState, useEffect} from 'react'
import axios from 'axios'


function ResortsAPI() {
    const [resorts, setResorts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getResorts = async () => {
            const res = await axios.get(`/api/resorts?limit=${page*9}&${category}&${sort}&resortname[regex]=${search}`)
            setResorts(res.data.resorts)
            setResult(res.data.result)
        }
        getResorts()
    },[callback, category, sort, search, page])
    
    return {
        resorts: [resorts, setResorts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default ResortsAPI
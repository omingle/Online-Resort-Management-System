import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ResortItem from '../utils/resortItem/ResortItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Resorts() {
    const state = useContext(GlobalState)
    const [resorts, setResorts] = state.resortsAPI.resorts
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.resortsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        resorts.forEach(resort => {
            if(resort._id === id) resort.checked = !resort.checked
        })
        setResorts([...resorts])
    }

    const deleteResort = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteResort = axios.delete(`/api/resorts/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteResort
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        resorts.forEach(resort => {
            resort.checked = !isCheck
        })
        setResorts([...resorts])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        resorts.forEach(resort => {
            if(resort.checked) deleteResort(resort._id, resort.resortimages.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="resorts">
            {
                resorts.map(resort => {
                    return <ResortItem key={resort._id} resort={resort}
                    isAdmin={isAdmin} deleteResort={deleteResort} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {resorts.length === 0 && <Loading />}
        </>
    )
}

export default Resorts
import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters({owner_id, ownr_id}) {
    const state = useContext(GlobalState)
    const [roomcategories] = state.roomCategoriesAPI.roomcategories
    const [ownerResortID] = state.userAPI.ownerResortID
    const [category, setCategory] = state.roomsAPI.category
    const [sort, setSort] = state.roomsAPI.sort
    const [search, setSearch] = state.roomsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Rooms</option>
                    {
                        roomcategories.map(category => (
                            ((category.owner_id === ownerResortID) || (category.owner_id === owner_id) || (category.owner_id === ownr_id)) ?
                                <option value={"category=" + category.name} key={category._id}>
                                    {category.name}
                                </option>
                                : ''
                        ))

                        // roomcategories.map(roomcategory => (
                        //     roomcategory.owner_id === owner_id ?
                        //         <option value={roomcategory._id} key={roomcategory._id}>
                        //             {roomcategory.name}
                        //         </option>
                        //         : ''
                        // ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Search Room Names Here..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            
            {/* We can use this for only lowercase : setSearch(e.target.value.toLowerCase()) */}

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    {/* <option value='sort=-sold'>Best sales</option> */}
                    <option value='sort=-roomprice'>Price: Hight-Low</option>
                    <option value='sort=roomprice'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
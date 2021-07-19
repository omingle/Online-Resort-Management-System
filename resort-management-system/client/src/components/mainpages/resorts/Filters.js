import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.resortsAPI.category
    const [sort, setSort] = state.resortsAPI.sort
    const [search, setSearch] = state.resortsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Resorts</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Search Resort Names Here..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />
            
            {/* We can use this for only lowercase : setSearch(e.target.value.toLowerCase()) */}

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-rate'>Price: Hight-Low</option>
                    <option value='sort=rate'>Price: Low-Hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
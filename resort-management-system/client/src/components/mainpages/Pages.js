import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Resorts from './resorts/Resorts'
import DetailResort from './detailResort/DetailResort'
import Login from './auth/Login'
import RegisterResort from './auth/RegisterResort'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import RoomCategories from './roomCategories/RoomCategories'
import ResortRooms from './resortRooms/ResortRooms'
import CreateResort from './createResort/CreateResort'

import {GlobalState} from '../../GlobalState'
import OwnerResort from './ownerResort/OwnerResort'
import AddEditResortRoom from './resortRooms/AddEditResortRoom'
import DetailResortRoom from './resortRooms/DetailResortRoom'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [isOwner] = state.userAPI.isOwner


    return (
        <Switch>
            {
                isOwner ? <Route path="/" exact component={OwnerResort} /> : <Route path="/" exact component={Resorts} />
            }
            
            
            <Route path="/detail/:id" exact component={DetailResort} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register-resort" exact component={isLogged ? NotFound : RegisterResort} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                        
            {/* <Route path="/create_resort" exact component={isAdmin ? CreateResort : NotFound} /> */}
            <Route path="/edit_resort/:id" exact component={isAdmin ? CreateResort : isOwner ? CreateResort : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />

            <Route path="/owner_resort/:id" exact component={isOwner ? OwnerResort : NotFound} />   
            <Route path="/your_rooms" exact component={ResortRooms} />   
            <Route path="/roomsof/:id" exact component={ResortRooms} />   
            <Route path="/add_room" exact component={isOwner ? AddEditResortRoom : NotFound} />   
            <Route path="/edit_room/:id" exact component={isOwner ? AddEditResortRoom : NotFound} />
            <Route path="/room_category" exact component={isOwner ? RoomCategories : NotFound} />   
            <Route path="/room_detail/:id" exact component={DetailResortRoom} />  Add this functionality

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
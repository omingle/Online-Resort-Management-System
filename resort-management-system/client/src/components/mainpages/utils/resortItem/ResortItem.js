import React from 'react'
import {Link} from 'react-router-dom'
import BtnRender from './BtnRender'

function ResortItem({resort, isAdmin, deleteResort, handleCheck}) {

    return (
        <div className="resort_card">
            {
                isAdmin && <input type="checkbox" checked={resort.checked}
                onChange={() => handleCheck(resort._id)} />
            }
            <img src={resort.resortimages.url} alt="" />

            <div className="resort_box">
                <Link id="btn_view" to={`/detail/${resort._id}`}><h2 title={resort.resortname}>{resort.resortname}</h2></Link>
                <span>{resort.addressline1 + ", " + resort.addressline2 + ", "}</span>        {/* used rate instead of price */}
                <span>{resort.city + ", " + resort.state + ", " + resort.country + " - " + resort.zipcode}</span><br />
                <p>{resort.phone}</p>
            </div>
            <BtnRender resort={resort} deleteResort={deleteResort} />
        </div>
    )
}

export default ResortItem
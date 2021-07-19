import React, {useState, useContext} from 'react'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import csc from 'country-state-city'
import {GlobalState} from '../../../GlobalState'

function RegisterResort() {

    const [user, setUser] = useState({
        name:'', resortname:'', phone:'', category:'', addressline1:'', addressline2:'', country:'', state:'', city:'', zipcode:'', email:'', password: ''
    })

    
    const [resortimages, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    
    function checkConfirmPassword(e) {
        if(user.password !== e.target.value)
            document.getElementById("confpassword").style.borderColor = "#ff0000";
        else
            document.getElementById("confpassword").style.borderColor = "rgb(3, 165, 206)";
    }

    const registerResortSubmit = async e =>{
        e.preventDefault()
        try {
            if(!resortimages) return alert("No Image Uploaded")

            const countryCode = user.country;
            user.country = csc.getCountryByCode(user.country).name;
            
            const sts = csc.getStatesOfCountry(countryCode)
            for (let i = 0; i < sts.length; i++) {
                if(sts[i].isoCode === user.state)
                    user.state = sts[i].name;
            }
            setUser({...user})
            
            const res = await axios.post('/user/register-resort', {...user, resortimages})    // save owner info in users model
            // await axios.post('/user/register-resort', {...user})    // save resort infro in resort model

            localStorage.setItem('firstLogin', true)
            
            const res2 = await axios.get('/user/infor', {
                headers: {Authorization: res.data.accesstoken}
            })

            if(res2.data.role === 2) {
                window.location.href = `/owner_resort/${res2.data._id}`;
            }
            else {
                window.location.href = "/";
            }

            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            
            // alert(file)

            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    
    const styleUpload = {
        display: resortimages ? "block" : "none"
    }


    const handleDestroy = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy', {public_id: resortimages.public_id})
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        // <div className="login-page">
        //     <form onSubmit={registerSubmit}>
        //         <h2>Register</h2>
        //         <input type="text" name="name" required
        //         placeholder="Name" value={user.name} onChange={onChangeInput} />

        //         <input type="email" name="email" required
        //         placeholder="Email" value={user.email} onChange={onChangeInput} />

        //         <input type="password" name="password" required autoComplete="on"
        //         placeholder="Password" value={user.password} onChange={onChangeInput} />

        //         <div className="row">
        //             <button type="submit">Register</button>
        //             <Link to="/login">Login</Link>
        //         </div>
        //     </form>
        // </div>
        
        <div className="login-page wrapper">
            <div className="title-text">
                <div className="title signup">Register Your Resort</div>
            </div>
            <div className="form-container">
                <div className="form-inner">
                    <form onSubmit={registerResortSubmit} className="signup">
                        <div className="field">
                            <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <input type="text" name="resortname" placeholder="Resort Name" value={user.resortname} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <select name="category" value={user.category} onChange={onChangeInput} >
                                <option value="">Select Resort Category</option>
                                {
                                    categories.map(category => (
                                        <option value={category._id} key={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <input type="tel" name="phone" placeholder="Phone No.: 1234567890" pattern="[0-9]{10}" value={user.phone} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <input type="text" name="addressline1" placeholder="Address Line 1" value={user.addressline1} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <input type="text" name="addressline2" placeholder="Address Line 2" value={user.addressline2} onChange={onChangeInput} />
                        </div>
                        <div className="flex-field">
                            <div className="field" style={{marginRight: "15px"}}>
                                <select name="country" value={user.country} onChange={onChangeInput} required>
                                    <option value="-1" defaultValue>Select Country</option>
                                {
                                    csc.getAllCountries().map((country) => <option value={country.isoCode} key={country.isoCode}>{country.name}</option>)
                                }
                                </select>
                            </div>
                            <div className="field">
                                <select name="state" value={user.state} onChange={onChangeInput} required>
                                    <option value="-1" defaultValue>Select State</option>
                                {
                                    csc.getStatesOfCountry(user.country).map((state) => <option value={state.isoCode} key={state.isoCode}>{state.name}</option>)
                                }
                                </select>
                            </div>
                        </div>
                        <div className="flex-field">
                            <div className="field" style={{marginRight: "15px"}}>
                                <select name="city" value={user.city} onChange={onChangeInput} required>
                                    <option value="-1" defaultValue>Select City</option>
                                {
                                    csc.getCitiesOfState(user.country, user.state).map((city) => <option value={city.name} key={city.name}>{city.name}</option>)
                                }
                                </select>
                            </div>
                            <div className="field">
                                <input type="text" name="zipcode" placeholder="ZIP Code" pattern="[0-9]{6}" value={user.zipcode} onChange={onChangeInput} required />
                            </div>
                        </div>
                        <div className="field">
                            <input type="email" name="email" placeholder="Email" value={user.email} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" value={user.password} onChange={onChangeInput} autoComplete="on" required />
                        </div>
                        <div className="field">
                            <input type="password" id="confpassword" name="confpassword" placeholder="Confirm Password" onChange={checkConfirmPassword} required />
                        </div>

                        <div className="upload_reg" title="Upload Resort Image">
                            <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                            {
                                loading ? <div id="file_img"><Loading /></div>

                                :<div id="file_img" style={styleUpload}>
                                    <img src={resortimages ? resortimages.url : ''} alt=""/>
                                    <span onClick={handleDestroy}>X</span>
                                </div>
                            }
                            
                        </div>


                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterResort
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login() {
    // const [user, setUser] = useState({
    //     email:'', password: ''
    // })

    const [user, setUser] = useState({
        name:'', email:'', password: ''
    })
    
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
    
    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {...user})
            
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

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const signupBtnClick = () => {
        document.querySelector("form.login").style.marginLeft = "-50%";
        // document.querySelector(".title-text .login").style.marginLeft = "-50%";
    }

    const loginBtnClick = () => {
        document.querySelector("form.login").style.marginLeft = "0%";
        // document.querySelector(".title-text .login").style.marginLeft = "0%";
    }

    const signupLinkClick = () => {
        document.querySelector("label.signup").click();
        return false;
    }

    return (
        // <div className="login-page">
        //     <form onSubmit={loginSubmit}>
        //         <h2>Login</h2>
        //         <input type="email" name="email" required
        //         placeholder="Email" value={user.email} onChange={onChangeInput} />

        //         <input type="password" name="password" required autoComplete="on"
        //         placeholder="Password" value={user.password} onChange={onChangeInput} />

        //         <div className="row">
        //             <button type="submit">Login</button>
        //             <Link to="/register">Register</Link>
        //         </div>
        //     </form>
            
        // </div>
        <div className="login-page wrapper">
            <div className="title-text">
                {/* <div className="title login">Login</div>
                <div className="title signup">Register</div> */}
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input type="radio" name="slide" id="login" defaultChecked />
                    <input type="radio" name="slide" id="signup" />
                    <label htmlFor="login" className="slide login" onClick={loginBtnClick}>Login</label>
                    <label htmlFor="signup" className="slide signup" onClick={signupBtnClick}>Register</label>
                    <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                    <form onSubmit={loginSubmit} className="login">
                        <div className="field">
                            <input type="email" name="email" placeholder="Email" value={user.email} onChange={onChangeInput} required />
                        </div>
                        <div className="field">
                            <input type="password" name="password" placeholder="Password" autoComplete="on" value={user.password} onChange={onChangeInput} required />
                        </div>
                        <div className="pass-link">
                            <Link to="#">Forgot password?</Link>
                        </div>
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Login" />
                        </div>
                        <div className="signup-link">
                            Not a member? <Link to="#" onClick={signupLinkClick}>Register now</Link>
                        </div>
                    </form>
                    <form onSubmit={registerSubmit} className="signup">
                        <div className="field">
                            <input type="text" name="name" placeholder="Name"  value={user.name} onChange={onChangeInput} required />
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
                        <div className="field btn">
                            <div className="btn-layer"></div>
                            <input type="submit" value="Register" />
                        </div>
                        <div className="signup-as-owner-link">
                            Want to Register Your Resort?<br/> <Link to="/register-resort" onClick={signupLinkClick}>Register as Resort Owner</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
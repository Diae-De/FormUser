import React, { useRef, useState } from 'react'
import './ResetPass.css'
import image from "../../images/devicesbackground.jpg"
import { Link } from 'react-router-dom';
import fb from '../../firebase'

function ResetPass() {

    const Userform = useRef();

    const [email,setEmail] = useState("")

    const resetPassword = (e) =>{
        e.preventDefault()
        fb.auth().sendPasswordResetEmail(email).then(()=>{
            alert("Password reset email sent")
        }).catch((err)=>{
            alert(err.message)
        })
    }
  return (
    <div className="pass-container">
        <div className="reset-pass">
            <h1 className="reset-pass-head">Reset Password</h1>
            <form ref={Userform} onSubmit={resetPassword} className="form-for-all-users">
                <div className="reset-pass-form">
                    <input className="reset-pass-input" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email" autoFocus/>
                    <button className="reset-pass-button">Reset Password</button>
                    <p><Link to="/signin" className="link">Login</Link></p>
                </div>
            </form>
        </div>
        <div className="user-img-login">
                <img src={image}/>
        </div>
    </div>
  )
}

export default ResetPass
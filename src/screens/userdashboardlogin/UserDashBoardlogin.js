import React, { useEffect, useRef, useState } from 'react'
import "./UserDashBoardlogin.css"
import image from "../../images/devicesbackground.jpg"
import { Link, useNavigate } from 'react-router-dom';
import fb from '../../firebase'

function UserDashBoardlogin() {

    const Userform = useRef();

    const navigate = useNavigate()
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [passwordErr,setPasswordWErr] = useState("")
    const [emailErr,setEmailErr] = useState("")
    const [radioChecked,setRadioChecked] = useState("")

    const clearErr = ()=>{
      setPasswordWErr("")
      setEmailErr("")
  }

    const handleLogin = (e)=>{
      clearErr()
      e.preventDefault()
      fb.auth().signInWithEmailAndPassword(email,password).catch((err)=>{
        switch(err.code) {
          case 'auth/invalid-email':
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailErr(err.message)
            break;

          case "auth/wrong-password":
            setPasswordWErr(err.message)
            break;
        }
      })
    }

    const authListener = ()=>{
      fb.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          setUser(user)
          navigate("/")
        }else setUser("")
      })
    }

    useEffect(()=>{
      authListener()
    },[])

  return (
    <div>
    <div className="userDashboard">
        <div className="userForm">
        <h1 className="login-head">Sign In</h1>
            <form ref={Userform} onSubmit={handleLogin} className="form-for-all-users">
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="login-input" placeholder="Enter Your Email" required autoFocus/>
                  <p className="errmsg">{emailErr}</p>
                  <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="login-input" placeholder="Enter Your Password" required/>
                  <p className="errmsg">{passwordErr}</p>
                  <button className="login-button">Sign In</button>
            </form>
            <p>Create an account? <Link to="/signup" className="link">Sign up</Link></p>
            <p>Forgot your password? <Link to="/resetpass" className="link">Reset Password</Link></p>
            <p>Sign In As Admin? <Link to="/manager" className="link">Sign in</Link></p>
        </div>
        <div className="user-img-login">
          <img src={image}/>
        </div>
    </div>
</div>
  )
}

export default UserDashBoardlogin
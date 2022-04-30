import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import image from "../../images/devicesbackground.jpg"
import fb from '../../firebase';
import './ManagerAccount.css';
import {AiOutlineUser} from "react-icons/ai"
import {MdPassword} from "react-icons/md"

function ManagerAccount() {

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
        navigate("/dashboard")
      }else setUser("")
    })
  }

  useEffect(()=>{
    authListener()
  },[])

  return (
    <div>
    <div className="managerDashboard">
        <div className="managerForm">
        <h1 className="login-head">Administrator</h1>
            <form ref={Userform} onSubmit={handleLogin} className="form-for-all-users">
              <div className="usericon-wrap">
                <AiOutlineUser className="usericon"/>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="login-input" placeholder="Enter Your Email" required autoFocus/>
              </div>
                  <p className="errmsg">{emailErr}</p>
              <div className="usericon-wrap">
                <MdPassword className="usericon"/>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="login-input" placeholder="Enter Your Password" required/>
              </div>
                  <p className="errmsg" style={{width:"60%"}}>{passwordErr}</p>
                  {email === "admin@gmail.com" ? <button className="login-button">Sign In</button> : ""}
                  
            </form>
            <p>Create an account? <Link to="/signup" className="link">Sign up</Link></p>
            <p>Forgot your password? <Link to="/resetpass" className="link">Reset Password</Link></p>
        </div>
        <div className="user-img-login">
          <img src={image}/>
        </div>
    </div>
</div>
  )
}

export default ManagerAccount
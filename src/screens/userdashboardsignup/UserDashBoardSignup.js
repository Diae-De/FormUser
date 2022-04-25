import React, { useEffect, useRef, useState } from 'react'
import './UserDashBoardSignup.css'
import image from "../../images/devicesbackground.jpg"
import { Link, useNavigate} from 'react-router-dom'
import fb from '../../firebase'

function UserDashBoardScreen() {
    const Userform = useRef()
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [user,setUser] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [passwordErr,setPasswordWErr] = useState("")
    const [emailErr,setEmailErr] = useState("")

    const clearErr = ()=>{
        setPasswordWErr("")
        setEmailErr("")
    }

    const navigate = useNavigate()

    const handleSignin = (e)=>{
      clearErr()
      e.preventDefault()
      fb.auth().createUserWithEmailAndPassword(email,password).then((resp)=>{
        return fb.firestore().collection('users').doc(resp.user.uid).set({
          email:email,
          firstname:firstname,
          lastname:lastname,
          createdAt: new Date()
        })
      }).catch((err)=>{
        switch(err.code) {
          case 'auth/email-already-in-use':
          case "auth/invalid-email":
            setEmailErr(err.message)
            break;

          case "auth/weak-password":
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
          navigate("/signin")
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
            <h1 className="signup-head">Sign Up</h1>
                <form ref={Userform} onSubmit={handleSignin} className="form-for-all-users">
                      <input type="text" name="firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)} className="signupe-input" placeholder="Enter Your First Name" autoFocus required/>
                      <input type="text" name="lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)}className="signupe-input" placeholder="Enter Your Last Name" required/>
                      <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="signupe-input" placeholder="Enter Your Email" required/>
                      <p className="errmsg">{emailErr}</p>
                      <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="signupe-input" placeholder="Enter Your Password" required/>
                      <p className="errmsg">{passwordErr}</p>
                      <button className="signup-button">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/signin" className="link">Login</Link></p>
            </div>
            <div className="user-img-signup">
              <img src={image}/>
            </div>
        </div>
    </div>
  )
}

export default UserDashBoardScreen
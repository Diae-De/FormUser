import React, { useEffect, useRef, useState } from 'react'
import "./HomeStyle.css"
import {db} from "../../firebase"
import fb from "../../firebase"
import auth from "../../firebase"
import { useNavigate } from 'react-router-dom';
import image from "../../images/resaux.jpg"

function HomeScreen() {

  const form = useRef();
  const navigate = useNavigate()
  const [user,setUser] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [drop,setDrop] = useState("")
  const [tell,setTell] = useState("")
  const [type,setType] = useState("")
  const [desc,setDesc] = useState("")
  const [unic,setUnic] = useState(randomString(5))
  const [etat,setEtat] = useState("")
  const [date,setDate] = useState("")

  function randomString(string_length) {
    var random_string = ""
    var character_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < string_length; i++) {
      random_string += character_set.charAt(Math.floor(Math.random() * character_set.length))
    }
    return random_string
  }

  const handleFormSubmit = (e)=>{
    e.preventDefault()
    fb.firestore().collection('users').doc(user.uid).update({
        drop:drop,
        tell:tell,
        type:type,
        etat:etat,
        desc:desc,
        unic:unic,
        date:date,
      })
      navigate("/")
    }
  

  const authListener = ()=>{
    fb.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        setUser(user)
      }else {setUser("")
      navigate("/signin")}
    })
  }

  useEffect(()=>{
    authListener()
  },[])

  return (
    <div className="Wrapflex">
        <h1>Let us know More about you!</h1>
    <div className="home-form">
        <form ref={form} onSubmit={handleFormSubmit} className="fillup-form">
        <select name="drop" className="select-drop" value={drop} onChange={(e)=>setDrop(e.target.value)} required>
          <option value="" disabled>Chose Your Plane</option>
          <option value="Society">Society</option>
          <option value="Person">Person</option>
        </select>
        <input onChange={(e)=>setTell(e.target.value)} className="inputUser" value={tell} type="tel" name="tell" placeholder="Enter Your Phone Number" onKeyPress={
          (event) => {if (!/[0-9]/.test(event.key)) {
          event.preventDefault();}}} required/>
        <select name="type" className="select-typemat" value={type} onChange={(e)=>setType(e.target.value)} required>
        <option value="" disabled>Chose Your Material</option>
          <option value="Laptop" >Laptop</option>
          <option value="Descktop">Descktop</option>
          <option value="Phone">Phone</option>
          <option value="Console">Console</option>
        </select>  
        <select name="etat"  className="select-etat" value={etat} onChange={(e)=>setEtat(e.target.value)} required>
        <option value="" disabled>Chose Your State</option>
          <option value="Working" >Working</option>
          <option value="Broken">Broken</option>
        </select> 
        <textarea onChange={(e)=>setDesc(e.target.value)} className="txtAreaHome" value={desc} name="des" rows="7" placeholder="Problem Description" required></textarea> 
        <input onChange={(e)=>setDate(e.target.value)} className="inputUser" value={date} type="date" name="date" required/>
        <input type="text" className="inputUser" name="unic" value={unic} readOnly/>
        <button type="submit" className="btn-submit">Submit</button>
        </form>
    </div>
    </div>
  )
}

export default HomeScreen
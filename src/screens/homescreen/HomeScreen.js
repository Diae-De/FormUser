import React, { useRef, useState } from 'react'
import "./HomeStyle.css"
import {db} from "../../firebase"
import { useNavigate } from 'react-router-dom';

function HomeScreen() {

  const form = useRef();
  const navigate = useNavigate()

  function randomString(string_length) {
    var random_string = ""
    var character_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < string_length; i++) {
      random_string += character_set.charAt(Math.floor(Math.random() * character_set.length))
    }
    return random_string
  }

  const initialFieldValues = {
    drop :"",
    nome:"",
    email:"",
    tell:"",
    type:"",
    etat:"",
    des:"",
    date:"",
    unic:randomString(5),
  }

  const [values,setValues]= useState(initialFieldValues)

  const handleInputChange = (e)=>{
    const {name,value} = e.target
    setValues({...values,[name]:value})
  }


  const handleFormSubmit = (e)=>{
    e.preventDefault()
    db.collection("users").add({name:values.nome,email:values.email,tell:values.tell,type:values.type,etat:values.etat,des:values.des,date:values.date,unic:values.unic})
    .then(()=>{
      alert("Enregistrement effectué avec succès")
    })
    .catch((error)=>{
      alert(error.message)
    })
    navigate("/dashboard")
  }  

  return (
    <div className="home-form">
        <form ref={form} onSubmit={handleFormSubmit} className="fillup-form">
        <select name="drop" className="select-drop" value={values.drop} onChange={handleInputChange} required>
          <option value="" disabled>Chose Your Plane</option>
          <option value="Society">Society</option>
          <option value="Person">Person</option>
        </select>
        <input onChange={handleInputChange} value={values.nome} type="text" name="nome" placeholder={`Enter You ${values.drop ===  ""? "Society" : values.drop} Name`} required/>
        <input onChange={handleInputChange} value={values.email}  type="email" name="email" placeholder="Enter Your Email" required/>
        <input onChange={handleInputChange} value={values.tell} type="tel" name="tell" placeholder="Enter Your Phone Number" onKeyPress={
          (event) => {if (!/[0-9]/.test(event.key)) {
          event.preventDefault();}}} required/>
        <select name="type" className="select-typemat" value={values.type} onChange={handleInputChange} required>
        <option value="" disabled>Chose Your Material</option>
          <option value="Laptop" >Laptop</option>
          <option value="Descktop">Descktop</option>
          <option value="Phone">Phone</option>
          <option value="Console">Console</option>
        </select>  
        <select name="etat"  className="select-etat" value={values.etat} onChange={handleInputChange} required>
        <option value="" disabled>Chose Your State</option>
          <option value="Working" >Working</option>
          <option value="Broken">Broken</option>
        </select> 
        <textarea onChange={handleInputChange} value={values.des} name="des" rows="7" placeholder="Problem Description" required></textarea> 
        <input onChange={handleInputChange} value={values.date} type="date" name="date" required/>
        <input type="text" name="unic" value={values.unic} readOnly/>
        <button type="submit" className="btn-submit">Submit</button>
        </form>
    </div>
  )
}

export default HomeScreen
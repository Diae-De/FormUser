import React, { useEffect, useState } from 'react'
import './UserLogout.css'
import fb, { db } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'

function UserLogout() {

  const [user,setUser] = useState("")
  const [firstname,setFirstname] = useState("")
  const [tell,setTell] = useState("")
  const [type,setType] = useState("")
  const [desc,setDesc] = useState("")
  const [unic,setUnic] = useState("")
  const [etat,setEtat] = useState("")
  const [date,setDate] = useState("")
  const navigate = useNavigate()


    const authListener = ()=>{
      fb.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          setUser(user)
          db.collection('users').doc(fb.auth().currentUser.uid).get().then((doc)=>{
            setUser(doc.data())
            setFirstname(doc.data().firstname)
            setTell(doc.data().tell)
            setType(doc.data().type)
            setDesc(doc.data().desc)
            setUnic(doc.data().unic)
            setEtat(doc.data().etat)
            setDate(doc.data().date)
          })
        }else {setUser("")
        navigate("/signin")}
      })
    }

    useEffect(()=>{
      authListener()
    },[])

  
      const logout = ()=>{
          fb.auth().signOut()
      }

      const deletUser = async () =>{
        try{
          if(window.confirm("Are you sure you want to delete your account?")){
            await deleteDoc(doc(db,"users",fb.auth(user).currentUser.uid)).then(()=>{
              fb.auth().currentUser.delete()
              fb.auth().signOut()
            })
          }

        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className="logoutcomponent">
        <div className="headerLog">
            <h1 className="logout-head">Welcome {firstname}</h1>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        {!type?
          <div className="info-sec">
              <div className="wrap-msg">
                <Link to="/userform">
                <button className='btn-addinfo'>Add Your Info</button>
                </Link>
                <div className="ops-msg">
                  <h1>Ooops! Nothing to see here yet.</h1>
                </div>
              </div>
          </div>:

        <div className="info-user">
        <ul>
          <li><label style={{marginRight:"0.5em"}}>Email:</label>{user.email}</li>
          <li><label style={{marginRight:"0.5em"}}>Phone Number:</label>{tell}</li>
          <li><label style={{marginRight:"0.5em"}}>Type:</label>{type}</li>
          <li><label style={{marginRight:"0.5em"}}>State:</label>{etat}</li>
          <li><label style={{marginRight:"0.5em"}}>Description:</label>{desc}</li>
          <li><label style={{marginRight:"0.5em"}}>Date:</label> {date}</li>
          <li><label style={{marginRight:"0.5em"}}>Unic Code:</label> {unic}</li>
        </ul>
        <div className="btn-div">
          <Link to="/userform">
            <button className="btn-mod">Modify</button>
          </Link>
          <button className="btn-sup" onClick={deletUser}>Delete</button>
        </div>
        </div>
      }


    </div>
  )
}

export default UserLogout
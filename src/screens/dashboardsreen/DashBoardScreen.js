import React, { useEffect, useRef, useState } from 'react'
import './DashBoardStyle.css'
import fb from '../../firebase'
import {db} from '../../firebase'
import {IoIosArrowDown,IoIosArrowUp} from 'react-icons/io'
import {doc,deleteDoc,setDoc, updateDoc} from 'firebase/firestore'
import {MdCloudDone} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function DashBoardScreen({getUserId,userId}) {

    const form = useRef();
    
    const initialFieldValues = {
      status:"",
      recom:"",
      icon:"",
      cost:"",
    }
    const [user,setUser] = useState("")
    const navigate = useNavigate()

    const authListener = ()=>{
      fb.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          setUser(user)
        }else {setUser("")
        navigate("/manager")}
      })
    }
  
    useEffect(()=>{
      authListener()
    },[])

    const [values,setValues] = useState(initialFieldValues)

    const [searchTerm,setSearchTerm] = useState("")

    const [users,setUsers]=useState([])
    const [loading,setLoading] = useState(false)
    const refe = fb.firestore().collection("users")

    const handleChange = (e) =>{
      const {name,value} = e.target
      setValues({...values,[name]:value})
    }

    function getUsers(){
        setLoading(true)
        refe.onSnapshot(snapshot => {
            const Arrayusers = []
            snapshot.forEach(doc => {
              Arrayusers.push({...doc.data(),id:doc.id})
            })
            setUsers(Arrayusers)
            setLoading(false)
        })
    }

    useEffect(()=>{
      getUsers()
    },[])

  if(loading){
    return <div style={{ background:"rgb(26, 26, 26)",width:"100%",height:"100vh"}}><h1 style={{color:"white",display:"flex",justifyContent:"center",fontFamily:"'Quicksand', sans-serif"}}>Loading...</h1></div>
  }

  const deletUser = async (id) =>{
    try{
      await deleteDoc(doc(db,"users",id))
    }catch(err){
      console.log(err)
    }
  }

  const logout = ()=>{
    fb.auth().signOut()
}

/*   const EditUser = async (id) =>{
    const docRef = doc(db,"users",id)
    const payload = {...users,status: values.status,recom:values.recom}
    setDoc(docRef,payload)
  } */

  const EditUser = async (id,updates) =>{
    db.collection("users").doc(id).update(updates)
  }

  return (
    <div className="dashboard">
        <div className="dashboard-user">
          <div className="header">
            <h1 className="dashboard-header">Your DashBoard</h1>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
          <div className="searchbar">
            <input type="text" placeholder="Search..." onChange={(e)=>{setSearchTerm(e.target.value)}}/>
          </div>
          <div className="userInfo">
            {users.filter((val)=>{
              if(searchTerm === ""){
                return val
              }else if(val.firstname.toLowerCase().includes(searchTerm.toLowerCase())){
                return val
              }
            }).map((user)=>{
              return<div key={user.id} className="mapUser">
                  <div className="User">
                  <div className="name-back">
                  <p>{user.firstname}</p>
                  {user.status? <MdCloudDone name="doneIcon" value={values.icon}/>:<AiFillCloseCircle name="processIcon" value={values.icon}/>}
                  <div className="icon-nav">
                  <IoIosArrowDown className={userId === user.unic ? "icon-open-active" : "icon-open"} onClick={()=>getUserId(userId ? user.unic: !userId ?  user.unic : "")}/>
                  <IoIosArrowUp className={userId === user.unic ? "icon-close-active" : "icon-close"} onClick={()=>getUserId(userId ? !user.unic: user.unic )}/>
                  </div>
                  </div>
                  <div className="userList">
                    <div className={userId === user.unic ? "userList userlist-active" : "userlist-unactive"} >
                      <ul>
                      <li><label style={{marginRight:"0.5em"}}>Email:</label>{user.email}</li>
                      <li><label style={{marginRight:"0.5em"}}>Phone Number:</label>{user.tell}</li>
                      <li><label style={{marginRight:"0.5em"}}>Type:</label>{user.type}</li>
                      <li><label style={{marginRight:"0.5em"}}>State:</label>{user.etat}</li>
                      <li><label style={{marginRight:"0.5em"}}>Description:</label>{user.desc}</li>
                      <li><label style={{marginRight:"0.5em"}}>Date:</label> {user.date}</li>
                      <li><label style={{marginRight:"0.5em"}}>Unic Code:</label> {user.unic}</li>
                      <li>
                        <div className="recommendation">
                          <h3>Our recommendations</h3>
                          <form ref={form} className="recommendation-Form">
                          <textarea value={values.recom} name="recom" rows="7" placeholder="Our recomendation" onChange={handleChange} className="recom-desc"></textarea> 
                          <div className="Status-sec">
                            <h4>Status</h4>
                            <select name="status" value={values.status} onChange={handleChange} className="status-select" required>
                              <option value="" disabled>The Status</option>
                              <option value="Process">Process</option>
                              <option value="Done">Done</option>
                            </select>
                          </div>
                          <input type='number' name="cost" value={values.cost} placeholder="Cost" onChange={handleChange} className="inputUser" required/>
                          </form>
                          <div className="recommendation-btn">
                            <button onClick={()=>EditUser(user.id,{status:values.status,recom:values.recom,icon:values.icon,cost:values.cost})}>Modify</button>
                            <button onClick={()=>deletUser(user.id)}>Delete</button>
                          </div>
                        </div>
                      </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
    </div>
  )
}

export default DashBoardScreen
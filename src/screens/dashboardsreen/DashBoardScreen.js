import React, { useEffect, useRef, useState } from 'react'
import './DashBoardStyle.css'
import fb from '../../firebase'
import {db} from '../../firebase'
import {IoIosArrowDown,IoIosArrowUp} from 'react-icons/io'
import {doc,deleteDoc,setDoc, updateDoc} from 'firebase/firestore'
import {MdCloudDone} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'

function DashBoardScreen({getUserId,userId}) {

    const form = useRef();
    
    const initialFieldValues = {
      status:"",
      recom:"",
      icon:""
    }
    const [values,setValues] = useState(initialFieldValues)

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
    return <h1>Loading...</h1>
  }

  const deletUser = async (id) =>{
    try{
      await deleteDoc(doc(db,"users",id))
    }catch(err){
      console.log(err)
    }
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
          <h1>Your DashBoard</h1>
          <div className="userInfo">
            {users.map((user)=>{
              return<div key={user.id} className="mapUser">
                  <div className="User">
                  <div className="name-back">
                  <p>{user.name}</p>
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
                      <li><label style={{marginRight:"0.5em"}}>Description:</label>{user.des}</li>
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
                          </form>
                          <div className="recommendation-btn">
                            <button onClick={()=>EditUser(user.id,{status:values.status,recom:values.recom,icon:values.icon})}>Modify</button>
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
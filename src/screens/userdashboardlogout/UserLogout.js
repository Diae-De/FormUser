import React, { useEffect, useRef, useState } from 'react'
import './UserLogout.css'
import fb, { db } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';

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

  const [users,setUsers] = useState([])

    const authListener = ()=>{
      fb.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          setUser(user)

          const refe = db.collection(`users/${fb.auth().currentUser.uid}/oldRepo`)
            refe.onSnapshot(snapshot => {
                const Arrayusers = []
                snapshot.forEach(doc => {
                  Arrayusers.push({...doc.data(),id:doc.id})
                })
                setUsers(Arrayusers)
            })

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
        navigate("/")}
      })
    }

    useEffect(()=>{
      authListener()
    },[])

  
      const logout = ()=>{
          fb.auth().signOut()
      }

      const totals =()=>{
        let total = parseInt(user.cost)
        users.forEach((item)=>{
          total += parseInt(item.cost)
        })
        return total
      }

/*       const deletUser = async () =>{
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
      } */
      
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content:()=>componentRef.current,
        pageStyle:"@page { margin: 0; }",
      })

  return (
    <div className="logoutcomponent">
        <div className="headerLog">
            <h1 className="logout-head">Welcome {firstname}</h1>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        {!type?
          <div className="info-sec">
              <div className="wrap-msg">
                <div className="ops-msg">
                  <h1>Ooops! Nothing to see here yet.</h1>
                </div>
              </div>
          </div>:
        <div className="info-user" ref={componentRef}>
          <table>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Details</th>
              <th>Cost</th>
              <th>Recommended</th>
            </tr>
            <tr>
              <td>{date}</td>
              <td>{user.status}</td>
              <td>
                {type}
                <br/>
                {etat}
              </td>
              <td>{user.cost}DH</td>
              <td style={{width:"200px"}}>{user.recom}</td>
            </tr>
          </table>
          {users.map((user)=>{
            return(
              <table key={user.id}>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Details</th>
                <th>Cost</th>
                <th>Recommended</th>
              </tr>
              <tr>
                <td>{user.date}</td>
                <td>{user.status}</td>
                <td>
                  {user.type}
                  <br/>
                  {user.etat}
                </td>
                <td>{user.cost}DH</td>
                <td>{user.recom}</td>
              </tr>
            </table>
            )
          })}
          <div className="printwrap">
            <p className="total">Total: {totals()} </p>
            <button className="print-btn" onClick={handlePrint}>Print</button>
          </div>

        </div>
      }


    </div>
  )
}

export default UserLogout
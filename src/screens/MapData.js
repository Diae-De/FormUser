import React, { useEffect, useState } from 'react'
import fb, { db } from '../firebase'

function MapData() {

    const [users,setUsers] = useState([])
    const refe = db.collection(`users/${fb.auth().currentUser.uid}/oldRepo`)

    function getUsers(){
        refe.onSnapshot(snapshot => {
            const Arrayusers = []
            snapshot.forEach(doc => {
              Arrayusers.push({...doc.data(),id:doc.id})
            })
            setUsers(Arrayusers)
        })
    }

    useEffect(()=>{
      getUsers()
    },[])
  return (
    <div>
        {users.map((item)=>{
            return(
                <p>{item.email}</p>
            )
        })}
    </div>
  )
}

export default MapData
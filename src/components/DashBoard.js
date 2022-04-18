import React, { useState } from 'react'
import DashBoardScreen from '../screens/dashboardsreen/DashBoardScreen'

function DashBoard() {

  const [userId, getUserId] = useState([])
   
  const getUserIdHandler=(unic)=>{
    getUserId(unic) 
  }

  const getStatus = (status)=>{
    console.log(status)
  }


  return (
    <div>
        <DashBoardScreen getUserId={getUserIdHandler} userId={userId} getStatus={getStatus}/>
    </div>
  )
}

export default DashBoard
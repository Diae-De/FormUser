import React, { useState } from 'react'
import './AcceuilScreen.css'
import { Link } from 'react-router-dom';
import image from '../../images/reparation.jpg'
import mainpart from '../../images/mainpart.png'
import firstpart from '../../images/firstpart.png'
import secondpart from '../../images/secondpart.png'
import thirdpart from '../../images/thirdpart.png'
import fourthpart from '../../images/fourthpart.png'
import {Data} from '../../Data'
import AboutUs from './AboutUs';

function AcceuilScreen() {
  return (
    <div>
        <div className='headerAcceuil'>
            <h1>Maintenance</h1>
            <Link to="/signin">
                <button className='btn_signin'>Signin</button>
            </Link>
        </div>
        <div className='imgAcceuil'>
            {/* <img className='imgAcceu' src={image}></img> */}
        <div className='wrapgridAcceuil'>
            <div className='ourserv'>
                <p>OUR SERVICES</p>
                <h1>INFORMATIQUE TECHNOLOGIE</h1>
                <a href='#about' className="btnabout">ABOUT US</a>
            </div>
            <div className="allpartimg">
                <img src={mainpart} className="mainpart"></img>
                <img src={firstpart} className="firstpart"></img>
                <img src={secondpart} className="secondpart"></img>
                <img src={thirdpart} className="thirdpart"></img>
                <img src={fourthpart} className="fourthpart"></img>
            </div>
        </div>
        <div className='ourservies'>
            <div>
                <h1>OUR SERVICES</h1>
            </div>
            <div  className='Allservice'>
                {Data.map(item=>{
                    return(
                    <div className='flexwrapacc'>
                        <div className='iconserv'>{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.des}</p>
                    </div>)
                })}
            </div>
        </div>
        <div>
            <AboutUs/>
        </div>
        </div>
    </div>
  )
}

export default AcceuilScreen
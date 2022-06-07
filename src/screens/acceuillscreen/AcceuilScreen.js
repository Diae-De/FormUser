import React, { useState } from 'react'
import './AcceuilScreen.css'
import { Link } from 'react-router-dom';
import mainpart from '../../images/mainpart.png'
import firstpart from '../../images/firstpart.png'
import secondpart from '../../images/secondpart.png'
import thirdpart from '../../images/thirdpart.png'
import fourthpart from '../../images/fourthpart.png'
import {Data} from '../../Data'
import AboutUs from './AboutUs';
import firstwork from "../../images/firstwork.jpg"
import secondwork from "../../images/secondwork.jpg"
import thirdwork from "../../images/thirdwork.jpg"
import fourthwork from "../../images/fourthwork.jpg"
import fifthwork from '../../images/fifthwork.jpg'
import sixthwork from '../../images/sixthwork.jpg'
import {FaFacebookF}from "react-icons/fa"
import {AiFillInstagram} from "react-icons/ai"
import {RiWhatsappFill} from "react-icons/ri"

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
        <div className='container_lastwork'>
            <h1>OUR LAST WORK</h1>
            <div className="container_lastwork-img">
                <img src={firstwork}></img>
                <img src={secondwork}></img>
                <img src={thirdwork}></img>
                <img src={fourthwork}></img>
                <img src={fifthwork}></img>
                <img src={sixthwork}></img>
            </div>
        </div>
        <div className="footerAcceuil">
        <h1>Maintenance</h1>
            <div className="footerAcceuil_container">
                    <div className="list_service">
                        <ul>About Us
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <ul>Contact Us
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                        <ul>Learn More
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                </div>
                <div className="footerAcceuil_container-social">
                    <FaFacebookF/>
                    <AiFillInstagram className="social-space"/>
                    <RiWhatsappFill/>
                </div>
            </div>
            <p>Copyright © 2022 Maintenance. All rights reserved.</p>
        </div>
        </div>
    </div>
  )
}

export default AcceuilScreen
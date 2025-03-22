import React from 'react'
import './Fleet.scss'
import logo from '../assets/driveefyLogo.png'
import bell from '../assets/bell.png'
import dp from '../assets/dp.png'
import settings from '../assets/settingd.png'
import arrow from '../assets/arrow.png'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
export function Fleet() {
  return (
    <>
    <div className="navbar-container">
     <div className="navbar-logo-container">
      <img src={logo} alt="" />
     </div>
     <div className="navbar-links-container">
      <img src={bell} alt="" className='bell'/>
      <div className="user-profile">
        <img src={dp} alt="" className='profile-picture' />
        <div className="user-name">
          <h1>Moni Roy</h1>
          <p>User</p>
        </div>
        <img src={arrow} alt="" />
      </div>
      <img src={settings} alt="" className='settings'/>
     </div>
    </div>
    <Sidebar/>
    </>
  )
}

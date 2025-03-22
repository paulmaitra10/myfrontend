import React from 'react'
import { sidebarData } from './formData'
import './Sidebar.scss'
function Sidebar() {
  return (
    <div className="sidebar-main-container">
      <div className="sidebar-dashboard-container">
      <img src="" alt="" />
      <p>Dashboard</p>
      </div>
      <hr />
      <div className="sidebar-items-container">
        {
          sidebarData.map((item, index) => {
            return (
              <div key={index} className='sidebar-item'>
                <img src={item.img} alt="" />
                <p>{item.title}</p>
              </div>
            )
            })
        }
        </div>
        <div className="sidebar-footer-container">
          ff
        </div>
    </div>
  )
}

export default Sidebar
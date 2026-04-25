import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            end
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/segments" 
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            Segment Analysis
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <p>v1.0.0</p>
      </div>
    </aside>
  )
}

export default Sidebar
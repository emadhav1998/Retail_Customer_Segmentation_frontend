import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>RetailSeg</h2>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-link">Home</Link>
        <span className="navbar-tagline">Customer Segmentation Analytics</span>
      </div>
    </nav>
  )
}

export default Navbar
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
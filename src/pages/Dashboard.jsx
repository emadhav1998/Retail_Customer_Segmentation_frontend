import React from 'react'

function Dashboard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Customer Analytics Overview</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Customers</h3>
            <p className="card-value">--</p>
            <p className="card-description">Loading data...</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Total Revenue</h3>
            <p className="card-value">--</p>
            <p className="card-description">Loading data...</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Average Order Value</h3>
            <p className="card-value">--</p>
            <p className="card-description">Loading data...</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Customer Segments</h3>
            <p className="card-value">--</p>
            <p className="card-description">Loading data...</p>
          </div>
        </div>

        <section className="dashboard-section">
          <h2>Recent Activity</h2>
          <p className="placeholder-text">Customer activity charts will be displayed here</p>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
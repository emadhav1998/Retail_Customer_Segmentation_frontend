import React from 'react'

function Overview() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Project Overview</h1>
        <p>Retail Customer Segmentation Analysis</p>
      </div>
      
      <div className="overview-content">
        <section className="overview-section">
          <h2>About This Project</h2>
          <p>
            This application helps business analysts perform customer segmentation 
            analysis on retail data. Group customers by purchase frequency, revenue, 
            and product preferences to identify high-value and potential-growth segments.
          </p>
        </section>

        <section className="overview-section">
          <h2>Key Features</h2>
          <ul>
            <li>Customer segmentation by purchase behavior</li>
            <li>Revenue analysis and trends</li>
            <li>Product preference mapping</li>
            <li>Interactive dashboards and visualizations</li>
            <li>AI-powered insights and recommendations</li>
          </ul>
        </section>

        <section className="overview-section">
          <h2>Getting Started</h2>
          <p>
            Navigate to the Dashboard to view customer data visualizations, 
            or go to Segment Analysis for detailed clustering analysis.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Overview
import React from 'react'

function SegmentAnalysis() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Segment Analysis</h1>
        <p>Detailed Customer Segmentation Insights</p>
      </div>
      
      <div className="segment-content">
        <section className="segment-section">
          <h2>Customer Segments</h2>
          <p>
            Analyze customer groups based on purchase frequency, revenue contribution, 
            and product preferences to identify high-value and potential-growth segments.
          </p>
        </section>

        <div className="segment-grid">
          <div className="segment-card">
            <h3>High-Value Customers</h3>
            <p className="segment-description">Top revenue generators</p>
            <p className="segment-count">-- customers</p>
          </div>
          
          <div className="segment-card">
            <h3>Regular Customers</h3>
            <p className="segment-description">Consistent purchase behavior</p>
            <p className="segment-count">-- customers</p>
          </div>
          
          <div className="segment-card">
            <h3>Potential Growth</h3>
            <p className="segment-description">High potential customers</p>
            <p className="segment-count">-- customers</p>
          </div>
          
          <div className="segment-card">
            <h3>At-Risk Customers</h3>
            <p className="segment-description">Declining engagement</p>
            <p className="segment-count">-- customers</p>
          </div>
        </div>

        <section className="segment-section">
          <h2>Segmentation Criteria</h2>
          <ul>
            <li>Purchase Frequency - How often customers buy</li>
            <li>Revenue Contribution - Total spending amount</li>
            <li>Product Preferences - Category preferences</li>
            <li>Customer Lifetime Value - Long-term value prediction</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default SegmentAnalysis
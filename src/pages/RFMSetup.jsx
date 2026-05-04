import React, { useState } from 'react'
import { rfmAPI } from '../services/api'

function RFMSetup() {
  const [rfmStatus, setRfmStatus] = useState({
    referenceDate: new Date().toISOString().split('T')[0],
    recencyComplete: false,
    frequencyComplete: false,
    monetaryComplete: false,
    loading: false,
    error: null,
    recencyData: [],
    recencyStats: null,
    frequencyData: [],
    monetaryData: [],
    rfmSummary: null,
    outputFile: null
  })

  const handleRunRecencyCalculation = async () => {
    if (!rfmStatus.referenceDate) {
      setRfmStatus(prev => ({
        ...prev,
        error: 'Please select a reference date'
      }))
      return
    }

    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.runRecencyCalculation(rfmStatus.referenceDate)
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        recencyComplete: true,
        recencyData: result.recencyData || [],
        recencyStats: result.statistics || null,
        outputFile: result.outputFile || 'rfm_recency.csv'
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to run recency calculation'
      }))
    }
  }

  const handleFetchRecencyPreview = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.getRecencyPreview()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        recencyData: result.recencyData || result.preview || [],
        recencyStats: result.statistics || prev.recencyStats
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch recency preview'
      }))
    }
  }

  const handleCheckStatus = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.getRFMStatus()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        recencyComplete: result.recencyComplete || false,
        frequencyComplete: result.frequencyComplete || false,
        monetaryComplete: result.monetaryComplete || false,
        recencyData: result.recencyData || prev.recencyData,
        frequencyData: result.frequencyData || prev.frequencyData,
        monetaryData: result.monetaryData || prev.monetaryData,
        rfmSummary: result.rfmSummary || prev.rfmSummary,
        outputFile: result.outputFile || prev.outputFile
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to check status'
      }))
    }
  }

  return (
    <div className="data-cleaning-content">
      {/* RFM Setup Header Section */}
      <section className="cleaning-section">
        <h2>RFM Analysis Setup</h2>
        <p className="cleaning-description">
          Set up Recency, Frequency, and Monetary (RFM) analysis to segment customers based on their 
          purchasing behavior. Configure the reference date and run calculations to generate RFM scores 
          that classify customers into meaningful segments.
        </p>
      </section>

      {/* Reference Date Selection */}
      <section className="cleaning-section">
        <h2>Configuration</h2>
        
        <div className="rfm-config-grid">
          <div className="config-field">
            <label htmlFor="reference-date">Reference Date for Recency Calculation</label>
            <input
              id="reference-date"
              type="date"
              value={rfmStatus.referenceDate}
              onChange={(e) => setRfmStatus(prev => ({ ...prev, referenceDate: e.target.value }))}
              className="date-input"
              disabled={rfmStatus.loading}
            />
            <p className="field-hint">
              The most recent date in your dataset, used to calculate days since last purchase
            </p>
          </div>
        </div>

        <div className="cleaning-actions">
          <button 
            className="cleaning-button primary"
            onClick={handleRunRecencyCalculation}
            disabled={rfmStatus.loading}
          >
            {rfmStatus.loading ? 'Calculating...' : 'Run Recency Calculation'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleFetchRecencyPreview}
            disabled={rfmStatus.loading}
          >
            {rfmStatus.loading ? 'Loading...' : 'Preview Recency Values'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleCheckStatus}
            disabled={rfmStatus.loading}
          >
            Check RFM Status
          </button>
        </div>

        {rfmStatus.error && (
          <div className="cleaning-error">
            <strong>Error:</strong> {rfmStatus.error}
          </div>
        )}
      </section>

      {/* Recency Statistics */}
      {rfmStatus.recencyStats && (
        <section className="cleaning-section">
          <h2>Recency Statistics</h2>
          
          <div className="rfm-stats-grid">
            <div className="rfm-stat-card">
              <h3>Average Recency</h3>
              <div className="rfm-stat-value">{rfmStatus.recencyStats.averageRecency || 0}</div>
              <p className="rfm-stat-unit">Days since last purchase</p>
            </div>
            
            <div className="rfm-stat-card">
              <h3>Max Recency</h3>
              <div className="rfm-stat-value">{rfmStatus.recencyStats.maxRecency || 0}</div>
              <p className="rfm-stat-unit">Highest days gap</p>
            </div>
            
            <div className="rfm-stat-card">
              <h3>Min Recency</h3>
              <div className="rfm-stat-value">{rfmStatus.recencyStats.minRecency || 0}</div>
              <p className="rfm-stat-unit">Lowest days gap</p>
            </div>

            <div className="rfm-stat-card">
              <h3>Customers Analyzed</h3>
              <div className="rfm-stat-value">{rfmStatus.recencyStats.customerCount || 0}</div>
              <p className="rfm-stat-unit">Total records</p>
            </div>
          </div>
        </section>
      )}

      {/* Recency Preview Table */}
      {rfmStatus.recencyData.length > 0 && (
        <section className="cleaning-section">
          <h2>Recency Preview</h2>
          <p className="cleaning-description">
            First {Math.min(10, rfmStatus.recencyData.length)} customer recency values:
          </p>
          
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Last Purchase Date</th>
                  <th>Recency (Days)</th>
                  <th>Recency Score</th>
                </tr>
              </thead>
              <tbody>
                {rfmStatus.recencyData.slice(0, 10).map((row, index) => (
                  <tr key={index}>
                    <td>{row.customerId || row.customer_id || '-'}</td>
                    <td>{row.lastPurchaseDate || row.last_purchase_date || '-'}</td>
                    <td>{row.recencyDays || row.recency_days || 0}</td>
                    <td>
                      <span className="recency-score">
                        {row.recencyScore || row.recency_score || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rfmStatus.recencyData.length > 10 && (
            <div className="table-footer">
              <p>Showing 10 of {rfmStatus.recencyData.length} total customers</p>
            </div>
          )}
        </section>
      )}

      {/* RFM Summary */}
      {rfmStatus.rfmSummary && (
        <section className="cleaning-section">
          <h2>RFM Analysis Summary</h2>
          
          <div className="rfm-summary-grid">
            <div className="rfm-summary-card">
              <h3>Recency Complete</h3>
              <div className="rfm-status-icon">
                {rfmStatus.recencyComplete ? '✓' : '○'}
              </div>
            </div>
            
            <div className="rfm-summary-card">
              <h3>Frequency Complete</h3>
              <div className="rfm-status-icon">
                {rfmStatus.frequencyComplete ? '✓' : '○'}
              </div>
            </div>
            
            <div className="rfm-summary-card">
              <h3>Monetary Complete</h3>
              <div className="rfm-status-icon">
                {rfmStatus.monetaryComplete ? '✓' : '○'}
              </div>
            </div>
          </div>

          {rfmStatus.rfmSummary.details && (
            <div className="rfm-details">
              <h3>RFM Details</h3>
              <ul>
                {Object.entries(rfmStatus.rfmSummary.details).map(([key, value]) => (
                  <li key={key}>
                    <span className="detail-key">{key}:</span>
                    <span className="detail-value">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Output File Status */}
      {rfmStatus.outputFile && (
        <section className="cleaning-section">
          <h2>Output File</h2>
          
          <div className="final-output-status">
            <div className="final-output-card">
              <div className="final-output-icon">✓</div>
              <div className="final-output-info">
                <div className="final-output-filename">{rfmStatus.outputFile}</div>
                <div className="final-output-description">
                  {rfmStatus.recencyComplete 
                    ? 'RFM recency calculation completed successfully' 
                    : 'Output file ready for download'}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RFM Analysis Steps */}
      <section className="cleaning-section">
        <h2>RFM Analysis Steps</h2>
        <div className="cleaning-steps">
          <div className={`cleaning-step ${rfmStatus.recencyComplete ? 'complete' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Recency Calculation</h3>
              <p>Calculate days since last purchase for each customer using reference date</p>
            </div>
            <div className="step-status">
              {rfmStatus.recencyComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${rfmStatus.frequencyComplete ? 'complete' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Frequency Calculation</h3>
              <p>Count total number of purchases for each customer</p>
            </div>
            <div className="step-status">
              {rfmStatus.frequencyComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${rfmStatus.monetaryComplete ? 'complete' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Monetary Calculation</h3>
              <p>Sum total spending amount for each customer</p>
            </div>
            <div className="step-status">
              {rfmStatus.monetaryComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${rfmStatus.recencyComplete && rfmStatus.frequencyComplete && rfmStatus.monetaryComplete ? 'complete' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>RFM Scoring & Segmentation</h3>
              <p>Assign RFM scores and segment customers into groups</p>
            </div>
            <div className="step-status">
              {rfmStatus.recencyComplete && rfmStatus.frequencyComplete && rfmStatus.monetaryComplete ? 'Complete' : 'Pending'}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RFMSetup

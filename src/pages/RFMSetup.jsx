import React, { useState } from 'react'
import { rfmAPI } from '../services/api'

function RFMSetup() {
  const [rfmStatus, setRfmStatus] = useState({
    referenceDate: new Date().toISOString().split('T')[0],
    recencyComplete: false,
    frequencyComplete: false,
    monetaryComplete: false,
    rfmBaseComplete: false,
    scoringComplete: false,
    loading: false,
    error: null,
    recencyData: [],
    recencyStats: null,
    frequencyData: [],
    frequencyStats: null,
    monetaryData: [],
    monetaryStats: null,
    rfmBasePreview: [],
    rfmScoresPreview: [],
    scoreDistribution: null,
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

  const handleBuildRFMBase = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.buildRFMBaseTable(rfmStatus.referenceDate)
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        rfmBaseComplete: true,
        recencyComplete: true,
        frequencyComplete: true,
        monetaryComplete: true,
        rfmBasePreview: result.preview || [],
        recencyStats: result.recencyStats || prev.recencyStats,
        frequencyStats: result.frequencyStats || null,
        monetaryStats: result.monetaryStats || null,
        rfmSummary: result.rfmSummary || prev.rfmSummary,
        outputFile: result.outputFile || 'rfm_base.csv'
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to build RFM base file'
      }))
    }
  }

  const handleFetchRFMBasePreview = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.getRFMBasePreview()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        rfmBasePreview: result.preview || result.rows || [],
        recencyStats: result.recencyStats || prev.recencyStats,
        frequencyStats: result.frequencyStats || prev.frequencyStats,
        monetaryStats: result.monetaryStats || prev.monetaryStats
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch RFM base preview'
      }))
    }
  }

  const handleGenerateRFMScores = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.generateRFMScores()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        scoringComplete: true,
        rfmScoresPreview: result.preview || result.scores || [],
        scoreDistribution: result.distribution || result.scoreDistribution || null,
        outputFile: result.outputFile || 'rfm_scores.csv'
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to generate RFM scores'
      }))
    }
  }

  const handleFetchScoreDistribution = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.getScoreDistribution()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        scoreDistribution: result.distribution || result.scoreDistribution || prev.scoreDistribution,
        rfmScoresPreview: result.preview || prev.rfmScoresPreview
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch score distribution'
      }))
    }
  }

  const handleFetchRFMBasePreview = async () => {
    setRfmStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await rfmAPI.getRFMBasePreview()
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        rfmBasePreview: result.preview || result.rows || [],
        recencyStats: result.recencyStats || prev.recencyStats,
        frequencyStats: result.frequencyStats || prev.frequencyStats,
        monetaryStats: result.monetaryStats || prev.monetaryStats
      }))
    } catch (error) {
      setRfmStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch RFM base preview'
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
            onClick={handleBuildRFMBase}
            disabled={rfmStatus.loading}
          >
            {rfmStatus.loading ? 'Building...' : 'Build Full RFM Base File'}
          </button>
          <button 
            className="cleaning-button secondary"
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
            onClick={handleGenerateRFMScores}
            disabled={rfmStatus.loading || !rfmStatus.rfmBaseComplete}
          >
            {rfmStatus.loading ? 'Generating...' : 'Generate RFM Scores'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleFetchScoreDistribution}
            disabled={rfmStatus.loading}
          >
            {rfmStatus.loading ? 'Loading...' : 'Show Score Distribution'}
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

      {/* Column Summaries: Recency, Frequency, Monetary */}
      {(rfmStatus.recencyStats || rfmStatus.frequencyStats || rfmStatus.monetaryStats) && (
        <section className="cleaning-section">
          <h2>RFM Column Summaries</h2>

          {rfmStatus.recencyStats && (
            <div className="rfm-column-summary">
              <h3 className="rfm-column-title rfm-recency-title">Recency</h3>
              <div className="rfm-stats-grid">
                <div className="rfm-stat-card">
                  <h3>Average</h3>
                  <div className="rfm-stat-value">{rfmStatus.recencyStats.averageRecency ?? rfmStatus.recencyStats.average ?? 0}</div>
                  <p className="rfm-stat-unit">Days since last purchase</p>
                </div>
                <div className="rfm-stat-card">
                  <h3>Min</h3>
                  <div className="rfm-stat-value">{rfmStatus.recencyStats.minRecency ?? rfmStatus.recencyStats.min ?? 0}</div>
                  <p className="rfm-stat-unit">Most recent customer</p>
                </div>
                <div className="rfm-stat-card">
                  <h3>Max</h3>
                  <div className="rfm-stat-value">{rfmStatus.recencyStats.maxRecency ?? rfmStatus.recencyStats.max ?? 0}</div>
                  <p className="rfm-stat-unit">Least recent customer</p>
                </div>
                <div className="rfm-stat-card">
                  <h3>Customers</h3>
                  <div className="rfm-stat-value">{rfmStatus.recencyStats.customerCount ?? rfmStatus.recencyStats.count ?? 0}</div>
                  <p className="rfm-stat-unit">Total records</p>
                </div>
              </div>
            </div>
          )}

          {rfmStatus.frequencyStats && (
            <div className="rfm-column-summary">
              <h3 className="rfm-column-title rfm-frequency-title">Frequency</h3>
              <div className="rfm-stats-grid">
                <div className="rfm-stat-card rfm-stat-frequency">
                  <h3>Average</h3>
                  <div className="rfm-stat-value">{(rfmStatus.frequencyStats.average ?? 0).toFixed(1)}</div>
                  <p className="rfm-stat-unit">Purchases per customer</p>
                </div>
                <div className="rfm-stat-card rfm-stat-frequency">
                  <h3>Min</h3>
                  <div className="rfm-stat-value">{rfmStatus.frequencyStats.min ?? 0}</div>
                  <p className="rfm-stat-unit">Fewest purchases</p>
                </div>
                <div className="rfm-stat-card rfm-stat-frequency">
                  <h3>Max</h3>
                  <div className="rfm-stat-value">{rfmStatus.frequencyStats.max ?? 0}</div>
                  <p className="rfm-stat-unit">Most purchases</p>
                </div>
                <div className="rfm-stat-card rfm-stat-frequency">
                  <h3>Customers</h3>
                  <div className="rfm-stat-value">{rfmStatus.frequencyStats.count ?? 0}</div>
                  <p className="rfm-stat-unit">Total records</p>
                </div>
              </div>
            </div>
          )}

          {rfmStatus.monetaryStats && (
            <div className="rfm-column-summary">
              <h3 className="rfm-column-title rfm-monetary-title">Monetary</h3>
              <div className="rfm-stats-grid">
                <div className="rfm-stat-card rfm-stat-monetary">
                  <h3>Average</h3>
                  <div className="rfm-stat-value">${(rfmStatus.monetaryStats.average ?? 0).toFixed(2)}</div>
                  <p className="rfm-stat-unit">Average spend per customer</p>
                </div>
                <div className="rfm-stat-card rfm-stat-monetary">
                  <h3>Min</h3>
                  <div className="rfm-stat-value">${(rfmStatus.monetaryStats.min ?? 0).toFixed(2)}</div>
                  <p className="rfm-stat-unit">Lowest total spend</p>
                </div>
                <div className="rfm-stat-card rfm-stat-monetary">
                  <h3>Max</h3>
                  <div className="rfm-stat-value">${(rfmStatus.monetaryStats.max ?? 0).toFixed(2)}</div>
                  <p className="rfm-stat-unit">Highest total spend</p>
                </div>
                <div className="rfm-stat-card rfm-stat-monetary">
                  <h3>Total Revenue</h3>
                  <div className="rfm-stat-value">${(rfmStatus.monetaryStats.total ?? 0).toFixed(0)}</div>
                  <p className="rfm-stat-unit">Combined customer spend</p>
                </div>
              </div>
            </div>
          )}
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

      {/* RFM Base Table Preview */}
      {rfmStatus.rfmBasePreview.length > 0 && (
        <section className="cleaning-section">
          <h2>RFM Base Table Preview</h2>
          <p className="cleaning-description">
            First {Math.min(10, rfmStatus.rfmBasePreview.length)} rows from the generated RFM base file:
          </p>
          
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Recency (Days)</th>
                  <th>Frequency</th>
                  <th>Monetary ($)</th>
                  <th>R Score</th>
                  <th>F Score</th>
                  <th>M Score</th>
                </tr>
              </thead>
              <tbody>
                {rfmStatus.rfmBasePreview.slice(0, 10).map((row, index) => (
                  <tr key={index}>
                    <td>{row.customerId || row.customer_id || '-'}</td>
                    <td>{row.recencyDays ?? row.recency_days ?? row.recency ?? '-'}</td>
                    <td>{row.frequency ?? '-'}</td>
                    <td>{typeof (row.monetary) === 'number' ? row.monetary.toFixed(2) : (row.monetary ?? '-')}</td>
                    <td><span className="rfm-score-badge rfm-r">{row.rScore ?? row.r_score ?? '-'}</span></td>
                    <td><span className="rfm-score-badge rfm-f">{row.fScore ?? row.f_score ?? '-'}</span></td>
                    <td><span className="rfm-score-badge rfm-m">{row.mScore ?? row.m_score ?? '-'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rfmStatus.rfmBasePreview.length > 10 && (
            <div className="table-footer">
              <p>Showing 10 of {rfmStatus.rfmBasePreview.length} total rows</p>
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

      {/* Score Distribution Cards */}
      {rfmStatus.scoreDistribution && (
        <section className="cleaning-section">
          <h2>RFM Score Distribution</h2>
          <p className="cleaning-description">
            Distribution of R, F, and M scores across the customer base:
          </p>

          <div className="score-distribution-grid">
            {rfmStatus.scoreDistribution.rScores && (
              <div className="score-distribution-card rfm-recency-card">
                <h3 className="score-title">Recency Score Distribution</h3>
                <div className="score-bars">
                  {Object.entries(rfmStatus.scoreDistribution.rScores).map(([score, count]) => (
                    <div key={score} className="score-bar">
                      <label>{score}</label>
                      <div className="bar-container">
                        <div 
                          className="bar-fill rfm-recency-bar"
                          style={{
                            width: `${(count / Math.max(...Object.values(rfmStatus.scoreDistribution.rScores))) * 100}%`
                          }}
                        >
                          <span className="bar-label">{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rfmStatus.scoreDistribution.fScores && (
              <div className="score-distribution-card rfm-frequency-card">
                <h3 className="score-title">Frequency Score Distribution</h3>
                <div className="score-bars">
                  {Object.entries(rfmStatus.scoreDistribution.fScores).map(([score, count]) => (
                    <div key={score} className="score-bar">
                      <label>{score}</label>
                      <div className="bar-container">
                        <div 
                          className="bar-fill rfm-frequency-bar"
                          style={{
                            width: `${(count / Math.max(...Object.values(rfmStatus.scoreDistribution.fScores))) * 100}%`
                          }}
                        >
                          <span className="bar-label">{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rfmStatus.scoreDistribution.mScores && (
              <div className="score-distribution-card rfm-monetary-card">
                <h3 className="score-title">Monetary Score Distribution</h3>
                <div className="score-bars">
                  {Object.entries(rfmStatus.scoreDistribution.mScores).map(([score, count]) => (
                    <div key={score} className="score-bar">
                      <label>{score}</label>
                      <div className="bar-container">
                        <div 
                          className="bar-fill rfm-monetary-bar"
                          style={{
                            width: `${(count / Math.max(...Object.values(rfmStatus.scoreDistribution.mScores))) * 100}%`
                          }}
                        >
                          <span className="bar-label">{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* RFM Scores Preview Table */}
      {rfmStatus.rfmScoresPreview.length > 0 && (
        <section className="cleaning-section">
          <h2>RFM Scores Preview</h2>
          <p className="cleaning-description">
            First {Math.min(10, rfmStatus.rfmScoresPreview.length)} customer RFM scores:
          </p>
          
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Recency (Days)</th>
                  <th>Frequency</th>
                  <th>Monetary ($)</th>
                  <th>R Score</th>
                  <th>F Score</th>
                  <th>M Score</th>
                  <th>Combined Score</th>
                  <th>Segment</th>
                </tr>
              </thead>
              <tbody>
                {rfmStatus.rfmScoresPreview.slice(0, 10).map((row, index) => (
                  <tr key={index}>
                    <td>{row.customerId || row.customer_id || '-'}</td>
                    <td>{row.recencyDays ?? row.recency_days ?? row.recency ?? '-'}</td>
                    <td>{row.frequency ?? '-'}</td>
                    <td>{typeof (row.monetary) === 'number' ? `$${row.monetary.toFixed(2)}` : (row.monetary ?? '-')}</td>
                    <td><span className="rfm-score-badge rfm-r">{row.rScore ?? row.r_score ?? '-'}</span></td>
                    <td><span className="rfm-score-badge rfm-f">{row.fScore ?? row.f_score ?? '-'}</span></td>
                    <td><span className="rfm-score-badge rfm-m">{row.mScore ?? row.m_score ?? '-'}</span></td>
                    <td><strong>{row.rfmScore ?? row.combined_score ?? row.rfm_score ?? '-'}</strong></td>
                    <td>{row.segment || row.segment_name || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rfmStatus.rfmScoresPreview.length > 10 && (
            <div className="table-footer">
              <p>Showing 10 of {rfmStatus.rfmScoresPreview.length} total rows</p>
            </div>
          )}
        </section>
      )}

      {/* Output File Status */}
      {rfmStatus.outputFile && rfmStatus.scoringComplete && (
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

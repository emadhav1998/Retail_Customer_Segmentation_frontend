import React, { useState } from 'react'
import { cleaningAPI } from '../services/api'

function DataCleaning() {
  const [cleaningStatus, setCleaningStatus] = useState({
    step1Complete: false,
    loading: false,
    error: null,
    rowCounts: {
      before: null,
      after: null
    },
    outputFile: null
  })

  const handleRunStep1 = async () => {
    setCleaningStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await cleaningAPI.runCleaningStep1()
      setCleaningStatus(prev => ({
        ...prev,
        loading: false,
        step1Complete: true,
        rowCounts: {
          before: result.rowCounts?.before || 0,
          after: result.rowCounts?.after || 0
        },
        outputFile: result.outputFile || 'cleaned_data.csv'
      }))
    } catch (error) {
      setCleaningStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to run cleaning step 1'
      }))
    }
  }

  const handleCheckStatus = async () => {
    setCleaningStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await cleaningAPI.getCleaningStatus()
      setCleaningStatus(prev => ({
        ...prev,
        loading: false,
        step1Complete: result.step1Complete || false,
        rowCounts: {
          before: result.rowCounts?.before || prev.rowCounts.before,
          after: result.rowCounts?.after || prev.rowCounts.after
        },
        outputFile: result.outputFile || prev.outputFile
      }))
    } catch (error) {
      setCleaningStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to check status'
      }))
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Data Cleaning</h1>
        <p>Clean and prepare your dataset for analysis</p>
      </div>
      
      <div className="data-cleaning-content">
        {/* Cleaning Step 1 */}
        <section className="cleaning-section">
          <h2>Step 1: Remove Duplicates & Handle Missing Values</h2>
          <p className="cleaning-description">
            This step will remove duplicate rows and fill missing values in the dataset.
          </p>
          
          <div className="cleaning-actions">
            <button 
              className="cleaning-button primary"
              onClick={handleRunStep1}
              disabled={cleaningStatus.loading}
            >
              {cleaningStatus.loading ? 'Running...' : 'Run Step 1 Cleaning'}
            </button>
            
            <button 
              className="cleaning-button secondary"
              onClick={handleCheckStatus}
              disabled={cleaningStatus.loading}
            >
              Check Status
            </button>
          </div>

          {cleaningStatus.error && (
            <div className="cleaning-error">
              <p>Error: {cleaningStatus.error}</p>
            </div>
          )}
        </section>

        {/* Row Counts */}
        <section className="cleaning-section">
          <h2>Row Counts</h2>
          <div className="row-counts-grid">
            <div className="row-count-card">
              <h3>Before Cleaning</h3>
              <p className="row-count-value">
                {cleaningStatus.rowCounts.before !== null 
                  ? cleaningStatus.rowCounts.before.toLocaleString() 
                  : '--'}
              </p>
              <p className="row-count-description">Original row count</p>
            </div>
            
            <div className="row-count-arrow">
              <span>→</span>
            </div>
            
            <div className="row-count-card">
              <h3>After Cleaning</h3>
              <p className="row-count-value">
                {cleaningStatus.rowCounts.after !== null 
                  ? cleaningStatus.rowCounts.after.toLocaleString() 
                  : '--'}
              </p>
              <p className="row-count-description">Cleaned row count</p>
            </div>
          </div>

          {cleaningStatus.rowCounts.before !== null && cleaningStatus.rowCounts.after !== null && (
            <div className="row-count-summary">
              <p>
                <strong>Rows Removed:</strong> {(cleaningStatus.rowCounts.before - cleaningStatus.rowCounts.after).toLocaleString()}
                {' '}({((cleaningStatus.rowCounts.before - cleaningStatus.rowCounts.after) / cleaningStatus.rowCounts.before * 100).toFixed(2)}%)
              </p>
            </div>
          )}
        </section>

        {/* Output File Status */}
        <section className="cleaning-section">
          <h2>Output File Status</h2>
          <div className="output-status">
            {cleaningStatus.outputFile ? (
              <>
                <div className="output-file-card">
                  <div className="output-icon success">✓</div>
                  <div className="output-details">
                    <h3>Cleaned Data Available</h3>
                    <p className="output-filename">{cleaningStatus.outputFile}</p>
                    <p className="output-description">
                      {cleaningStatus.rowCounts.after?.toLocaleString() || '--'} rows saved
                    </p>
                  </div>
                </div>
                <div className="output-actions">
                  <button className="cleaning-button secondary">
                    Download Cleaned Data
                  </button>
                </div>
              </>
            ) : (
              <div className="output-pending">
                <div className="output-icon pending">⏳</div>
                <div className="output-details">
                  <h3>No Cleaned Data Yet</h3>
                  <p className="output-description">Run cleaning step to generate output file</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Cleaning Steps Info */}
        <section className="cleaning-section">
          <h2>Cleaning Steps Overview</h2>
          <div className="cleaning-steps">
            <div className={`cleaning-step ${cleaningStatus.step1Complete ? 'complete' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Remove Duplicates & Missing Values</h3>
                <p>Identify and remove duplicate rows, fill missing values with appropriate methods</p>
              </div>
              <div className="step-status">
                {cleaningStatus.step1Complete ? '✓ Complete' : '○ Pending'}
              </div>
            </div>
            
            <div className="cleaning-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Data Type Validation</h3>
                <p>Validate and correct data types, handle invalid values</p>
              </div>
              <div className="step-status">○ Pending</div>
            </div>
            
            <div className="cleaning-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Outlier Detection</h3>
                <p>Identify and handle outliers in numeric columns</p>
              </div>
              <div className="step-status">○ Pending</div>
            </div>
            
            <div className="cleaning-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Final Validation</h3>
                <p>Final check and export cleaned dataset</p>
              </div>
              <div className="step-status">○ Pending</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DataCleaning
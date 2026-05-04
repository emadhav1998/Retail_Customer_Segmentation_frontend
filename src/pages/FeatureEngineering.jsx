import React, { useState } from 'react'
import { featureEngineeringAPI } from '../services/api'

function FeatureEngineering() {
  const [featureStatus, setFeatureStatus] = useState({
    engineeringComplete: false,
    loading: false,
    error: null,
    derivedFields: [],
    fieldDetails: [],
    summary: null,
    outputFile: null
  })

  const handleRunFeatureEngineering = async () => {
    setFeatureStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await featureEngineeringAPI.runFeatureEngineering()
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        engineeringComplete: true,
        derivedFields: result.derivedFields || [],
        summary: result.summary || null,
        outputFile: result.outputFile || 'engineered_features.csv'
      }))
    } catch (error) {
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to run feature engineering'
      }))
    }
  }

  const handleGetDerivedFields = async () => {
    setFeatureStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await featureEngineeringAPI.getDerivedFields()
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        fieldDetails: result.fields || result.derivedFields || [],
        summary: result.summary || prev.summary
      }))
    } catch (error) {
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch derived fields'
      }))
    }
  }

  const handleCheckStatus = async () => {
    setFeatureStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await featureEngineeringAPI.getFeatureEngineeringStatus()
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        engineeringComplete: result.engineeringComplete || false,
        derivedFields: result.derivedFields || prev.derivedFields,
        summary: result.summary || prev.summary,
        outputFile: result.outputFile || prev.outputFile
      }))
    } catch (error) {
      setFeatureStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to check status'
      }))
    }
  }

  return (
    <div className="data-cleaning-content">
      {/* Feature Engineering Section */}
      <section className="cleaning-section">
        <h2>Feature Engineering</h2>
        <p className="cleaning-description">
          Generate derived features from existing fields to improve segmentation and analysis. 
          This process creates new variables based on customer purchase patterns, frequency metrics, 
          and behavioral indicators.
        </p>

        <div className="cleaning-actions">
          <button 
            className="cleaning-button primary"
            onClick={handleRunFeatureEngineering}
            disabled={featureStatus.loading}
          >
            {featureStatus.loading ? 'Running...' : 'Run Feature Engineering'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleGetDerivedFields}
            disabled={featureStatus.loading}
          >
            {featureStatus.loading ? 'Loading...' : 'Preview Derived Fields'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleCheckStatus}
            disabled={featureStatus.loading}
          >
            Check Status
          </button>
        </div>

        {featureStatus.error && (
          <div className="cleaning-error">
            <strong>Error:</strong> {featureStatus.error}
          </div>
        )}
      </section>

      {/* Derived Fields Preview */}
      {featureStatus.fieldDetails.length > 0 && (
        <section className="cleaning-section">
          <h2>Derived Fields Preview</h2>
          <p className="cleaning-description">
            New features created from existing data to enhance segmentation analysis:
          </p>
          
          <div className="fields-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Description</th>
                  <th>Data Type</th>
                  <th>Sample Value</th>
                </tr>
              </thead>
              <tbody>
                {featureStatus.fieldDetails.map((field, index) => (
                  <tr key={index}>
                    <td><strong>{field.name}</strong></td>
                    <td>{field.description}</td>
                    <td>{field.dataType}</td>
                    <td>{field.sampleValue || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Feature Engineering Summary */}
      {featureStatus.summary && (
        <section className="cleaning-section">
          <h2>Feature Engineering Summary</h2>
          
          <div className="feature-summary-grid">
            <div className="feature-summary-card">
              <h3>Total Features Created</h3>
              <div className="feature-value">{featureStatus.summary.totalFeatures || 0}</div>
              <p className="feature-description">New derived fields</p>
            </div>
            
            <div className="feature-summary-card">
              <h3>Feature Categories</h3>
              <div className="feature-value">{featureStatus.summary.categories || 0}</div>
              <p className="feature-description">Types of features</p>
            </div>
            
            <div className="feature-summary-card">
              <h3>Missing Values</h3>
              <div className="feature-value">{featureStatus.summary.missingValues || 0}</div>
              <p className="feature-description">Rows with missing values</p>
            </div>
          </div>

          {featureStatus.summary.details && (
            <div className="feature-summary-details">
              <h3>Feature Categories Breakdown</h3>
              <ul>
                {Object.entries(featureStatus.summary.details).map(([category, count]) => (
                  <li key={category}>
                    <strong>{category}:</strong> {count}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Output File Status */}
      {featureStatus.outputFile && (
        <section className="cleaning-section">
          <h2>Output File</h2>
          
          <div className="final-output-status">
            <div className="final-output-card">
              <div className="final-output-icon">✓</div>
              <div className="final-output-info">
                <div className="final-output-filename">{featureStatus.outputFile}</div>
                <div className="final-output-description">
                  {featureStatus.engineeringComplete 
                    ? 'Feature engineering completed successfully' 
                    : 'Output file ready for download'}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Engineering Steps Overview */}
      <section className="cleaning-section">
        <h2>Feature Engineering Steps</h2>
        <div className="cleaning-steps">
          <div className={`cleaning-step ${featureStatus.engineeringComplete ? 'complete' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Identify Base Features</h3>
              <p>Extract and validate raw features from cleaned dataset</p>
            </div>
            <div className="step-status">
              {featureStatus.engineeringComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${featureStatus.engineeringComplete ? 'complete' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Create Derived Features</h3>
              <p>Generate new features through mathematical and statistical transformations</p>
            </div>
            <div className="step-status">
              {featureStatus.engineeringComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${featureStatus.engineeringComplete ? 'complete' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Feature Validation</h3>
              <p>Validate feature quality and handle missing values</p>
            </div>
            <div className="step-status">
              {featureStatus.engineeringComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${featureStatus.engineeringComplete ? 'complete' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Export Features</h3>
              <p>Export engineered features to output dataset for analysis</p>
            </div>
            <div className="step-status">
              {featureStatus.engineeringComplete ? 'Complete' : 'Pending'}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeatureEngineering

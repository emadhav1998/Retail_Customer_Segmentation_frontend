import React, { useState } from 'react'
import { summaryAPI } from '../services/api'

function CustomerSummary() {
  const [summaryStatus, setSummaryStatus] = useState({
    generationComplete: false,
    loading: false,
    error: null,
    customerData: [],
    summaryFields: [],
    statistics: null,
    outputFile: null
  })

  const handleGenerateSummary = async () => {
    setSummaryStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await summaryAPI.generateCustomerSummary()
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        generationComplete: true,
        customerData: result.customerData || [],
        summaryFields: result.summaryFields || [],
        statistics: result.statistics || null,
        outputFile: result.outputFile || 'customer_summary.csv'
      }))
    } catch (error) {
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to generate customer summary'
      }))
    }
  }

  const handleFetchSummaryData = async () => {
    setSummaryStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await summaryAPI.getCustomerSummaryData()
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        customerData: result.customers || result.customerData || [],
        summaryFields: result.fields || result.summaryFields || [],
        statistics: result.statistics || prev.statistics
      }))
    } catch (error) {
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch customer summary data'
      }))
    }
  }

  const handleCheckStatus = async () => {
    setSummaryStatus(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const result = await summaryAPI.getCustomerSummaryStatus()
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        generationComplete: result.generationComplete || false,
        customerData: result.customerData || prev.customerData,
        statistics: result.statistics || prev.statistics,
        outputFile: result.outputFile || prev.outputFile
      }))
    } catch (error) {
      setSummaryStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to check status'
      }))
    }
  }

  return (
    <div className="data-cleaning-content">
      {/* Customer Summary Section */}
      <section className="cleaning-section">
        <h2>Customer Summary</h2>
        <p className="cleaning-description">
          Generate comprehensive customer-level summary data by aggregating transaction 
          and behavioral metrics. Create a detailed customer profile dataset that includes 
          purchase history, frequency, monetary value, and segment indicators for analysis.
        </p>

        <div className="cleaning-actions">
          <button 
            className="cleaning-button primary"
            onClick={handleGenerateSummary}
            disabled={summaryStatus.loading}
          >
            {summaryStatus.loading ? 'Generating...' : 'Generate Customer Summary'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleFetchSummaryData}
            disabled={summaryStatus.loading}
          >
            {summaryStatus.loading ? 'Loading...' : 'Preview Summary Data'}
          </button>
          <button 
            className="cleaning-button secondary"
            onClick={handleCheckStatus}
            disabled={summaryStatus.loading}
          >
            Check Status
          </button>
        </div>

        {summaryStatus.error && (
          <div className="cleaning-error">
            <strong>Error:</strong> {summaryStatus.error}
          </div>
        )}
      </section>

      {/* Summary Fields Overview */}
      {summaryStatus.summaryFields.length > 0 && (
        <section className="cleaning-section">
          <h2>Summary Fields</h2>
          <p className="cleaning-description">
            Customer-level fields included in the summary dataset:
          </p>
          
          <div className="fields-grid">
            {summaryStatus.summaryFields.map((field, index) => (
              <div key={index} className="field-card">
                <div className="field-name">{field.name}</div>
                <div className="field-type">{field.dataType}</div>
                <div className="field-description">{field.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Customer Data Preview Table */}
      {summaryStatus.customerData.length > 0 && (
        <section className="cleaning-section">
          <h2>Customer Summary Data Preview</h2>
          <p className="cleaning-description">
            First {Math.min(10, summaryStatus.customerData.length)} customer records from the generated summary:
          </p>
          
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(summaryStatus.customerData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {summaryStatus.customerData.slice(0, 10).map((customer, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(customer).map((value, cellIndex) => (
                      <td key={cellIndex}>
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {summaryStatus.customerData.length > 10 && (
            <div className="table-footer">
              <p>Showing 10 of {summaryStatus.customerData.length} total customers</p>
            </div>
          )}
        </section>
      )}

      {/* Summary Statistics */}
      {summaryStatus.statistics && (
        <section className="cleaning-section">
          <h2>Summary Statistics</h2>
          
          <div className="statistics-grid">
            <div className="statistic-card">
              <h3>Total Customers</h3>
              <div className="statistic-value">{summaryStatus.statistics.totalCustomers || 0}</div>
              <p className="statistic-description">Customer records created</p>
            </div>
            
            <div className="statistic-card">
              <h3>Avg Purchase Value</h3>
              <div className="statistic-value">${(summaryStatus.statistics.avgPurchaseValue || 0).toFixed(2)}</div>
              <p className="statistic-description">Average monetary value</p>
            </div>
            
            <div className="statistic-card">
              <h3>Avg Purchase Frequency</h3>
              <div className="statistic-value">{(summaryStatus.statistics.avgFrequency || 0).toFixed(1)}</div>
              <p className="statistic-description">Transactions per customer</p>
            </div>

            <div className="statistic-card">
              <h3>Segments Identified</h3>
              <div className="statistic-value">{summaryStatus.statistics.segmentsIdentified || 0}</div>
              <p className="statistic-description">Customer segments</p>
            </div>
          </div>

          {summaryStatus.statistics.segmentBreakdown && (
            <div className="segment-breakdown">
              <h3>Segment Breakdown</h3>
              <ul>
                {Object.entries(summaryStatus.statistics.segmentBreakdown).map(([segment, count]) => (
                  <li key={segment}>
                    <span className="segment-name">{segment}:</span>
                    <span className="segment-count">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Output File Status */}
      {summaryStatus.outputFile && (
        <section className="cleaning-section">
          <h2>Output File</h2>
          
          <div className="final-output-status">
            <div className="final-output-card">
              <div className="final-output-icon">✓</div>
              <div className="final-output-info">
                <div className="final-output-filename">{summaryStatus.outputFile}</div>
                <div className="final-output-description">
                  {summaryStatus.generationComplete 
                    ? 'Customer summary generated successfully' 
                    : 'Output file ready for download'}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Summary Generation Steps */}
      <section className="cleaning-section">
        <h2>Summary Generation Steps</h2>
        <div className="cleaning-steps">
          <div className={`cleaning-step ${summaryStatus.generationComplete ? 'complete' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Aggregate Customer Data</h3>
              <p>Group transactions by customer and calculate metrics</p>
            </div>
            <div className="step-status">
              {summaryStatus.generationComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${summaryStatus.generationComplete ? 'complete' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Calculate RFM Metrics</h3>
              <p>Compute Recency, Frequency, and Monetary value indicators</p>
            </div>
            <div className="step-status">
              {summaryStatus.generationComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${summaryStatus.generationComplete ? 'complete' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Generate Behavioral Indicators</h3>
              <p>Create behavior-based features and segment assignments</p>
            </div>
            <div className="step-status">
              {summaryStatus.generationComplete ? 'Complete' : 'Pending'}
            </div>
          </div>

          <div className={`cleaning-step ${summaryStatus.generationComplete ? 'complete' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Export Customer Summary</h3>
              <p>Save comprehensive customer profiles to output dataset</p>
            </div>
            <div className="step-status">
              {summaryStatus.generationComplete ? 'Complete' : 'Pending'}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomerSummary

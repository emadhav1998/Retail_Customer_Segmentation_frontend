import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Data Exploration API
export const explorationAPI = {
  // Start data exploration and return summary
  startExploration: async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await apiClient.post('/exploration/start', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error starting exploration:', error)
      throw error
    }
  },

  // Fetch exploration summary
  getExplorationSummary: async () => {
    try {
      const response = await apiClient.get('/exploration/summary')
      return response.data
    } catch (error) {
      console.error('Error fetching exploration summary:', error)
      throw error
    }
  },

  // Get missing values analysis
  getMissingValues: async () => {
    try {
      const response = await apiClient.get('/exploration/missing-values')
      return response.data
    } catch (error) {
      console.error('Error fetching missing values:', error)
      throw error
    }
  },

  // Get duplicate analysis
  getDuplicates: async () => {
    try {
      const response = await apiClient.get('/exploration/duplicates')
      return response.data
    } catch (error) {
      console.error('Error fetching duplicates:', error)
      throw error
    }
  },

  // Get data quality indicators
  getDataQuality: async () => {
    try {
      const response = await apiClient.get('/exploration/data-quality')
      return response.data
    } catch (error) {
      console.error('Error fetching data quality:', error)
      throw error
    }
  },

  // Get column details
  getColumnDetails: async () => {
    try {
      const response = await apiClient.get('/exploration/columns')
      return response.data
    } catch (error) {
      console.error('Error fetching column details:', error)
      throw error
    }
  }
}

// Customer Segmentation API
export const segmentationAPI = {
  // Get all segments
  getSegments: async () => {
    try {
      const response = await apiClient.get('/segmentation')
      return response.data
    } catch (error) {
      console.error('Error fetching segments:', error)
      throw error
    }
  },

  // Get segment by ID
  getSegmentById: async (segmentId) => {
    try {
      const response = await apiClient.get(`/segmentation/${segmentId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching segment:', error)
      throw error
    }
  },

  // Create new segment
  createSegment: async (segmentData) => {
    try {
      const response = await apiClient.post('/segmentation', segmentData)
      return response.data
    } catch (error) {
      console.error('Error creating segment:', error)
      throw error
    }
  },

  // Update segment
  updateSegment: async (segmentId, segmentData) => {
    try {
      const response = await apiClient.put(`/segmentation/${segmentId}`, segmentData)
      return response.data
    } catch (error) {
      console.error('Error updating segment:', error)
      throw error
    }
  },

  // Delete segment
  deleteSegment: async (segmentId) => {
    try {
      const response = await apiClient.delete(`/segmentation/${segmentId}`)
      return response.data
    } catch (error) {
      console.error('Error deleting segment:', error)
      throw error
    }
  }
}

// Dashboard API
export const dashboardAPI = {
  // Get dashboard metrics
  getMetrics: async () => {
    try {
      const response = await apiClient.get('/dashboard/metrics')
      return response.data
    } catch (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
  },

  // Get revenue trends
  getRevenueTrends: async (period) => {
    try {
      const response = await apiClient.get(`/dashboard/revenue-trends?period=${period}`)
      return response.data
    } catch (error) {
      console.error('Error fetching revenue trends:', error)
      throw error
    }
  },

  // Get customer activity
  getCustomerActivity: async () => {
    try {
      const response = await apiClient.get('/dashboard/customer-activity')
      return response.data
    } catch (error) {
      console.error('Error fetching customer activity:', error)
      throw error
    }
  }
}

// Data Cleaning API
export const cleaningAPI = {
  // Run cleaning step 1: Remove duplicates & handle missing values
  runCleaningStep1: async () => {
    try {
      const response = await apiClient.post('/cleaning/step1')
      return response.data
    } catch (error) {
      console.error('Error running cleaning step 1:', error)
      throw error
    }
  },

  // Run cleaning step 2: Data type validation
  runCleaningStep2: async () => {
    try {
      const response = await apiClient.post('/cleaning/step2')
      return response.data
    } catch (error) {
      console.error('Error running cleaning step 2:', error)
      throw error
    }
  },

  // Run cleaning step 3: Outlier detection
  runCleaningStep3: async () => {
    try {
      const response = await apiClient.post('/cleaning/step3')
      return response.data
    } catch (error) {
      console.error('Error running cleaning step 3:', error)
      throw error
    }
  },

  // Run cleaning step 4: Final validation and export
  runCleaningStep4: async () => {
    try {
      const response = await apiClient.post('/cleaning/step4')
      return response.data
    } catch (error) {
      console.error('Error running cleaning step 4:', error)
      throw error
    }
  },

  // Get cleaning job status
  getCleaningStatus: async () => {
    try {
      const response = await apiClient.get('/cleaning/status')
      return response.data
    } catch (error) {
      console.error('Error fetching cleaning status:', error)
      throw error
    }
  },

  // Get cleaning history
  getCleaningHistory: async () => {
    try {
      const response = await apiClient.get('/cleaning/history')
      return response.data
    } catch (error) {
      console.error('Error fetching cleaning history:', error)
      throw error
    }
  },

  // Download cleaned data
  downloadCleanedData: async () => {
    try {
      const response = await apiClient.get('/cleaning/download', {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading cleaned data:', error)
      throw error
    }
  },

  // Get final cleaned dataset summary
  getFinalSummary: async () => {
    try {
      const response = await apiClient.get('/cleaning/final-summary')
      return response.data
    } catch (error) {
      console.error('Error fetching final summary:', error)
      throw error
    }
  },

  // Download final cleaned data
  downloadFinalData: async () => {
    try {
      const response = await apiClient.get('/cleaning/download-final', {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading final data:', error)
      throw error
    }
  }
}

// Feature Engineering API
export const featureEngineeringAPI = {
  // Run feature engineering to create derived features
  runFeatureEngineering: async () => {
    try {
      const response = await apiClient.post('/feature-engineering/run')
      return response.data
    } catch (error) {
      console.error('Error running feature engineering:', error)
      throw error
    }
  },

  // Get derived fields created by feature engineering
  getDerivedFields: async () => {
    try {
      const response = await apiClient.get('/feature-engineering/derived-fields')
      return response.data
    } catch (error) {
      console.error('Error fetching derived fields:', error)
      throw error
    }
  },

  // Get feature engineering status
  getFeatureEngineeringStatus: async () => {
    try {
      const response = await apiClient.get('/feature-engineering/status')
      return response.data
    } catch (error) {
      console.error('Error fetching feature engineering status:', error)
      throw error
    }
  },

  // Get feature engineering summary
  getFeatureSummary: async () => {
    try {
      const response = await apiClient.get('/feature-engineering/summary')
      return response.data
    } catch (error) {
      console.error('Error fetching feature summary:', error)
      throw error
    }
  },

  // Download engineered features dataset
  downloadEngineeringOutput: async () => {
    try {
      const response = await apiClient.get('/feature-engineering/download', {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading engineered features:', error)
      throw error
    }
  }
}

// Customer Summary API
export const summaryAPI = {
  // Generate customer summary data
  generateCustomerSummary: async () => {
    try {
      const response = await apiClient.post('/summary/generate')
      return response.data
    } catch (error) {
      console.error('Error generating customer summary:', error)
      throw error
    }
  },

  // Get customer summary data
  getCustomerSummaryData: async () => {
    try {
      const response = await apiClient.get('/summary/data')
      return response.data
    } catch (error) {
      console.error('Error fetching customer summary data:', error)
      throw error
    }
  },

  // Get customer summary generation status
  getCustomerSummaryStatus: async () => {
    try {
      const response = await apiClient.get('/summary/status')
      return response.data
    } catch (error) {
      console.error('Error fetching customer summary status:', error)
      throw error
    }
  },

  // Get customer summary statistics
  getCustomerSummaryStatistics: async () => {
    try {
      const response = await apiClient.get('/summary/statistics')
      return response.data
    } catch (error) {
      console.error('Error fetching customer summary statistics:', error)
      throw error
    }
  },

  // Download customer summary dataset
  downloadCustomerSummary: async () => {
    try {
      const response = await apiClient.get('/summary/download', {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading customer summary:', error)
      throw error
    }
  }
}

// RFM Analysis API
export const rfmAPI = {
  // Run recency calculation with reference date
  runRecencyCalculation: async (referenceDate) => {
    try {
      const response = await apiClient.post('/rfm/recency', { referenceDate })
      return response.data
    } catch (error) {
      console.error('Error running recency calculation:', error)
      throw error
    }
  },

  // Get recency preview data
  getRecencyPreview: async () => {
    try {
      const response = await apiClient.get('/rfm/recency-preview')
      return response.data
    } catch (error) {
      console.error('Error fetching recency preview:', error)
      throw error
    }
  },

  // Get RFM analysis status
  getRFMStatus: async () => {
    try {
      const response = await apiClient.get('/rfm/status')
      return response.data
    } catch (error) {
      console.error('Error fetching RFM status:', error)
      throw error
    }
  },

  // Run frequency calculation
  runFrequencyCalculation: async () => {
    try {
      const response = await apiClient.post('/rfm/frequency')
      return response.data
    } catch (error) {
      console.error('Error running frequency calculation:', error)
      throw error
    }
  },

  // Run monetary calculation
  runMonetaryCalculation: async () => {
    try {
      const response = await apiClient.post('/rfm/monetary')
      return response.data
    } catch (error) {
      console.error('Error running monetary calculation:', error)
      throw error
    }
  },

  // Get RFM scores
  getRFMScores: async () => {
    try {
      const response = await apiClient.get('/rfm/scores')
      return response.data
    } catch (error) {
      console.error('Error fetching RFM scores:', error)
      throw error
    }
  },

  // Download RFM analysis results
  downloadRFMResults: async () => {
    try {
      const response = await apiClient.get('/rfm/download', {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error downloading RFM results:', error)
      throw error
    }
  }
}

export default apiClient
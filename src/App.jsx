import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Overview from './pages/Overview'
import Dashboard from './pages/Dashboard'
import SegmentAnalysis from './pages/SegmentAnalysis'
import DataProfile from './pages/DataProfile'
import DataCleaning from './pages/DataCleaning'
import './styles.css'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/segments" element={<SegmentAnalysis />} />
          <Route path="/data-profile" element={<DataProfile />} />
          <Route path="/data-cleaning" element={<DataCleaning />} />
        </Routes>
      </DashboardLayout>
    </Router>
  )
}

export default App

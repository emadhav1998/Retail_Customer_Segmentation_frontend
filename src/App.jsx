import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Overview from './pages/Overview'
import Dashboard from './pages/Dashboard'
import SegmentAnalysis from './pages/SegmentAnalysis'
import './styles.css'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/segments" element={<SegmentAnalysis />} />
        </Routes>
      </DashboardLayout>
    </Router>
  )
}

export default App

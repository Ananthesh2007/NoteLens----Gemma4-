import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Results from './pages/Results'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [studyData, setStudyData] = useState(null)

  const handleAnalysisComplete = (data) => {
    setStudyData(data)
    setCurrentScreen('results')
  }

  const handleReset = () => {
    setStudyData(null)
    setCurrentScreen('home')
  }

  return (
    <div className="app-container">
      <Navbar onReset={handleReset} />

      <main className="main-content">
        {currentScreen === 'home' ? (
          <Home onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <Results data={studyData} onBack={handleReset} />
        )}
      </main>
    </div>
  )
}

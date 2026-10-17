import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'

export default function Home({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setError(null)
  }

  const handleError = (msg) => {
    setError(msg)
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">NoteLens</h1>
        <p className="hero-tagline">
          Turn your handwritten or printed notes into clear study guides, summaries, key takeaways, and practice quizzes in seconds.
        </p>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button className="error-close-btn" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="card upload-card">
        <ImageUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          error={error}
          onError={handleError}
        />
      </div>
    </div>
  )
}

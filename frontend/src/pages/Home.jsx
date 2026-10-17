import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'

export default function Home({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setError(null)
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  const handleError = (msg) => {
    setError(msg)
  }

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Please select or drop an image first.')
      return
    }

    setIsGenerating(true)
    setError(null)

    // Placeholder until api.js connection in Member 3 / Integration step
    try {
      // Temporary simulated delay for UI verification
      setTimeout(() => {
        setIsGenerating(false)
        if (onAnalysisComplete) {
          onAnalysisComplete({
            explanation: 'This is a sample explanation of your notes.',
            summary: 'Concise summary of the key concepts discussed.',
            important_points: ['Definition 1', 'Key formula', 'Crucial theorem'],
            questions: [
              { question: 'What is the main topic?', answer: 'The uploaded study notes.' }
            ]
          })
        }
      }, 1500)
    } catch (err) {
      setIsGenerating(false)
      setError('Failed to generate study material. Please try again.')
    }
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
          onClearFile={handleClearFile}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          onError={handleError}
        />
      </div>
    </div>
  )
}

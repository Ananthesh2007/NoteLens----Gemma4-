import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import LoadingIndicator from '../components/LoadingIndicator'
import ErrorMessage from '../components/ErrorMessage'
import { analyseNotes } from '../services/api'

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

    try {
      const studyData = await analyseNotes(selectedFile)
      setIsGenerating(false)
      if (onAnalysisComplete) {
        onAnalysisComplete(studyData)
      }
    } catch (err) {
      setIsGenerating(false)
      setError(err.message || 'Failed to generate study material. Please verify FastAPI and Ollama are running.')
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
        <ErrorMessage
          message={error}
          onDismiss={() => setError(null)}
          onRetry={selectedFile ? handleGenerate : null}
        />
      )}

      <div className="card upload-card">
        {isGenerating ? (
          <LoadingIndicator />
        ) : (
          <ImageUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClearFile={handleClearFile}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onError={handleError}
          />
        )}
      </div>
    </div>
  )
}

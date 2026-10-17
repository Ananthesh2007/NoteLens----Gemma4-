import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import LoadingIndicator from '../components/LoadingIndicator'
import ErrorMessage from '../components/ErrorMessage'

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
      // Simulated generation delay (will connect to backend api.js in Member 3 timetable)
      setTimeout(() => {
        setIsGenerating(false)
        if (onAnalysisComplete) {
          onAnalysisComplete({
            explanation: 'These study notes outline foundational concepts. Key principles are clearly highlighted with logical structure, making revision straightforward. The notes focus on theoretical definitions and their practical applications.',
            summary: 'The uploaded notes cover core definitions, fundamental formulas, and exam-focused takeaways structured for rapid review.',
            important_points: [
              'Core principle: Every system maintains equilibrium under standard conditions.',
              'Fundamental equation: Ensure variables are normalized before calculation.',
              'Critical theorem: Boundary conditions must be evaluated at state transitions.',
              'Exam tip: Always verify units and state assumptions explicitly.'
            ],
            questions: [
              {
                question: 'What is the primary condition required to maintain equilibrium in the system?',
                answer: 'Standard state conditions must be maintained continuously.'
              },
              {
                question: 'Why must variables be normalized prior to applying the fundamental equation?',
                answer: 'To prevent dimensional inconsistencies across varying scale factors.'
              },
              {
                question: 'At which point should the boundary conditions be evaluated?',
                answer: 'At state transitions during the dynamic process.'
              },
              {
                question: 'What is the most crucial verification step recommended for exams?',
                answer: 'Verifying measurement units and clearly noting state assumptions.'
              },
              {
                question: 'How do theoretical definitions map to real-world applications in this context?',
                answer: 'They establish mathematical bounds that govern physical system behaviors.'
              }
            ]
          })
        }
      }, 2500)
    } catch (err) {
      setIsGenerating(false)
      setError('Failed to reach backend server. Please verify FastAPI is running on port 8000.')
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

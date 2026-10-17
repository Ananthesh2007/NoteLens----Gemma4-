import React, { useState, useEffect } from 'react'

export default function LoadingIndicator({ stageText }) {
  // Cycle helpful progress messages so the user knows the AI is working
  const steps = [
    'Scanning and reading your notes...',
    'Analyzing handwritten and printed text...',
    'Synthesizing explanation and summary...',
    'Extracting key points and definitions...',
    'Drafting 5 practice questions and answers...'
  ]

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="loading-container">
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner-outer"></div>
        <div className="loading-spinner-inner"></div>
        <span className="loading-icon">🤖</span>
      </div>

      <h3 className="loading-title">Analyzing Your Notes</h3>
      <p className="loading-subtitle">
        {stageText || steps[currentStepIndex]}
      </p>

      <div className="loading-progress-track">
        <div className="loading-progress-bar"></div>
      </div>

      <p className="loading-note">
        This usually takes a few seconds as the multimodal AI reads the content.
      </p>
    </div>
  )
}

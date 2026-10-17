import React from 'react'
import SummaryCard from '../components/SummaryCard'
import ExplanationCard from '../components/ExplanationCard'
import KeyPointsCard from '../components/KeyPointsCard'

export default function Results({ data, onBack }) {
  if (!data) {
    return (
      <div className="card text-center" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h2>No study data found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 1.5rem' }}>
          Please upload a notes image to generate study material.
        </p>
        <button className="btn" onClick={onBack}>
          Upload Notes
        </button>
      </div>
    )
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <div>
          <h1 className="results-title">Study Material</h1>
          <p className="results-subtitle">Generated from your uploaded study notes</p>
        </div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Upload Another Note
        </button>
      </div>

      <div className="results-grid">
        {/* Quick Summary Card */}
        {data.summary && <SummaryCard summary={data.summary} />}

        {/* Detailed Explanation Card */}
        {data.explanation && <ExplanationCard explanation={data.explanation} />}

        {/* Important Points & Definitions Card */}
        {data.important_points && <KeyPointsCard points={data.important_points} />}

        {/* Practice Quiz will be integrated in Slot 11:45–12:15 */}
      </div>
    </div>
  )
}

import React from 'react'

export default function Results({ data, onBack }) {
  return (
    <div className="results-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem' }}>Study Material</h1>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Upload Another Note
        </button>
      </div>

      <div className="card">
        <p style={{ color: 'var(--text-muted)' }}>
          [Explanation, Summary, Key Points, and Quiz Cards - Scheduled for upcoming timetable slots]
        </p>
      </div>
    </div>
  )
}

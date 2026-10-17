import React from 'react'

export default function SummaryCard({ summary }) {
  if (!summary) return null

  return (
    <div className="card result-card summary-card">
      <div className="card-header">
        <div className="card-header-title">
          <span className="card-icon">📌</span>
          <h3>Quick Summary</h3>
        </div>
        <span className="card-badge summary-badge">TL;DR</span>
      </div>

      <div className="card-body">
        <div className="summary-highlight-box">
          <p className="summary-text">{summary}</p>
        </div>
      </div>
    </div>
  )
}

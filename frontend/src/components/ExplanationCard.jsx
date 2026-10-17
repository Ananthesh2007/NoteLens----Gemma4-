import React from 'react'

export default function ExplanationCard({ explanation }) {
  if (!explanation) return null

  // If explanation is multi-line, render clean paragraphs
  const paragraphs = Array.isArray(explanation)
    ? explanation
    : explanation.split('\n\n').filter((p) => p.trim().length > 0)

  return (
    <div className="card result-card explanation-card">
      <div className="card-header">
        <div className="card-header-title">
          <span className="card-icon">💡</span>
          <h3>Concept Explanation</h3>
        </div>
        <span className="card-badge">Detailed Breakdown</span>
      </div>

      <div className="card-body">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="explanation-paragraph">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

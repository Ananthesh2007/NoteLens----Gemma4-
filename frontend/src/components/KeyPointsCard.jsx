import React from 'react'

export default function KeyPointsCard({ points }) {
  if (!points || points.length === 0) return null

  // Ensure points is an array (handle string with bullet points if received from raw text)
  const items = Array.isArray(points)
    ? points
    : points.split('\n').filter((item) => item.trim().length > 0)

  return (
    <div className="card result-card key-points-card">
      <div className="card-header">
        <div className="card-header-title">
          <span className="card-icon">🔑</span>
          <h3>Important Points & Key Concepts</h3>
        </div>
        <span className="card-badge">{items.length} Key Takeaways</span>
      </div>

      <div className="card-body">
        <ul className="key-points-list">
          {items.map((point, index) => {
            // Clean markdown bullet prefixes if any
            const cleanedPoint = point.replace(/^[-*•\d+.]\s*/, '')
            return (
              <li key={index} className="key-point-item">
                <span className="point-number">{index + 1}</span>
                <span className="point-text">{cleanedPoint}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

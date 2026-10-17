import React from 'react'

export default function Navbar({ onReset }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onReset} style={{ cursor: 'pointer' }}>
          <span className="navbar-logo">📝</span>
          <span className="navbar-title">NoteLens</span>
        </div>
        <div className="navbar-tagline">
          AI Study Assistant
        </div>
      </div>
    </header>
  )
}

import React from 'react'

export default function ErrorMessage({ message, type = 'error', onDismiss, onRetry }) {
  if (!message) return null

  // Determine icon and theme based on type or content
  let icon = '⚠️'
  let errorTitle = 'Something went wrong'

  if (message.toLowerCase().includes('size') || message.toLowerCase().includes('large')) {
    icon = '📁'
    errorTitle = 'File Too Large'
  } else if (message.toLowerCase().includes('format') || message.toLowerCase().includes('image')) {
    icon = '🖼️'
    errorTitle = 'Invalid File Type'
  } else if (message.toLowerCase().includes('backend') || message.toLowerCase().includes('connection') || message.toLowerCase().includes('failed')) {
    icon = '🔌'
    errorTitle = 'Connection Error'
  } else if (message.toLowerCase().includes('unreadable') || message.toLowerCase().includes('blur')) {
    icon = '🔍'
    errorTitle = 'Unclear Image'
  }

  return (
    <div className={`alert-card alert-${type}`} role="alert">
      <div className="alert-icon-box">{icon}</div>

      <div className="alert-content">
        <h4 className="alert-heading">{errorTitle}</h4>
        <p className="alert-message">{message}</p>
      </div>

      <div className="alert-actions">
        {onRetry && (
          <button type="button" className="alert-btn alert-btn-retry" onClick={onRetry}>
            Retry
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            className="alert-btn alert-btn-close"
            onClick={onDismiss}
            aria-label="Close notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

import React, { useState, useRef } from 'react'

export default function ImageUpload({ onFileSelect, selectedFile, error, onError }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateAndSelect = (file) => {
    if (!file) return

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      if (onError) onError('Please upload a valid image file (PNG, JPG, JPEG, WEBP).')
      return
    }

    if (onError) onError(null)
    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(e.target.files[0])
    }
  }

  const handleClickUploadArea = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="upload-section">
      <div
        className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUploadArea}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          style={{ display: 'none' }}
        />

        <div className="upload-content">
          <div className="upload-icon">📷</div>
          <h3 className="upload-title">
            {selectedFile ? 'Change selected image' : 'Upload your study notes'}
          </h3>
          <p className="upload-subtitle">
            Drag & drop your notes image here, or <span className="browse-link">browse files</span>
          </p>
          <p className="upload-hint">Supports PNG, JPG, JPEG, WEBP (Handwritten or Printed)</p>
          {selectedFile && (
            <p className="selected-filename">
              Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

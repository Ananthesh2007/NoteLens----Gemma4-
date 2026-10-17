import React, { useState, useRef, useEffect } from 'react'

export default function ImageUpload({
  onFileSelect,
  selectedFile,
  onClearFile,
  onGenerate,
  isGenerating,
  onError
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  // Max 10MB file limit
  const MAX_FILE_SIZE = 10 * 1024 * 1024

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

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

    // Validate MIME type
    if (!file.type.startsWith('image/')) {
      if (onError) onError('Invalid file format. Please upload a PNG, JPG, JPEG, or WEBP image.')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      if (onError) onError('File is too large. Maximum allowed size is 10MB.')
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
    <div className="upload-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        style={{ display: 'none' }}
      />

      {!selectedFile ? (
        /* Empty Upload Zone */
        <div
          className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClickUploadArea}
        >
          <div className="upload-content">
            <div className="upload-icon">📸</div>
            <h3 className="upload-title">Upload your study notes</h3>
            <p className="upload-subtitle">
              Drag & drop your notes here, or <span className="browse-link">browse files</span>
            </p>
            <p className="upload-hint">Supports PNG, JPG, JPEG, WEBP up to 10MB</p>
          </div>
        </div>
      ) : (
        /* Image Preview & Actions Area */
        <div className="preview-container">
          <div className="preview-header">
            <div className="preview-meta">
              <span className="file-badge">Image Ready</span>
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
            <button
              type="button"
              className="btn-text-danger"
              onClick={onClearFile}
              disabled={isGenerating}
              title="Remove image"
            >
              ✕ Remove
            </button>
          </div>

          <div className="preview-image-wrapper">
            <img src={previewUrl} alt="Notes preview" className="preview-image" />
          </div>

          <div className="preview-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClickUploadArea}
              disabled={isGenerating}
            >
              🔄 Change Image
            </button>
            <button
              type="button"
              className="btn btn-primary btn-generate"
              onClick={onGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner-sm"></span> Analysing Notes...
                </>
              ) : (
                <>✨ Generate Study Material</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

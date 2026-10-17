const BACKEND_URL = 'http://localhost:8000'

/**
 * Checks if the backend and local Ollama model are available.
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/notes/health`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    throw new Error('Backend server is not reachable. Ensure FastAPI is running on port 8000.')
  }
}

/**
 * Uploads notes image to the backend for AI analysis using local gemma4:e4b.
 * @param {File} file - The selected image file
 * @returns {Promise<Object>} Structured study material
 */
export async function analyseNotes(file) {
  if (!file) {
    throw new Error('Please select an image file first.')
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${BACKEND_URL}/api/notes/analyse`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const errorMessage =
        data?.detail || `Server error (${response.status}). Please try again.`
      throw new Error(errorMessage)
    }

    if (!data || !data.data) {
      throw new Error('Received invalid data from backend analysis.')
    }

    return data.data
  } catch (error) {
    // If it was already an Error thrown above, re-throw it
    if (error.message) {
      throw error
    }
    throw new Error('Failed to connect to backend server. Make sure FastAPI is running on http://localhost:8000.')
  }
}

import React, { useState } from 'react'

export default function QuizCard({ questions }) {
  if (!questions || questions.length === 0) return null

  // State to track which question answers are revealed (set of indices)
  const [revealedIndices, setRevealedIndices] = useState(new Set())

  const toggleAnswer = (index) => {
    setRevealedIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleShowAll = () => {
    setRevealedIndices(new Set(questions.map((_, i) => i)))
  }

  const handleHideAll = () => {
    setRevealedIndices(new Set())
  }

  const allRevealed = revealedIndices.size === questions.length

  return (
    <div className="card result-card quiz-card">
      <div className="card-header">
        <div className="card-header-title">
          <span className="card-icon">🧠</span>
          <h3>Practice Quiz</h3>
        </div>
        <div className="quiz-header-actions">
          <span className="card-badge quiz-badge">{questions.length} Questions</span>
          <button
            type="button"
            className="btn-toggle-all"
            onClick={allRevealed ? handleHideAll : handleShowAll}
          >
            {allRevealed ? 'Hide All Answers' : 'Reveal All Answers'}
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="quiz-instructions">
          Test yourself on the material from your notes. Try to answer in your head before revealing the solution!
        </p>

        <div className="quiz-list">
          {questions.map((item, index) => {
            const isRevealed = revealedIndices.has(index)
            const questionText = typeof item === 'string' ? item : item.question
            const answerText = typeof item === 'string' ? null : item.answer

            return (
              <div key={index} className="quiz-item">
                <div className="quiz-question-row">
                  <span className="quiz-q-badge">Q{index + 1}</span>
                  <div className="quiz-question-content">
                    <p className="quiz-question-text">{questionText}</p>
                  </div>
                  {answerText && (
                    <button
                      type="button"
                      className={`btn-answer-toggle ${isRevealed ? 'active' : ''}`}
                      onClick={() => toggleAnswer(index)}
                    >
                      {isRevealed ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  )}
                </div>

                {answerText && isRevealed && (
                  <div className="quiz-answer-box">
                    <div className="quiz-answer-header">
                      <span className="answer-icon">✓</span>
                      <strong>Correct Answer:</strong>
                    </div>
                    <p className="quiz-answer-text">{answerText}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

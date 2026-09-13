import { useState } from 'react'
import { QUESTIONS } from '../data/questions'
import { TOTAL_QUESTIONS } from '../logic/quiz'
import { PressRule } from '../art/BureauChrome'
import type { BureauState } from '../state/store'

const LETTERS = ['A', 'B', 'C', 'D']

export function QuizPage({
  bureau,
  navigate,
}: {
  bureau: {
    state: BureauState
    setQuizAnswers: (a: Record<string, number>) => void
  }
  navigate: (to: string) => void
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(bureau.state.quizAnswers)

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] != null).length
  const firstUnanswered = QUESTIONS.find((q) => answers[q.id] == null)
  const current = firstUnanswered ?? QUESTIONS[QUESTIONS.length - 1]
  const done = answeredCount === TOTAL_QUESTIONS

  const pick = (qid: string, idx: number) => {
    const next = { ...answers, [qid]: idx }
    setAnswers(next)
    bureau.setQuizAnswers(next)
  }

  return (
    <div className="page page-narrow">
      <div className="head-block">
        <p className="kicker">Form 12Q · Personality Assessment</p>
        <h1 className="headline-lg">The Personality Test</h1>
        <p className="deck">
          Answer honestly. The Bureau has calibration instruments older than your birth certificate and
          no patience for strategic answering.
        </p>
      </div>

      <div className="quiz-progress" aria-hidden="true">
        {QUESTIONS.map((q, i) => (
          <i key={q.id} className={answers[q.id] != null ? 'done' : q === current ? 'now' : ''} title={`Question ${i + 1}`} />
        ))}
      </div>

      <div className="panel">
        <p className="quiz-qno">
          Question {current.number} of {TOTAL_QUESTIONS}
        </p>
        <h2 className="quiz-question">{current.question}</h2>
        {current.note && <p className="quiz-note">{current.note}</p>}

        <div className="quiz-options">
          {current.options.map((opt, idx) => (
            <button key={idx} className="quiz-option" onClick={() => pick(current.id, idx)}>
              <span className="opt-letter">{LETTERS[idx]}</span>
              <span>
                <span className="opt-label">{opt.label}</span>
                {opt.detail && <span className="opt-detail"> — {opt.detail}</span>}
              </span>
            </button>
          ))}
        </div>

        <PressRule />

        <div className="row-between">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/register')}>
            Abandon test, choose manually
          </button>
          <span className="small muted">
            {answeredCount}/{TOTAL_QUESTIONS} answered
          </span>
          <button
            className={`btn ${done ? 'btn-green' : ''}`}
            disabled={!done}
            onClick={() => navigate('/discovery')}
          >
            {done ? 'File the assessment' : 'Answer all twelve'}
          </button>
        </div>
      </div>
    </div>
  )
}

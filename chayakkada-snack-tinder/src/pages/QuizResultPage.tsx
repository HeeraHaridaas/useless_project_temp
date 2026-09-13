import { useEffect } from 'react'
import { FoodPortrait } from '../art/FoodPortrait'
import { BureauSeal, RubberStamp, Tape } from '../art/BureauChrome'
import { CATEGORY_LABELS, type Food } from '../data/foods'
import { scoreQuiz, TOTAL_QUESTIONS } from '../logic/quiz'
import { AXIS_LABELS, QUESTIONS, type TraitAxis } from '../data/questions'
import type { BureauState } from '../state/store'

export function QuizResultPage({
  bureau,
  navigate,
}: {
  bureau: {
    state: BureauState
    registerIdentity: (food: Food, source: 'quiz', answers?: Record<string, number>) => void
  }
  navigate: (to: string) => void
}) {
  const answers = bureau.state.quizAnswers
  const answered = QUESTIONS.filter((q) => answers[q.id] != null).length

  useEffect(() => {
    if (answered < TOTAL_QUESTIONS) navigate('/quiz')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered])

  if (answered < TOTAL_QUESTIONS) return null

  const result = scoreQuiz(answers)
  const { topFood, runnerUp, thirdPlace, topAxisLabel } = result

  const axisRows = (['lowkey', 'loud', 'trad', 'chaos', 'sweet'] as TraitAxis[]).map((axis) => ({
    axis,
    label: AXIS_LABELS[axis],
    value: result.axisScores.get(axis) ?? 0,
  }))
  const axisMax = Math.max(1, ...axisRows.map((r) => r.value))

  const accept = () => {
    bureau.registerIdentity(topFood, 'quiz', answers)
    navigate('/swipe')
  }

  return (
    <div className="page page-narrow">
      <div className="report-sheet">
        <div className="sheet-head">
          <p className="sh-org">
            Chayakkada Food Bureau
            <span>Department of Edible Affairs · Assessment Cell</span>
          </p>
          <p className="sh-meta">
            Form 12R: Finding<br />
            Instruments calibrated quarterly<br />
            Kettle: on
          </p>
        </div>

        <p className="kicker">Assessment complete. The instruments have spoken.</p>
        <h1 className="report-title">WHO YOU REALLY ARE</h1>

        <div className="report-stamp-row">
          <div className="score-plate">
            <span className="sp-num">{topFood.boiling}</span>
            <span className="sp-cap">Boiling Point</span>
          </div>
          <div>
            <p className="upper-label">Registered identity located</p>
            <h2 className="headline-md serif">{topFood.name}</h2>
            <p className="small muted">{CATEGORY_LABELS[topFood.category]} · File No. {topFood.regNo}</p>
          </div>
          <RubberStamp lines={['IDENTITY', 'CONFIRMED']} tone="green" rotate={-6} size="md" />
        </div>

        <div className="profile-portrait" style={{ maxWidth: 380, margin: '18px auto' }}>
          <div className="pp-frame">
            <FoodPortrait food={topFood} size={280} />
          </div>
          <p className="pp-cap">
            <span>Subject {topFood.regNo}</span>
            <span>{topFood.home}</span>
          </p>
        </div>

        <div className="verdict-block">
          <p className="vb-cap">Assessment verdict</p>
          <p>
            <b>{topFood.name}.</b> {topFood.bio}
          </p>
        </div>

        <div className="verdict-block maroon">
          <p className="vb-cap">Dominant axis: {topAxisLabel}</p>
          <p>
            The instruments measured your temperament against five official axes. Your dominant
            reading is <b>{topAxisLabel}</b>. The Bureau has matched this reading against the register
            and the match is {topFood.name}. Objections may be submitted verbally to the kettle.
          </p>
        </div>

        <div className="section-label">Instrument readings</div>
        <div className="axis-block">
          {axisRows.map((r) => (
            <div key={r.axis} className="axis-row">
              <span className="axis-label">{r.label}</span>
              <span className="axis-track">
                <i style={{ width: `${Math.round((r.value / axisMax) * 100)}%` }} />
              </span>
              <span className="axis-val">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="section-label">Closest identities not assigned</div>
        <div className="match-row mr-tint">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FoodPortrait food={runnerUp} size={72} />
          </div>
          <div>
            <p className="mr-name">{runnerUp.name}</p>
            <p className="mr-summary">{runnerUp.short}</p>
          </div>
          <div className="mr-score">
            <b>2nd</b>
            <span>runner-up</span>
          </div>
        </div>
        <div className="match-row">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FoodPortrait food={thirdPlace} size={72} />
          </div>
          <div>
            <p className="mr-name">{thirdPlace.name}</p>
            <p className="mr-summary">{thirdPlace.short}</p>
          </div>
          <div className="mr-score">
            <b>3rd</b>
            <span>third place</span>
          </div>
          <Tape label="Reviewed" />
        </div>

        <div className="report-stamp-row" style={{ justifyContent: 'space-between', marginTop: 26 }}>
          <div className="row">
            <button className="btn btn-green btn-lg" onClick={accept}>
              Accept this identity
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/quiz')}>
              Re-take the assessment
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/register')}>
              Choose from the register instead
            </button>
          </div>
          <BureauSeal size={104} />
        </div>
      </div>
    </div>
  )
}

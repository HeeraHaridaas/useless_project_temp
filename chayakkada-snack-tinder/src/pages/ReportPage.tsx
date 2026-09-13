import { useEffect, useMemo, useRef } from 'react'
import { FoodPortrait } from '../art/FoodPortrait'
import { BureauSeal, RubberStamp, Tape } from '../art/BureauChrome'
import { CATEGORY_LABELS, type Food } from '../data/foods'
import { buildReport } from '../logic/compat'
import type { BureauState } from '../state/store'

type Bureau = {
  state: BureauState
  closeCase: ReturnType<typeof import('../state/store').useBureau>['closeCase']
  reset: () => void
}

const REQUIRED = 12

export function ReportPage({
  bureau,
  navigate,
}: {
  bureau: Bureau
  foods: Food[]
  navigate: (to: string) => void
}) {
  const { identity, swipes, openToWork, lastReport } = bureau.state
  const eligible = !!identity && swipes.length >= REQUIRED

  // All hooks run unconditionally, in the same order, every render.
  const report = useMemo(
    () => (identity && eligible ? buildReport(identity.food, swipes, openToWork) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [identity?.food.id, identity?.source, swipes.length, openToWork, eligible],
  )

  useEffect(() => {
    if (!identity) {
      navigate('/register')
    } else if (swipes.length < REQUIRED) {
      navigate('/swipe')
    }
  }, [identity, swipes.length, navigate])

  // Archive the report exactly once per identity/swipe-set.
  const archiveRef = useRef<string | null>(null)
  useEffect(() => {
    if (!report || !identity) return
    const key = `${identity.food.id}:${report.caseId}`
    if (archiveRef.current === key) return
    archiveRef.current = key
    if (lastReport && lastReport.caseId === report.caseId && lastReport.foodId === identity.food.id) return
    bureau.closeCase({
      foodId: identity.food.id,
      foodName: identity.food.name,
      source: identity.source,
      swipes,
      openToWork,
      bestId: report.best.food.id,
      bestScore: report.best.score,
      worstId: report.worst.food.id,
      worstScore: report.worst.score,
      classification: report.best.classification,
      caseId: report.caseId,
      headline: report.headline,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report?.caseId, identity?.food.id])

  if (!identity || !report) return null

  const rights = swipes.filter((s) => s.direction === 'right').length

  return (
    <div className="page">
      <div className="report-sheet">
        <div className="sheet-head">
          <p className="sh-org">
            Chayakkada Food Bureau
            <span>Final Report · Department of Edible Affairs</span>
          </p>
          <p className="sh-meta">
            Case {report.caseId}
            <br />
            Certified: {report.certifiedBy}
          </p>
        </div>

        <p className="kicker">Form 12F · The Final Food Dating Report</p>
        <h1 className="report-title">{report.headline}</h1>

        <div className="report-stamp-row">
          <div className="score-plate">
            <span className="sp-num">{report.best.score}</span>
            <span className="sp-cap">Top score</span>
          </div>
          <div>
            <p className="upper-label">Subject of report</p>
            <h2 className="headline-md serif">{identity.food.name}</h2>
            <p className="small muted">
              {CATEGORY_LABELS[identity.food.category]} · {swipes.length} swipes reviewed · {rights}{' '}
              interest{rights === 1 ? '' : 's'} declared
            </p>
          </div>
          <RubberStamp lines={[report.stampText]} tone="red" rotate={-6} size="lg" />
        </div>

        <div className="perf-edge mt-2" />

        <div className="duo-grid mt-3">
          <div>
            <div className="section-label mt-0">Best match</div>
            <div className="match-row" style={{ gridTemplateColumns: '80px 1fr' }}>
              <FoodPortrait food={report.best.food} size={78} />
              <div>
                <p className="mr-name">{report.best.food.name}</p>
                <p className="mr-cat">{report.best.classification}</p>
                <p>
                  <span className="serif" style={{ fontSize: 26 }}>{report.best.score}</span>{' '}
                  <span className="small muted">percent</span>
                </p>
              </div>
            </div>
            <p className="small mt-1">{report.best.explanation}</p>
          </div>
          <div>
            <div className="section-label mt-0">Worst match</div>
            <div className="match-row mr-tint" style={{ gridTemplateColumns: '80px 1fr' }}>
              <div style={{ transform: 'rotate(-5deg)' }}>
                <FoodPortrait food={report.worst.food} size={74} />
              </div>
              <div>
                <p className="mr-name">{report.worst.food.name}</p>
                <p className="mr-cat">{report.worst.classification}</p>
                <p>
                  <span className="serif" style={{ fontSize: 26 }}>{report.worst.score}</span>{' '}
                  <span className="small muted">percent</span>
                </p>
              </div>
            </div>
            <p className="small mt-1">
              {report.worst.summary} {report.worst.verdict}
            </p>
          </div>
        </div>

        <div className="verdict-block">
          <p className="vb-cap">Relationship classification</p>
          <p>
            Based on boiling points, tradition overlap and your conduct at the deck, the Bureau
            classifies your most viable relationship as <b>{report.best.classification}</b>. This
            classification is printed in triplicate. One copy is yours. One copy is the kettle's.
          </p>
        </div>

        <div className="verdict-block maroon">
          <p className="vb-cap">Dramatic decision</p>
          <p>
            {report.openToWork
              ? `Having confirmed that you are open to work, the Bureau has decided that ${identity.food.name} deserves a companion who understands deadlines and evening tea equally. ${report.best.food.name} has been notified by memo. There is no withdrawing now.`
              : `The Bureau has decided, on your behalf, that you are open to work. It has also decided that ${identity.food.name} and ${report.best.food.name} will be introduced at 4:45 pm at Bench No. 2. Attendance is optional. Consequences are not.`}
          </p>
        </div>

        <div className="section-label">Full standings · Every food in the Foodverse</div>
        <table className="rank-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Food</th>
              <th>Category</th>
              <th>Classification</th>
              <th style={{ textAlign: 'right' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {report.full.map((m, i) => (
              <tr key={m.food.id}>
                <td>{i + 1}</td>
                <td>
                  <a
                    href={`#/food/${m.food.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/food/${m.food.id}`)
                    }}
                    style={{ fontWeight: 700 }}
                  >
                    {m.food.name}
                  </a>
                </td>
                <td>{CATEGORY_LABELS[m.food.category]}</td>
                <td>{m.classification}</td>
                <td className="rt-score" style={{ textAlign: 'right' }}>
                  {m.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="verdict-block mt-3">
          <p className="vb-cap">A note from the clerk</p>
          <p>
            {report.openToWorkNote} The Bureau thanks you for your cooperation, reminds you that the
            umbrella from Public Notice 3 remains unclaimed, and declares this file closed.
          </p>
        </div>

        <div className="report-stamp-row mt-3" style={{ justifyContent: 'space-between' }}>
          <div className="row">
            <button className="btn btn-green" onClick={() => navigate('/swipe')}>
              Return to the deck
            </button>
            <button className="btn" onClick={() => navigate('/cases')}>
              View case files
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                bureau.reset()
                navigate('/')
              }}
            >
              Surrender identity, start over
            </button>
          </div>
          <BureauSeal size={110} />
        </div>

        <div className="perf-edge" />
        <Tape label="Do not fold. The Bureau will know." />
      </div>
    </div>
  )
}

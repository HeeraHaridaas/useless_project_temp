import { useEffect } from 'react'
import { FoodPortrait } from '../art/FoodPortrait'
import { BureauSeal, TeaStain } from '../art/BureauChrome'
import { CATEGORY_LABELS, type Food } from '../data/foods'
import { buildReport } from '../logic/compat'
import type { BureauState } from '../state/store'

export function VerdictPage({
  bureau,
  foods,
  navigate,
}: {
  bureau: { state: BureauState; setOpenToWork: (v: boolean) => void }
  foods: Food[]
  navigate: (to: string) => void
}) {
  const { identity, swipes, openToWork } = bureau.state
  const REQUIRED = 12

  useEffect(() => {
    if (!identity) navigate('/register')
  }, [identity, navigate])

  if (!identity) return null

  const report = buildReport(identity.food, swipes, openToWork)
  const best = report.best
  const worst = report.worst
  const rights = swipes.filter((s) => s.direction === 'right').length

  return (
    <div className="page page-narrow">
      <div className="report-sheet">
        <div className="sheet-head">
          <p className="sh-org">
            Chayakkada Food Bureau
            <span>Match Verdict Office · Counter 3</span>
          </p>
          <p className="sh-meta">
            Form 9: Compatibility Findings
            <br />
            Swipes examined: {swipes.length}
          </p>
        </div>

        <p className="kicker">The Match Verdict Office has reviewed your conduct at the deck.</p>
        <h1 className="report-title">YOUR MATCH HAS BEEN SERVED</h1>

        <div className="verdict-block">
          <p className="vb-cap">Regarding</p>
          <p>
            <b>{identity.food.name}</b>, File No. {identity.food.regNo}, hereinafter "the interested
            party", reviewed {swipes.length} foods and exercised {rights} right{rights === 1 ? '' : 's'}{' '}
            of interest. The Bureau has computed compatibility against every food in the Foodverse and
            now delivers its findings with the usual gravity.
          </p>
        </div>

        <div className="section-label">Finding 1 · The Bureau's preferred candidate</div>
        <div className="match-row" style={{ gridTemplateColumns: '110px 1fr auto', alignItems: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <FoodPortrait food={best.food} size={100} />
          </div>
          <div>
            <p className="mr-name">{best.food.name}</p>
            <p className="mr-cat">
              {CATEGORY_LABELS[best.food.category]} · File {best.food.regNo} · BP {best.food.boiling}
            </p>
            <p className="mr-summary">{best.summary}</p>
            <p className="small mt-1">{best.explanation}</p>
            <div className="score-track">
              <i style={{ width: `${best.score}%` }} />
            </div>
          </div>
          <div className="mr-score">
            <b>{best.score}</b>
            <span>percent</span>
          </div>
        </div>

        <div className="verdict-block">
          <p className="vb-cap">Dramatic decision No. 1</p>
          <p>
            The Bureau hereby <b>{best.score >= 85 ? 'approves' : 'conditionally approves'}</b> the
            union of {identity.food.name} and {best.food.name}. The couple may expect{' '}
            {best.score >= 85 ? 'a long and structurally sound' : 'a workable, occasionally crunchy'}{' '}
            future, subject to kettle availability and mutual tolerance of crunch volumes.
          </p>
        </div>

        <div className="section-label">Finding 2 · The Bureau's advisory against</div>
        <div className="match-row mr-tint" style={{ gridTemplateColumns: '110px 1fr auto', alignItems: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ transform: 'rotate(-6deg)' }}>
              <FoodPortrait food={worst.food} size={92} />
            </div>
          </div>
          <div>
            <p className="mr-name">{worst.food.name}</p>
            <p className="mr-cat">
              {CATEGORY_LABELS[worst.food.category]} · File {worst.food.regNo} · BP {worst.food.boiling}
            </p>
            <p className="mr-summary">{worst.summary}</p>
          </div>
          <div className="mr-score">
            <b>{worst.score}</b>
            <span>percent</span>
          </div>
        </div>

        <div className="verdict-block maroon">
          <p className="vb-cap">Dramatic decision No. 2</p>
          <p>
            The Bureau hereby <b>advises against</b> {identity.food.name} and {worst.food.name} being
            seated together, sharing a plate, or sharing feelings. Should they meet anyway, the Bureau
            requests advance notice so a clerk can be present. With tea.
          </p>
        </div>

        <div className="section-label">Finding 3 · A personal question</div>
        <div className="panel panel-tint">
          <h3 className="panel-title">Are you, personally, open to work?</h3>
          <p className="small muted">
            The Bureau asks everyone this. The answer adjusts the tone of your final report only. It
            has no bearing on the mathematics. The mathematics is beyond all of us.
          </p>
          <div className="row mt-2">
            <button className={`btn ${openToWork === true ? 'btn-green' : ''}`} onClick={() => bureau.setOpenToWork(true)}>
              Yes, open to work
            </button>
            <button className={`btn ${openToWork === false ? 'btn-maroon' : ''}`} onClick={() => bureau.setOpenToWork(false)}>
              No, closed for maintenance
            </button>
          </div>
        </div>

        <div className="report-stamp-row mt-4" style={{ justifyContent: 'space-between' }}>
          <button
            className="btn btn-green btn-lg"
            disabled={swipes.length < REQUIRED}
            title={swipes.length < REQUIRED ? `Review ${REQUIRED - swipes.length} more foods before the report` : undefined}
            onClick={() => navigate('/report')}
          >
            {swipes.length < REQUIRED ? `Final report at ${REQUIRED} reviews` : 'Proceed to the final report'}
          </button>
          <div className="row">
            <button className="btn btn-ghost" onClick={() => navigate('/swipe')}>
              Back to the deck
            </button>
            <BureauSeal size={92} />
          </div>
        </div>
      </div>
      <TeaStain className="stain-verdict" />
    </div>
  )
}

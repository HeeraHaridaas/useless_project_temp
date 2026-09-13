import { FoodPortrait } from '../art/FoodPortrait'
import { RubberStamp } from '../art/BureauChrome'
import type { BureauState } from '../state/store'
import { foodById } from '../state/store'

export function CaseFilesPage({
  bureau,
  foods,
  navigate,
}: {
  bureau: { state: BureauState; forgetCase: (id: string) => void }
  foods: import('../data/foods').Food[]
  navigate: (to: string) => void
}) {
  const { cases, identity } = bureau.state

  return (
    <div className="page">
      <div className="head-block">
        <p className="kicker">Records Room · Handle with oiled hands</p>
        <h1 className="headline-lg">Case Files</h1>
        <p className="deck">
          Every final report the Bureau has issued to you, kept on file in this drawer. Files are
          stored in the same drawer as the sugar. This is intentional.
        </p>
      </div>

      {cases.length === 0 ? (
        <div className="panel center">
          <h2 className="headline-md">The drawer is empty</h2>
          <p className="muted mt-1">
            No reports have been issued to you yet. The Bureau does not issue reports for effort alone.
          </p>
          <div className="row mt-2" style={{ justifyContent: 'center' }}>
            <button className="btn btn-green" onClick={() => navigate('/swipe')}>
              Go make some decisions
            </button>
          </div>
        </div>
      ) : (
        <div>
          {cases.map((c) => {
            const best = foodById(c.bestId, bureau.state.customFoods)
            const worst = foodById(c.worstId, bureau.state.customFoods)
            return (
              <div className="case-card" key={c.id}>
                <div className="cc-date">
                  {new Date(c.closedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  <br />
                  {c.caseId}
                </div>
                <div>
                  <p className="cc-title">{c.foodName} · {c.headline}</p>
                  <p className="cc-sub">
                    Best: <b>{best?.name ?? 'unknown'}</b> ({c.bestScore}) · Worst:{' '}
                    <b>{worst?.name ?? 'unknown'}</b> ({c.worstScore}) · {c.classification}
                  </p>
                  <p className="cc-sub">
                    {c.swipes.length} swipes · {c.openToWork ? 'Open to work, by declaration' : 'Open to work, by Bureau decision'}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  {best && <FoodPortrait food={best} size={64} />}
                  <RubberStamp lines={['CLOSED']} tone="green" rotate={-6} size="sm" />
                </div>
                <div>
                  <button className="btn btn-ghost btn-sm" onClick={() => bureau.forgetCase(c.id)}>
                    Shred
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="row mt-3">
        <button className="btn" onClick={() => navigate('/')}>Bureau home</button>
        {identity && (
          <button className="btn btn-ghost" onClick={() => navigate(`/food/${identity.food.id}`)}>
            Your current file
          </button>
        )}
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { FoodPortrait } from '../art/FoodPortrait'
import { RubberStamp, TeaStain } from '../art/BureauChrome'
import { CATEGORY_LABELS, CATEGORY_ORDER, type Food } from '../data/foods'
import type { BureauState } from '../state/store'

export function RegisterPage({
  bureau,
  foods,
  navigate,
}: {
  bureau: { state: BureauState; registerIdentity: (food: Food, source: 'chosen') => void }
  foods: Food[]
  navigate: (to: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(bureau.state.identity?.food.id ?? null)
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return foods.filter((f) => {
      if (filter !== 'all' && f.category !== filter) return false
      if (q && !(`${f.name} ${f.short}`.toLowerCase().includes(q))) return false
      return true
    })
  }, [foods, filter, query])

  const selectedFood = foods.find((f) => f.id === selected) ?? null

  return (
    <div className="page">
      <div className="head-block">
        <p className="kicker">Form 2A · Identity Assumption</p>
        <h1 className="headline-lg">Registration Counter</h1>
        <p className="deck">
          Review the register and assume an identity. Selection is permanent until you select a
          different one. The clerk has seen people switch three times in one afternoon. It is fine.
        </p>
      </div>

      <div className="counter-layout">
        <div>
          <input
            className="search-input"
            type="search"
            placeholder="Search the register, e.g. parotta"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search foods"
          />
          <div className="filter-bar">
            <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All ({foods.length})
            </button>
            {CATEGORY_ORDER.map((c) => {
              const n = foods.filter((f) => f.category === c).length
              if (n === 0) return null
              return (
                <button key={c} className={`filter-chip ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                  {CATEGORY_LABELS[c]} ({n})
                </button>
              )
            })}
          </div>

          <div className="food-grid">
            {filtered.map((f) => (
              <button
                key={f.id}
                className={`food-tile ${selected === f.id ? 'selected' : ''}`}
                onClick={() => setSelected(f.id)}
              >
                <span className="tile-cat">{CATEGORY_LABELS[f.category]} · {f.regNo}</span>
                <span className="tile-name">{f.name}</span>
                <span className="tile-short">{f.short}</span>
                <span className="tile-boil">
                  <i style={{ width: `${f.boiling}%` }} />
                  <em>BP {f.boiling}</em>
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="muted">
                Nothing on the register matches that. The clerk suggests registering a new food, or
                settling down.
              </p>
            )}
          </div>
        </div>

        <aside className="reg-summary">
          <p className="rs-title">Counter Slip</p>
          <div className="rs-preview">
            {selectedFood ? (
              <FoodPortrait food={selectedFood} size={180} />
            ) : (
              <p className="small muted center">
                Select a food from the register to preview your assumed identity.
              </p>
            )}
          </div>
          {selectedFood ? (
            <>
              <p className="rs-name">{selectedFood.name}</p>
              <p className="rs-meta">
                {CATEGORY_LABELS[selectedFood.category]} · Reg. {selectedFood.regNo} · Boiling point{' '}
                {selectedFood.boiling}
              </p>
              <p className="small muted mb-2">{selectedFood.short}</p>
              <button
                className="btn btn-green"
                style={{ width: '100%' }}
                onClick={() => {
                  if (!selectedFood) return
                  bureau.registerIdentity(selectedFood, 'chosen')
                  navigate(`/food/${selectedFood.id}`)
                }}
              >
                Assume this identity
              </button>
              <button className="btn btn-ghost btn-sm mt-1" style={{ width: '100%' }} onClick={() => navigate('/quiz')}>
                Unsure? Take the test instead
              </button>
            </>
          ) : (
            <button className="btn" style={{ width: '100%' }} disabled>
              Awaiting selection
            </button>
          )}
          <TeaStain className="stain-counter" />
        </aside>
      </div>

      <div className="report-stamp-row mt-4">
        <RubberStamp lines={['COUNTER', 'NO. 1']} tone="green" rotate={-4} size="sm" />
        <p className="small muted">
          Identities are assumed, not assigned. The Bureau distinguishes carefully between the two.
        </p>
      </div>
    </div>
  )
}

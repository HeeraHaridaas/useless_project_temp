import { useEffect, useMemo, useRef, useState } from 'react'
import { FoodPortrait } from '../art/FoodPortrait'
import { RubberStamp } from '../art/BureauChrome'
import { CATEGORY_LABELS, type Food } from '../data/foods'
import type { BureauState, SwipeDirection } from '../state/store'

const RELEASE_THRESHOLD = 96
const REQUIRED_SWIPES = 12

function seededShuffle<T>(arr: T[], seedStr: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const rand = () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) % 10000) / 10000
  }
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SwipePage({
  bureau,
  foods,
  navigate,
}: {
  bureau: {
    state: BureauState
    recordSwipe: (foodId: string, dir: SwipeDirection) => void
  }
  foods: Food[]
  navigate: (to: string) => void
}) {
  const { identity, swipes } = bureau.state

  const deck = useMemo(() => {
    if (!identity) return []
    const seed = `${identity.food.id}-${identity.since}`
    const others = foods.filter((f) => f.id !== identity.food.id)
    const swiped = new Set(swipes.map((s) => s.foodId))
    return seededShuffle(others, seed).filter((f) => !swiped.has(f.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity?.food.id, identity?.since, foods.length, swipes.length])

  const current = deck[0]
  const upNext = deck[1]
  const cardRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{ x: number; y: number; active: boolean } | null>(null)
  const [stamped, setStamped] = useState<'left' | 'right' | null>(null)
  const [flying, setFlying] = useState<SwipeDirection | null>(null)

  const reviewed = swipes.length
  const totalOthers = foods.length - (identity ? 1 : 0)

  // Guard: need an identity to swipe
  useEffect(() => {
    if (!identity) navigate('/register')
  }, [identity, navigate])

  if (!identity) return null

  const applyTransform = (x: number, y: number, rot: number) => {
    const el = cardRef.current
    if (el) el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (flying) return
    dragRef.current = { x: e.clientX, y: e.clientY, active: true }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d?.active) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    applyTransform(dx, dy, dx * 0.06)
    setStamped(dx < -RELEASE_THRESHOLD * 0.6 ? 'left' : dx > RELEASE_THRESHOLD * 0.6 ? 'right' : null)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d?.active) return
    dragRef.current = null
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > RELEASE_THRESHOLD) {
      commit(dx > 0 ? 'right' : 'left')
    } else {
      const el = cardRef.current
      if (el) {
        el.style.transition = 'transform 220ms cubic-bezier(.2,.8,.3,1)'
        applyTransform(0, 0, 0)
        window.setTimeout(() => {
          if (el) el.style.transition = ''
        }, 240)
      }
      setStamped(null)
    }
  }

  const commit = (dir: SwipeDirection) => {
    if (!current || flying) return
    setFlying(dir)
    setStamped(dir === 'left' ? 'left' : 'right')
    const el = cardRef.current
    if (el) {
      el.style.transition = 'transform 300ms ease-in, opacity 300ms ease-in'
      const x = dir === 'right' ? 640 : -640
      applyTransform(x, 60, dir === 'right' ? 24 : -24)
      el.style.opacity = '0'
    }
    window.setTimeout(() => {
      bureau.recordSwipe(current.id, dir)
      if (el) {
        el.style.transition = ''
        el.style.opacity = ''
        applyTransform(0, 0, 0)
      }
      setStamped(null)
      setFlying(null)
    }, 300)
  }

  const buttonSwipe = (dir: SwipeDirection) => {
    if (flying) return
    const el = cardRef.current
    if (el) el.style.transition = ''
    commit(dir)
  }

  const doneReviewing = reviewed >= REQUIRED_SWIPES
  const deckExhausted = deck.length === 0

  // ----- Guards -----
  if (deckExhausted) {
    return (
      <div className="page page-narrow">
        <div className="deck-empty">
          <div className="panel">
            <h2 className="headline-lg">The stack is finished</h2>
            <p className="deck mt-2">
              You have reviewed all {reviewed} foods currently willing to be reviewed. The clerk has
              collected your slips and is walking them to the verdict office as we speak.
            </p>
            <div className="row mt-3" style={{ justifyContent: 'center' }}>
              <button className="btn btn-green btn-lg" onClick={() => navigate('/verdict')}>
                Receive the verdict
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const progressPct = Math.min(100, Math.round((reviewed / REQUIRED_SWIPES) * 100))

  return (
    <div className="page">
      <div className="head-block">
        <p className="kicker">Review Desk · Swiping in progress</p>
        <h1 className="headline-lg">The Foodverse Deck</h1>
        <p className="deck">
          You are reviewing as <b>{identity.food.name}</b> (File No. {identity.food.regNo}). Drag the
          card or use the buttons. Right means interest. Left means the Bureau writes it down.
        </p>
      </div>

      <div className="swipe-layout">
        <div>
          <div className="deck-stage">
            {upNext && <div className="deck-next" aria-hidden="true" />}
            <div
              ref={cardRef}
              className={`deck-card ${stamped ? 'stamped' : ''}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ cursor: flying ? 'default' : 'grab' }}
            >
              <div className="dc-top">
                <span className="dc-cat">{CATEGORY_LABELS[current.category]}</span>
                <span className="dc-reg">FILE {current.regNo}</span>
              </div>

              <div className="dc-portrait">
                <FoodPortrait food={current} size={210} />
              </div>

              <h2 className="dc-name">{current.name}</h2>
              <p className="dc-tag">{current.tagline}</p>

              <div className="dc-traits">
                {current.traits.slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
                <span style={{ background: 'var(--mustard)' }}>BP {current.boiling}</span>
              </div>

              <p className="dc-quote">Noted: partial to {current.likes[0]}. Wary of {current.dislikes[0]}.</p>

              <span className="swipe-stamp nope">REJECTED</span>
              <span className="swipe-stamp liked">INTERESTED</span>
            </div>
          </div>

          <div className="deck-actions">
            <button className="swipe-btn reject" aria-label="Swipe left: reject" disabled={!!flying} onClick={() => buttonSwipe('left')}>
              ←
            </button>
            <button className="swipe-btn accept" aria-label="Swipe right: interested" disabled={!!flying} onClick={() => buttonSwipe('right')}>
              →
            </button>
          </div>

          <div className="progress-block mt-2">
            <div className="pb-label">
              <span>Bureau review progress</span>
              <span>
                {reviewed}/{REQUIRED_SWIPES} required · {totalOthers} in universe
              </span>
            </div>
            <div className="pb-track">
              <i style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="row mt-2" style={{ justifyContent: 'center' }}>
            <button
              className={`btn ${doneReviewing ? 'btn-green' : ''}`}
              disabled={!doneReviewing}
              title={doneReviewing ? undefined : `Review ${REQUIRED_SWIPES - reviewed} more foods first`}
              onClick={() => navigate('/verdict')}
            >
              {doneReviewing ? 'Send to the verdict office' : `Verdict opens at ${REQUIRED_SWIPES} reviews`}
            </button>
            {reviewed > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/verdict')} disabled={!doneReviewing}>
                Peek at partial verdict
              </button>
            )}
          </div>
        </div>

        <aside className="deck-log">
          <div className="panel">
            <p className="dl-title">Clerk's Slip · Live</p>
            {swipes.length === 0 ? (
              <p className="small muted">
                No decisions recorded yet. The clerk has sharpened a pencil for the occasion.
              </p>
            ) : (
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {[...swipes].reverse().map((s) => {
                  const f = foods.find((x) => x.id === s.foodId)
                  if (!f) return null
                  return (
                    <div className="log-row" key={s.foodId}>
                      <span>{f.name}</span>
                      <span className={`lr-verdict ${s.direction === 'right' ? 'yes' : 'no'}`}>
                        {s.direction === 'right' ? 'INTERESTED' : 'REJECTED'}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
            <p className="small muted mt-2">
              {reviewed < 4
                ? 'The Bureau recommends reviewing at least a dozen before expecting conclusions.'
                : reviewed < REQUIRED_SWIPES
                  ? 'A pattern is forming. The clerk refuses to speculate before the required count.'
                  : 'Sufficient evidence collected. The verdict office is warming its stamp.'}
            </p>
          </div>

          <div className="landmark-note mt-2">
            <b>House rules</b>
            Decisions are recorded permanently for this identity. To start over, surrender the identity
            from the Bureau home and register afresh.
          </div>

          <div className="report-stamp-row mt-2" style={{ justifyContent: 'center' }}>
            <RubberStamp lines={['DECK', 'IN USE']} tone="green" rotate={-5} size="sm" />
          </div>
        </aside>
      </div>
    </div>
  )
}

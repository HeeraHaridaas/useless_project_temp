import { BureauSeal, Handwritten, RubberStamp, Tape, TeaStain } from '../art/BureauChrome'
import { FoodPortrait } from '../art/FoodPortrait'
import { CATEGORY_LABELS, type Food } from '../data/foods'
import { computeCompatibility } from '../logic/compat'
import type { BureauState } from '../state/store'

export function ProfilePage({
  bureau,
  foods,
  id,
  navigate,
}: {
  bureau: { state: BureauState }
  foods: Food[]
  id: string
  navigate: (to: string) => void
}) {
  const food = foods.find((f) => f.id === id)
  if (!food) {
    return (
      <div className="page page-narrow">
        <div className="panel center">
          <h2 className="headline-md">File not located</h2>
          <p className="muted mt-1">
            The Bureau searched the register, the drawer, and behind the kettle. Nothing. It may have
            been eaten.
          </p>
          <button className="btn btn-green mt-2" onClick={() => navigate('/register')}>
            Back to the register
          </button>
        </div>
      </div>
    )
  }

  const { identity, swipes } = bureau.state
  const isSelf = identity?.food.id === food.id
  const rightSwipes = swipes.filter((s) => s.direction === 'right').length

  const standing = identity && !isSelf ? computeCompatibility(identity.food, food, swipes) : null

  return (
    <div className="page">
      <div className="crumbs">
        <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Food Bureau</a>
        <span>/</span>
        <a href="#/register" onClick={(e) => { e.preventDefault(); navigate('/register') }}>Register</a>
        <span>/</span>
        <span className="crumb-here">{food.name}</span>
      </div>

      <div className="profile-grid">
        <div>
          <div className="profile-portrait">
            <Tape label="Bureau photograph" />
            <div className="pp-frame">
              <FoodPortrait food={food} size={300} />
            </div>
            <p className="pp-cap">
              <span>Subject {food.regNo}</span>
              <span>BP {food.boiling}</span>
            </p>
          </div>

          <div className="report-stamp-row" style={{ justifyContent: 'center' }}>
            <RubberStamp lines={food.stampLabel.split('\n')} tone="red" rotate={-7} size="sm" />
            <BureauSeal size={92} text="SNACK COMPATIBILITY DEPT." />
          </div>

          <div className="landmark-note mt-2">
            <b>Bureau observation</b>
            <Handwritten tilt={-1}>
              {rightSwipes} right swipe{rightSwipes === 1 ? '' : 's'} on your record this session. The
              clerk is watching. Not judging. Watching.
            </Handwritten>
          </div>
          <TeaStain className="stain-profile" />
        </div>

        <div>
          <div className="head-block">
            <p className="kicker">Personality Dossier · {CATEGORY_LABELS[food.category]}</p>
            <h1 className="headline-xl">{food.name}</h1>
            <p className="deck">{food.short}</p>
            <div className="byline-row">
              <span>Home: {food.home}</span>
              <span>File No. {food.regNo}</span>
            </div>
          </div>

          {standing && identity && (
            <div className="panel panel-tint mb-3">
              <div className="row-between">
                <div>
                  <p className="upper-label maroon">Standing with you, {identity.food.name}</p>
                  <h3 className="headline-md serif mt-1">{standing.classification}</h3>
                </div>
                <div className="score-plate" style={{ padding: '8px 16px' }}>
                  <span className="sp-num" style={{ fontSize: 34 }}>{standing.score}</span>
                  <span className="sp-cap">Score</span>
                </div>
              </div>
              <p className="small mt-1">{standing.summary}</p>
            </div>
          )}

          <div className="panel mb-3">
            <h3 className="panel-title">The File</h3>
            <p>{food.bio}</p>
          </div>

          <div className="section-label">Temperament</div>
          <div className="trait-row">
            {food.traits.map((t) => (
              <span key={t} className="trait-chip">{t}</span>
            ))}
          </div>

          <div className="duo-grid mt-3">
            <div className="panel">
              <h3 className="panel-title green">Green Flags</h3>
              <ul className="flag-list flag-green">
                {food.greenFlags.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3 className="panel-title maroon">Red Flags</h3>
              <ul className="flag-list flag-red">
                {food.redFlags.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="section-label">Recorded preferences</div>
          <div className="panel">
            <div className="likedislike">
              <div>
                <dt>Likes</dt>
                {food.likes.map((l) => (
                  <dd key={l}>{l}</dd>
                ))}
              </div>
              <div className="ld-dislikes">
                <dt>Dislikes</dt>
                {food.dislikes.map((d) => (
                  <dd key={d}>{d}</dd>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {isSelf ? (
              <button className="btn btn-green" onClick={() => navigate('/swipe')}>
                Enter the deck as {food.name}
              </button>
            ) : identity ? (
              <button className="btn btn-maroon" onClick={() => navigate('/swipe')}>
                Back to reviewing
              </button>
            ) : (
              <button className="btn" onClick={() => navigate('/register')}>
                Register an identity to meet this food
              </button>
            )}
            <button className="btn btn-ghost" onClick={() => navigate('/')}>Bureau home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

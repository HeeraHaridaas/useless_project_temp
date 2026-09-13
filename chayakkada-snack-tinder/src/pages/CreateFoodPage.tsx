import { useMemo, useState } from 'react'
import type { Food, FoodCategory } from '../data/foods'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../data/foods'
import { RubberStamp, TeaStain } from '../art/BureauChrome'
import { nextRegNo } from '../logic/foodUtils'
import type { BureauState } from '../state/store'

type BulletKey = 'traits' | 'greenFlags' | 'redFlags' | 'likes' | 'dislikes'

const BULLET_LABELS: Record<BulletKey, string> = {
  traits: 'Personality traits',
  greenFlags: 'Green flags',
  redFlags: 'Red flags',
  likes: 'Likes',
  dislikes: 'Dislikes',
}

const BULLET_PLACEHOLDERS: Record<BulletKey, string> = {
  traits: 'e.g. mysteriously moist',
  greenFlags: 'e.g. always available at bus stands',
  redFlags: 'e.g. goes cold without warning',
  likes: 'e.g. evening rain on tin roofs',
  dislikes: 'e.g. being compared to its rival',
}

export function CreateFoodPage({
  bureau,
  navigate,
}: {
  bureau: {
    state: BureauState
    addCustomFood: (food: Food) => void
    registerIdentity: (food: Food, source: 'created') => void
  }
  navigate: (to: string) => void
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<FoodCategory>('fried snack')
  const [short, setShort] = useState('')
  const [bio, setBio] = useState('')
  const [tagline, setTagline] = useState('')
  const [boiling, setBoiling] = useState(60)
  const [bullets, setBullets] = useState<Record<BulletKey, string[]>>({
    traits: [],
    greenFlags: [],
    redFlags: [],
    likes: [],
    dislikes: [],
  })
  const [drafts, setDrafts] = useState<Record<BulletKey, string>>({
    traits: '',
    greenFlags: '',
    redFlags: '',
    likes: '',
    dislikes: '',
  })
  const [error, setError] = useState<string | null>(null)

  const takenIds = useMemo(
    () => new Set(bureau.state.customFoods.map((f) => f.id)),
    [bureau.state.customFoods],
  )

  const slugFromName = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'food'

  const addBullet = (key: BulletKey) => {
    const v = drafts[key].trim()
    if (!v) return
    if (bullets[key].length >= 6) {
      setError(`Maximum six entries for ${BULLET_LABELS[key].toLowerCase()}. The Bureau has limits.`)
      return
    }
    setError(null)
    setBullets((b) => ({ ...b, [key]: [...b[key], v] }))
    setDrafts((d) => ({ ...d, [key]: '' }))
  }

  const removeBullet = (key: BulletKey, i: number) => {
    setBullets((b) => ({ ...b, [key]: b[key].filter((_, idx) => idx !== i) }))
  }

  const bulletNote = (key: BulletKey) => {
    const n = bullets[key].length
    return n === 0 ? 'At least one required' : `${n} on file`
  }

  const submit = () => {
    if (name.trim().length < 2) {
      setError('A food needs a name. Two letters minimum. The Bureau checked.')
      return
    }
    if (!short.trim() || !bio.trim() || !tagline.trim()) {
      setError('Short description, bio and tagline are mandatory. Brevity is not an excuse.')
      return
    }
    const needsOne: BulletKey[] = ['traits', 'greenFlags', 'redFlags', 'likes', 'dislikes']
    const missing = needsOne.filter((k) => bullets[k].length === 0)
    if (missing.length > 0) {
      setError(`Add at least one entry for: ${missing.map((k) => BULLET_LABELS[k].toLowerCase()).join(', ')}.`)
      return
    }
    const base = slugFromName(name)
    let id = base
    let n = 2
    while (takenIds.has(id)) id = `${base}-${n++}`
    const food: Food = {
      id,
      name: name.trim(),
      home: 'Registered at the counter, this year',
      regNo: nextRegNo(bureau.state.customFoods.length),
      category,
      short: short.trim(),
      bio: bio.trim(),
      tagline: tagline.trim(),
      traits: bullets.traits,
      greenFlags: bullets.greenFlags,
      redFlags: bullets.redFlags,
      likes: bullets.likes,
      dislikes: bullets.dislikes,
      boiling,
      stampLabel: 'NEWLY\nREGISTERED',
    }
    bureau.addCustomFood(food)
    bureau.registerIdentity(food, 'created')
    navigate(`/food/${food.id}`)
  }

  return (
    <div className="page">
      <div className="head-block">
        <p className="kicker">Form 7 · New Food Registration</p>
        <h1 className="headline-lg">Register a New Food</h1>
        <p className="deck">
          If the register does not contain you, the register is wrong. Fill Form 7 in your own hand.
          Fields marked with an asterisk are mandatory because the clerk said so.
        </p>
      </div>

      <div className="form-sheet">
        {error && (
          <div className="form-error mb-2" role="alert">
            {error}
          </div>
        )}

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="cf-name">Name of food <em>*</em></label>
            <input
              id="cf-name"
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Beef Cutlet, Lime Juice, Ada Pradhaman"
            />
          </div>

          <div className="form-field">
            <label htmlFor="cf-cat">Bureau category <em>*</em></label>
            <select id="cf-cat" value={category} onChange={(e) => setCategory(e.target.value as FoodCategory)}>
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field full">
            <label htmlFor="cf-short">One-line character certificate <em>*</em></label>
            <input
              id="cf-short"
              value={short}
              maxLength={90}
              onChange={(e) => setShort(e.target.value)}
              placeholder="One dry sentence about who this food is"
            />
            <span className="form-counter">{short.length}/90</span>
          </div>

          <div className="form-field full">
            <label htmlFor="cf-bio">Full bio for the file <em>*</em></label>
            <textarea
              id="cf-bio"
              rows={5}
              value={bio}
              maxLength={600}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Where it comes from, how it behaves at funerals, what it thinks of the other foods. The clerk will read it aloud once."
            />
            <span className="form-counter">{bio.length}/600</span>
          </div>

          <div className="form-field full">
            <label htmlFor="cf-tag">Tagline, as it will be quoted <em>*</em></label>
            <input
              id="cf-tag"
              value={tagline}
              maxLength={80}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Arrives late. Leaves crumbs. Worth it."
            />
          </div>

          <div className="form-field full">
            <label htmlFor="cf-boil">Declared boiling point: <b>{boiling}</b> (0 = chilled soul, 100 = kettle rage)</label>
            <input
              id="cf-boil"
              type="range"
              min={30}
              max={100}
              value={boiling}
              onChange={(e) => setBoiling(Number(e.target.value))}
            />
            <span className="ff-hint">
              This number decides half your compatibility maths. Choose with feeling.
            </span>
          </div>

          {(Object.keys(BULLET_LABELS) as BulletKey[]).map((key) => (
            <div className="form-field full" key={key}>
              <label htmlFor={`cf-${key}`}>
                {BULLET_LABELS[key]} <em>*</em>
                <span className="form-counter" style={{ marginLeft: 10 }}>
                  {bulletNote(key)}
                </span>
              </label>
              <div className="bullet-input">
                <input
                  id={`cf-${key}`}
                  value={drafts[key]}
                  maxLength={80}
                  onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addBullet(key)
                    }
                  }}
                  placeholder={BULLET_PLACEHOLDERS[key]}
                />
                <button type="button" className="btn btn-sm" onClick={() => addBullet(key)}>
                  Add
                </button>
              </div>
              {bullets[key].length > 0 && (
                <ul className="bullet-list">
                  {bullets[key].map((item, i) => (
                    <li key={`${item}-${i}`}>
                      <span>{item}</span>
                      <button type="button" onClick={() => removeBullet(key, i)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="report-stamp-row mt-3" style={{ justifyContent: 'space-between' }}>
          <div className="row">
            <button className="btn btn-green btn-lg" onClick={submit}>
              Submit Form 7
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/register')}>
              Cancel, use the register
            </button>
          </div>
          <RubberStamp lines={['FORM 7', 'RECEIVED']} tone="red" rotate={-5} size="sm" />
        </div>

        <TeaStain className="stain-form" />
      </div>

      <p className="small muted mt-2">
        On approval, the Bureau issues a registration number in the 900 series, reserves the right to
        lose the file twice, and enters your food into the Foodverse deck immediately.
      </p>
    </div>
  )
}

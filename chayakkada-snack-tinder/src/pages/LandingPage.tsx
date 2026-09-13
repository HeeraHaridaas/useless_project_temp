import { BureauSeal, Handwritten, NoticePin, RubberStamp, Tape, TeaStain } from '../art/BureauChrome'
import { FoodPortrait } from '../art/FoodPortrait'
import type { BureauState } from '../state/store'
import type { Food } from '../data/foods'

export function LandingPage({
  bureau,
  foods,
  navigate,
}: {
  bureau: { state: BureauState; reset: () => void }
  foods: Food[]
  navigate: (to: string) => void
}) {
  const { identity } = bureau.state
  const featured = foods.find((f) => f.id === 'chaya') ?? foods[0]

  return (
    <div className="page">
      <div className="noticeboard">
        <div className="board-frame-top">
          <span className="institute">
            The Chayakkada Food Bureau <span>·</span> Snack Compatibility Department
          </span>
          <span className="est">Regd. Office: Bench No. 2, Near Bus Stand · Est. 1938</span>
        </div>

        <div className="landing-grid">
          <div className="landing-masthead">
            <p className="mal">ചായക്കട ഭക്ഷ്യ ബ്യൂറോ</p>
            <h1 className="landing-title">
              KERALA
              <br />
              SNACK
              <br />
              <span className="outline">TINDER</span>
            </h1>
            <p className="landing-deck">
              Food identity registration is now open. Select a food. Discover your personality. Make
              several questionable decisions. The Bureau will document all of it, in duplicate.
            </p>
            <p className="landing-sub">
              Swipe rights issued daily. Left swipes stamped without ceremony.
            </p>
            <div className="byline-row">
              <span>Form 4B: Edible Affairs</span>
              <Tape label="Dept. of Boiling Points" />
            </div>
            <TeaStain className="stain-hero" />
          </div>

          <div className="entry-sheet">
            <h3>Registration Counter</h3>
            <p className="sheet-sub">Choose one. The queue is imaginary.</p>

            <button className="entry-item" onClick={() => navigate('/register')}>
              <span className="entry-no">1</span>
              <span>
                <span className="entry-name">Choose your food</span>
                <span className="entry-desc">
                  Select from the register of {foods.length} certified identities. Know yourself
                  already? The counter respects that.
                </span>
              </span>
              <span className="entry-arrow">→</span>
            </button>

            <button className="entry-item" onClick={() => navigate('/quiz')}>
              <span className="entry-no">2</span>
              <span>
                <span className="entry-name">Take the personality test</span>
                <span className="entry-desc">
                  Twelve questions. Your answers determine which snack you have been all along.
                </span>
              </span>
              <span className="entry-arrow">→</span>
            </button>

            <button className="entry-item" onClick={() => navigate('/new-food')}>
              <span className="entry-no">3</span>
              <span>
                <span className="entry-name">Register a new food</span>
                <span className="entry-desc">
                  Not on the list? Fill Form 7 and create yourself. The Bureau is open-minded.
                </span>
              </span>
              <span className="entry-arrow">→</span>
            </button>

            {identity ? (
              <div className="mt-3">
                <div className="form-success">
                  Registered as <b>{identity.food.name}</b>. File No. {identity.food.regNo}.
                </div>
                <div className="row mt-2">
                  <button className="btn btn-green btn-sm" onClick={() => navigate('/swipe')}>
                    Return to the deck
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/food/${identity.food.id}`)}>
                    View your file
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      bureau.reset()
                      navigate('/')
                    }}
                  >
                    Surrender identity
                  </button>
                </div>
              </div>
            ) : (
              <p className="small muted mt-3">
                <Handwritten tilt={-1.5}>No file on record. The clerk is waiting. Politely.</Handwritten>
              </p>
            )}
          </div>
        </div>

        <div className="landing-duo mt-4">
          <div className="landmark-note">
            <b>How the Bureau works</b>
            You register a food identity. You then review the other foods of the Foodverse, one card at
            a time. Right swipe means interest. Left swipe means the Bureau permanently notes it.
          </div>
          <div className="landmark-note">
            <b>What you receive</b>
            A compatibility score for every food, a best match, a worst match, a classification, a
            dramatic decision, and a final report stamped by an official who may or may not exist.
          </div>
        </div>

        <div className="notices">
          <div className="notice-card">
            <NoticePin tone="red" />
            <span className="notice-tag">Public Notice</span>
            <h4>The deck is not rigged</h4>
            <p>
              Compatibility is computed from boiling points, category affairs, tradition overlap and
              your own swipe conduct. Ask for a recount and the clerk will point at the kettle.
            </p>
          </div>
          <div className="notice-card">
            <NoticePin tone="green" />
            <span className="notice-tag">Exam Result</span>
            <h4>Personality, as determined by carbohydrates</h4>
            <p>
              The twelve-question assessment is administered free of cost at the counter. Side effects
              include self-knowledge and mild evening hunger.
            </p>
          </div>
          <div className="notice-card">
            <NoticePin tone="mustard" />
            <span className="notice-tag">Lost & Found</span>
            <h4>One umbrella, one identity</h4>
            <p>
              Somebody left an umbrella on Bench No. 2. Somebody also abandoned an unfinished
              personality test at question nine. Both remain unclaimed.
            </p>
          </div>
        </div>

        <div className="report-stamp-row" style={{ justifyContent: 'space-between', marginTop: 30 }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <FoodPortrait food={featured} size={200} />
            <p className="small muted">Senior clerk on duty. Has opinions. Will share them.</p>
          </div>
          <div className="report-stamp-row" style={{ gap: 26 }}>
            <RubberStamp lines={['FOOD', 'COURT', 'IN SESSION']} tone="red" rotate={-7} size="lg" />
            <BureauSeal size={118} />
          </div>
        </div>
      </div>
    </div>
  )
}

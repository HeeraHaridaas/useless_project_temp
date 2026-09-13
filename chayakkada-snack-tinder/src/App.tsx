import { useEffect, useMemo, useState } from 'react'
import { useBureau, allFoods } from './state/store'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'
import { QuizPage } from './pages/QuizPage'
import { QuizResultPage } from './pages/QuizResultPage'
import { CreateFoodPage } from './pages/CreateFoodPage'
import { ProfilePage } from './pages/ProfilePage'
import { SwipePage } from './pages/SwipePage'
import { VerdictPage } from './pages/VerdictPage'
import { ReportPage } from './pages/ReportPage'
import { CaseFilesPage } from './pages/CaseFilesPage'

function parseHash(): string {
  const h = window.location.hash.replace(/^#/, '')
  return h || '/'
}

export default function App() {
  const bureau = useBureau()
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (to: string) => {
    if (parseHash() === to) return
    window.location.hash = to
  }

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const { identity, customFoods, swipes } = bureau.state

  const foods = useMemo(() => allFoods(customFoods), [customFoods])
  const otherCount = identity ? foods.filter((f) => f.id !== identity.food.id).length : foods.length

  // Route guards: keep deep links sane
  let content: JSX.Element
  if (route.startsWith('/register')) {
    content = <RegisterPage bureau={bureau} foods={foods} navigate={navigate} />
  } else if (route.startsWith('/quiz')) {
    content = <QuizPage bureau={bureau} navigate={navigate} />
  } else if (route.startsWith('/discovery')) {
    content = <QuizResultPage bureau={bureau} navigate={navigate} />
  } else if (route.startsWith('/new-food')) {
    content = <CreateFoodPage bureau={bureau} navigate={navigate} />
  } else if (route.startsWith('/food/')) {
    const id = decodeURIComponent(route.slice('/food/'.length))
    content = <ProfilePage bureau={bureau} foods={foods} id={id} navigate={navigate} />
  } else if (route.startsWith('/swipe')) {
    content = <SwipePage bureau={bureau} foods={foods} navigate={navigate} />
  } else if (route.startsWith('/verdict')) {
    content = <VerdictPage bureau={bureau} foods={foods} navigate={navigate} />
  } else if (route.startsWith('/report')) {
    content = <ReportPage bureau={bureau} foods={foods} navigate={navigate} />
  } else if (route.startsWith('/cases')) {
    content = <CaseFilesPage bureau={bureau} foods={foods} navigate={navigate} />
  } else {
    content = <LandingPage bureau={bureau} foods={foods} navigate={navigate} />
  }

  return (
    <div className="shell">
      <header className="topbar">
        <a
          href="#/"
          className="topbar-brand"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <span className="brand-block">
            <span className="bb-top">KERALA SNACK TINDER</span>
            <span className="bb-sub">CHAYAKKADA FOOD BUREAU</span>
          </span>
        </a>
        <div className="topbar-right">
          <span className="topbar-note">Food identity registration counter open · Est. 1938</span>
          <nav className="navlist" aria-label="Bureau navigation">
            <a href="#/register" className={route.startsWith('/register') ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('/register') }}>
              Registration
            </a>
            <a href="#/swipe" className={route.startsWith('/swipe') ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('/swipe') }}>
              The Deck
            </a>
            <a href="#/cases" className={route.startsWith('/cases') ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('/cases') }}>
              Case Files
            </a>
          </nav>
          {identity ? (
            <a
              href={`#/food/${identity.food.id}`}
              className="whoami"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/food/${identity.food.id}`)
              }}
            >
              <span>
                <span className="who-id">FILE No. {identity.food.regNo}</span>
                <br />
                {identity.food.name}
              </span>
            </a>
          ) : (
            <a
              href="#/register"
              className="whoami"
              onClick={(e) => {
                e.preventDefault()
                navigate('/register')
              }}
            >
              <span>
                <span className="who-id">UNREGISTERED</span>
                <br />
                Identify yourself
              </span>
            </a>
          )}
        </div>
      </header>

      <main className="shell">{content}</main>

      <footer className="footer">
        <div className="footer-row">
          <span>
            <b>CHAYAKKADA FOOD BUREAU</b> · Snack Compatibility Department
          </span>
          <span>
            {swipes.length} swipe{swipes.length === 1 ? '' : 's'} on record · {otherCount} foods in the
            Foodverse
          </span>
        </div>
        <hr className="footer-rule" />
        <div className="footer-row">
          <span>
            All matches computed on these premises. No snack was harmed. Results not legally binding,
            emotionally binding only.
          </span>
          <span className="upper-label">Kettle status: on</span>
        </div>
      </footer>
    </div>
  )
}

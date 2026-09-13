import { FOOD_BY_ID, type Food } from '../data/foods'
import { isKeralaFood } from './quiz'
import type { CaseRecord, SwipeRecord } from '../state/store'

const clamp = (n: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n))

export type MatchVerdict = {
  food: Food
  score: number
  classification: string
  stamp: string
  summary: string
  explanation: string
  verdict: string
}

export type CompatibilityReport = {
  best: MatchVerdict
  worst: MatchVerdict
  full: MatchVerdict[]
  swipesAnalyzed: number
  openToWork: boolean
  openToWorkNote: string
  headline: string
  stampText: string
  certifiedBy: string
  caseId: string
}

function soulDistance(a: Food, b: Food): number {
  return Math.abs(a.boiling - b.boiling)
}

function categoryNarrative(a: Food, b: Food): { summary: string; explanation: string } {
  const key = [a.category, b.category].sort().join('+')
  const table: Record<string, { summary: string; explanation: string }> = {
    'beverage+beverage': {
      summary: 'Two beverages. One kettle. Immediate recognition.',
      explanation:
        'You both run hot and you both know the shop closes when it closes. This is a relationship built on the shared understanding that the other drinks at the same counter. Extremely stable, occasionally smug, and entirely real.',
    },
    'beverage+fried snack': {
      summary: 'The 4:45 pm classic. Institutions will study this.',
      explanation:
        'One of you is hot and dark, the other golden and structural, and together you are the entire evening economy of this state. Nothing about this match is surprising. Everything about it is correct. The Bureau has seen this pairing sustain decades.',
    },
    'beverage+sweet': {
      summary: 'Tea-shop romance. Sweet meets steam.',
      explanation:
        'The sweet item has always been there when the beverage poured, and the beverage has always paid for it in small change. This is the oldest arrangement on the register and it still works. Expect a long courtship conducted entirely in evenings.',
    },
    'beverage+main course': {
      summary: 'A meal with opinions and a drink with history.',
      explanation:
        'You are the difference between lunch and an occasion. The beverage keeps the main course honest and the main course keeps the beverage from being taken for granted. Watch the bill-splitting though. It will come up.',
    },
    'beverage+breakfast': {
      summary: 'Morning people. Dangerous amounts of mutual respect.',
      explanation:
        'You both believe in mornings. You both believe in routine. Together you are the reason some households function. The Bureau notes that you will never once surprise each other, and that you will both claim this is the point.',
    },
    'beverage+import': {
      summary: 'Local kettle meets city menu.',
      explanation:
        'One of you has always been here and the other arrived with the mall. It works when the import is willing to sit on a steel bench and the local is willing to try the new place once. It usually works. The local remains slightly unimpressed throughout, which the import secretly enjoys.',
    },
    'beverage+street food': {
      summary: 'Night shift meets closing-time kettle.',
      explanation:
        'The street food is awake at hours the beverage has closed shop for. You meet at the overlap: late night, one stall open, one kettle still warm. Volatile, memorable, and repeated more often than either of you admits publicly.',
    },
    'beverage+side dish': {
      summary: 'Crunch meets comfort. Supporting cast, both.',
      explanation:
        'Neither of you has headlined anything and neither of you cares. You are the two things people actually remember about a meal anyway. Quietly essential pairing. The Bureau rates this higher than the main courses would like.',
    },
    'breakfast+breakfast': {
      summary: 'A full morning, doubled.',
      explanation:
        'Two breakfast items in a relationship means an entire household calibrated to the whistle of one pressure cooker. Very stable, very early, and impossible for night people to understand. The Bureau approves and is slightly frightened.',
    },
    'breakfast+fried snack': {
      summary: 'Morning meets golden hour.',
      explanation:
        'The breakfast item provides structure and the fried snack provides the mood. Together you cover the full daylight range of this state. Occasional friction over the oil question, resolved by 9 am.',
    },
    'breakfast+main course': {
      summary: 'Breakfast item, main course energy.',
      explanation:
        'One of you is a morning person and the other thinks every hour is theirs. It works because the main course defers to routine when it matters and the breakfast item loosens up by lunch. Balanced, if slightly lopsided in planning authority.',
    },
    'breakfast+sweet': {
      summary: 'Soft start, sweet finish.',
      explanation:
        'The sweet item finds the breakfast item soothing and the breakfast item finds the sweet item tolerable, which in Bureau terms is the same thing as affection. Slow, warm, and low on conflict. High on repetition.',
    },
    'breakfast+side dish': {
      summary: 'Both essential. Neither loud.',
      explanation:
        'You are the two items that make a meal possible without ever being the reason anyone photographed it. This is a mature pairing. The Bureau salutes it and predicts decades of uneventful happiness.',
    },
    'breakfast+import': {
      summary: 'Local morning meets city clock.',
      explanation:
        'The import does not understand why breakfast has rules and the breakfast item does not understand why anyone would skip it. You meet somewhere around brunch, which the Bureau does not officially recognise but will permit.',
    },
    'breakfast+street food': {
      summary: 'The 7 am window versus the 1 am window.',
      explanation:
        'Your active hours barely overlap and yet here we are. It works in shifts. One cooks, one arrives. The Bureau predicts this will be described as exciting for roughly one year and then simply become logistics.',
    },
    'main course+main course': {
      summary: 'Two mains. One plate. Zero compromise.',
      explanation:
        'This is either a power couple or a kitchen dispute with cutlery. Two main courses share one plate only when both agree to be interesting without shouting. High intensity, high reward, occasional rice-related standoffs.',
    },
    'main course+fried snack': {
      summary: 'Curry and crunch. Textbook.',
      explanation:
        'The fried snack shatters against the main course and the main course holds it like it was designed for this, because it was. This is the pairing the entire register is modelled on. The Bureau refers to it internally as the reference marriage.',
    },
    'main course+sweet': {
      summary: 'The sadya arrangement. Courses in order.',
      explanation:
        'The main course arrives first and the sweet closes the meal, and both of you have always known the order of things. There is deep comfort in this. The Bureau notes the sweet item occasionally wants to arrive first, which is the only real risk.',
    },
    'main course+side dish': {
      summary: 'Main event, steady support.',
      explanation:
        'The side dish has never once tried to be the main and the main course knows it could not function without it. Asymmetrical, stable, and far more mutual than it looks from outside.',
    },
    'main course+import': {
      summary: 'Home recipe meets restaurant menu.',
      explanation:
        'The import arrived with a menu and the main course arrived with a history. The import is louder, the main course is deeper. Works when the import stops explaining itself and the main course stops being smug about seniority.',
    },
    'main course+street food': {
      summary: 'Sit-down main meets walk-up window.',
      explanation:
        'One of you needs a table and the other needs a counter. You take turns. The main course adds gravitas to the street food chaos and the street food keeps the main course out past its bedtime. The Bureau calls this growth.',
    },
    'main course+beverage': {
      summary: 'The plate and the pour.',
      explanation:
        'Every main course needs a witness and the beverage has witnessed everything since 1938. You are the lunch hour itself. Stable to the point of institutional.',
    },
    'sweet+sweet': {
      summary: 'A dessert cart with two opinions.',
      explanation:
        'Very sweet, very combined, and a genuine shared enemy: anyone who says "too much". You are both on the same team against that sentence forever. The Bureau recommends a salty chaperone.',
    },
    'sweet+fried snack': {
      summary: 'Sweet and golden. The bakery counter arrangement.',
      explanation:
        'You share a display case and have never once fought over shelf position. Both of you know the evening crowd arrives at the same hour and both of you show up for it. Reliable, warm, and crisp when it counts.',
    },
    'sweet+import': {
      summary: 'Local sweetness meets international dessert agenda.',
      explanation:
        'The import has a brand and the sweet item has a grandmother. The import is fashionable, the sweet item is permanent. Works beautifully once the import admits the grandmother was right all along.',
    },
    'sweet+street food': {
      summary: 'Sugar meets midnight oil.',
      explanation:
        'The street food runs on adrenaline and the sweet item runs on jaggery. You meet at night, loudly, and part by morning. Repeat. The Bureau has stopped trying to schedule this.',
    },
    'sweet+side dish': {
      summary: 'Sweet item, crunchy counterpart.',
      explanation:
        'Opposites on the crunch axis, aligned on everything else. The side dish keeps the sweet item grounded and the sweet item stops the side dish from taking itself too seriously. Genuinely functional.',
    },
    'fried snack+fried snack': {
      summary: 'Two fried items. One kadai. Referendum on oil.',
      explanation:
        'You both believe in the deep golden life. Extremely compatible texture-wise and slightly competitive about whose crunch is superior. The Bureau recommends separate oil budgets.',
    },
    'fried snack+import': {
      summary: 'Local kadai meets imported menu.',
      explanation:
        'The import will call your kadai rustic and you will call their menu confusing. Somewhere in the middle is a very good snack platter and, eventually, a very good relationship.',
    },
    'fried snack+street food': {
      summary: 'Golden and greasy, mobile both.',
      explanation:
        'You both believe food should be available at the edge of a road. Compatible on every axis the Bureau measures and a few it does not. Expect shared hygiene discourse to be the only recurring argument.',
    },
    'fried snack+side dish': {
      summary: 'Crunch and more crunch, different duties.',
      explanation:
        'You are both supporting-cast items who keep the plate together. Very low conflict, very high reliability. The main courses underestimate you constantly. Their loss.',
    },
    'street food+street food': {
      summary: 'Two night-shift items. The stall never closes.',
      explanation:
        'You will eat at 1 am standing up, together, forever. Maximum compatibility on the chaos axis and the Bureau has logged several noise complaints from neighbours already. Worth it.',
    },
    'street food+import': {
      summary: 'Roadside stall meets food court.',
      explanation:
        'One of you has a roof and the other has a reputation. The import finds the chaos charming and the street food finds the prices objectionable. You will meet in the middle, which is a parking lot, and be very happy there.',
    },
    'street food+side dish': {
      summary: 'Midnight energy, daytime discipline.',
      explanation:
        'The street food brings the hour and the side dish brings the structure. You take turns being the responsible one. The Bureau finds this arrangement surprisingly durable.',
    },
    'import+import': {
      summary: 'Two imports. One food court. Matching menus.',
      explanation:
        'You both speak fluent menu-English and neither of you can handle afternoon heat. Extremely compatible lifestyle-wise and slightly interchangeable to outsiders, which you both find insulting. You are not interchangeable. The Bureau has checked.',
    },
    'import+side dish': {
      summary: 'Menu item meets plate-filler.',
      explanation:
        'The import is the reason people come and the side dish is the reason they stay. You will argue about portion sizes and then agree forever about everything else.',
    },
    'side dish+side dish': {
      summary: 'Two supporting items. Both load-bearing.',
      explanation:
        'Nobody photographs either of you and the meal collapses without either of you. The Bureau ranks this among the most durable pairings on file. Understated, essential, and quietly smug about it.',
    },
  }

  const entry = table[key]
  if (!entry) {
    return {
      summary: 'Cross-department pairing. The Bureau is reviewing.',
      explanation:
        'The categories do not usually meet. When they do, the Bureau sends an observer. The observers report that opposites in category but aligned in temperament make the most memorable couples on file. Proceed with curiosity.',
    }
  }
  return entry
}

export const CLASSIFICATIONS: Array<{ min: number; label: string; stamp: string }> = [
  { min: 92, label: 'Reference Marriage', stamp: 'BUREAU MODEL' },
  { min: 85, label: 'Match Approved', stamp: 'APPROVED' },
  { min: 75, label: 'Situationship, Stable', stamp: 'STABLE SITUATION' },
  { min: 65, label: 'Complicated, But Working', stamp: 'COMPLICATED' },
  { min: 55, label: 'Requires Supervision', stamp: 'SUPERVISED' },
  { min: 45, label: 'Energetic Differences', stamp: 'ENERGETIC' },
  { min: 0, label: 'Do Not Seat Together', stamp: 'NOT PERMITTED' },
]

export function classify(score: number) {
  return CLASSIFICATIONS.find((c) => score >= c.min) ?? CLASSIFICATIONS[CLASSIFICATIONS.length - 1]
}

const VERDICT_LINES = [
  'Bureau stamp applied. Serve immediately.',
  'The clerk has initialled this. Twice.',
  'Pending one more kettle of tea before final signature.',
  'Filed under: things that work, annoyingly.',
  'This match has been added to the wall calendar.',
  'A rubber stamp was used with unusual enthusiasm.',
  'The night clerk reviewed it and snorted. Approval.',
]

export function computeCompatibility(userFood: Food, other: Food, swipes: SwipeRecord[]): MatchVerdict {
  const positive = swipes.filter((s) => s.direction === 'right').length
  const total = swipes.length

  const soulDist = soulDistance(userFood, other)
  let score = 55 + (100 - soulDist * 2.2) * 0.45

  const swipeRecord = swipes.find((s) => s.foodId === other.id)
  if (swipeRecord) {
    if (swipeRecord.direction === 'right') score += 9
    else score -= 11
  }

  if (isKeralaFood(userFood) && isKeralaFood(other)) score += 6
  if (userFood.category === other.category) score += 2
  if (soulDist <= 6) score += 3

  score = clamp(Math.round(score))
  const { summary, explanation } = categoryNarrative(userFood, other)
  const cls = classify(score)
  const verdict = VERDICT_LINES[(soulDist + positive * 3) % VERDICT_LINES.length]

  return {
    food: other,
    score,
    classification: cls.label,
    stamp: cls.stamp,
    summary,
    explanation,
    verdict,
  }
}

export function buildReport(userFood: Food, swipes: SwipeRecord[], openToWork: boolean): CompatibilityReport {
  const all = [...FOOD_BY_ID.values()].filter((f) => f.id !== userFood.id)
  const full = all.map((f) => computeCompatibility(userFood, f, swipes))
  full.sort((a, b) => b.score - a.score)

  const best = full[0]
  const worst = full[full.length - 1]
  const totalSwipes = swipes.length
  const right = swipes.filter((s) => s.direction === 'right').length

  const headlinePool = openToWork
    ? [
        'REPORT ISSUED. PORTIONS UNLIMITED.',
        'ANALYSIS COMPLETE. KETTLE STILL ON.',
        'VERDICT FILED. OIL DRAINED. CONCLUSIONS DRAWN.',
      ]
    : [
        'REPORT ISSUED. YOU MAY NOW RETURN TO WORK.',
        'FILE CLOSED. KETTLE OFF. THANK YOU.',
        'VERDICT DELIVERED. CASE SEALED. TEA ON US.',
      ]
  const headline = headlinePool[totalSwipes % headlinePool.length]

  const stampPool = ['SERVED', 'VERDICTED', 'SEALED', 'FILED', 'MATCHED']
  const stampText = stampPool[(right + totalSwipes) % stampPool.length]

  const certifiedBy = openToWork
    ? 'Certified by the Sub-Registrar of Evening Snacks'
    : 'Certified by the Registrar of Edible Affairs'

  const caseId = `CFB/${new Date().getFullYear()}/${String(Math.max(1, totalSwipes)).padStart(3, '0')}-${userFood.regNo.slice(-4)}`

  return {
    best,
    worst,
    full,
    swipesAnalyzed: totalSwipes,
    openToWork,
    openToWorkNote: openToWork
      ? 'You ticked the box. The Bureau respects it and has adjusted the tone of this report accordingly.'
      : 'The Bureau has decided, on your behalf, that you are open to work. It is nothing personal.',
    headline,
    stampText,
    certifiedBy,
    caseId,
  }
}

export type { CaseRecord }

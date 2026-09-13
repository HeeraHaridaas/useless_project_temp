import { FOODS } from '../data/foods'
import { AXIS_LABELS, QUESTIONS, TRAIT_AXES, type TraitAxis } from '../data/questions'
import type { Food, FoodCategory } from '../data/foods'

export type QuizAnswers = Record<string, number> // question id -> option index

export const TOTAL_QUESTIONS = QUESTIONS.length

export function scoreQuiz(answers: QuizAnswers) {
  const catScores = new Map<FoodCategory, number>()
  const axisScores = new Map<TraitAxis, number>()

  const bump = (m: Map<string, number>, k: string, v: number) => m.set(k, (m.get(k) ?? 0) + v)

  for (const q of QUESTIONS) {
    const optIndex = answers[q.id]
    if (optIndex == null) continue
    const opt = q.options[optIndex]
    if (!opt) continue
    for (const [key, val] of Object.entries(opt.scores)) {
      if (key === 'lowkey' || key === 'loud' || key === 'trad' || key === 'chaos' || key === 'sweet') {
        bump(axisScores, key, val)
      } else {
        bump(catScores, key, val)
      }
    }
  }

  // Each food contributes a character to the matching: category fit plus boiling point
  // and a slight tilt towards high-boiling foods for "loud" and "chaos" answers.
  let best: Food = FOODS[0]
  let bestScore = -Infinity
  const scored = FOODS.map((food) => {
    const base = catScores.get(food.category) ?? 0
    const boilFit =
      (axisScores.get('loud') ?? 0) * (food.boiling - 60) * 0.06 +
      (axisScores.get('chaos') ?? 0) * (food.boiling - 60) * 0.05 -
      (axisScores.get('lowkey') ?? 0) * (food.boiling - 60) * 0.06
    const tradBonus = (axisScores.get('trad') ?? 0) * (isKeralaFood(food) ? 1.5 : 0)
    const total = base * 2.4 + boilFit + tradBonus
    if (total > bestScore) {
      bestScore = total
      best = food
    }
    return { food, total }
  })

  scored.sort((a, b) => b.total - a.total)

  const topAxis = TRAIT_AXES.reduce((a, b) => ((axisScores.get(a) ?? 0) >= (axisScores.get(b) ?? 0) ? a : b))

  return {
    topFood: best,
    runnerUp: scored[1]?.food ?? FOODS[1],
    thirdPlace: scored[2]?.food ?? FOODS[2],
    topAxis,
    topAxisLabel: AXIS_LABELS[topAxis],
    axisScores,
    categoryScores: catScores,
    fullRanking: scored,
  }
}

export function isKeralaFood(food: Food): boolean {
  const h = food.home.toLowerCase()
  return (
    h.includes('kerala') ||
    h.includes('chayakkada') ||
    h.includes('travancore') ||
    h.includes('thalassery') ||
    h.includes('kottayam') ||
    h.includes('every kitchen') ||
    h.includes('every chayakkada') ||
    h.includes('grandmother') ||
    h.includes('brass pan') ||
    h.includes('matthu') ||
    h.includes('kettle') ||
    h.includes('kadai') ||
    h.includes('other kettle') ||
    h.includes("kettle's cooler")
  )
}

export function isRegisteredFood(food: Food): boolean {
  return FOOD_BY_ID_SAFE.has(food.id)
}

const FOOD_BY_ID_SAFE = new Set(FOODS.map((f) => f.id))

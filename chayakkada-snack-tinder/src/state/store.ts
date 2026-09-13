import { useCallback, useEffect, useState } from 'react'
import { FOODS, type Food } from '../data/foods'

export type SwipeDirection = 'left' | 'right'

export type SwipeRecord = {
  foodId: string
  direction: SwipeDirection
  at: number
}

export type IdentitySource = 'chosen' | 'quiz' | 'created'

export type Identity = {
  food: Food
  source: IdentitySource
  since: number
}

export type CaseRecord = {
  id: string
  foodId: string
  foodName: string
  source: IdentitySource
  swipes: SwipeRecord[]
  openToWork: boolean
  bestId: string
  bestScore: number
  worstId: string
  worstScore: number
  classification: string
  caseId: string
  headline: string
  closedAt: number
}

export type BureauState = {
  identity: Identity | null
  swipes: SwipeRecord[]
  openToWork: boolean
  lastReport: CaseRecord | null
  cases: CaseRecord[]
  customFoods: Food[]
  quizAnswers: Record<string, number>
}

const STORAGE_KEY = 'chayakkada-food-bureau-v1'

const EMPTY: BureauState = {
  identity: null,
  swipes: [],
  openToWork: false,
  lastReport: null,
  cases: [],
  customFoods: [],
  quizAnswers: {},
}

function load(): BureauState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<BureauState>
    return { ...EMPTY, ...parsed }
  } catch {
    return EMPTY
  }
}

function persist(state: BureauState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // The Bureau has bigger problems. Proceed.
  }
}

export function allFoods(custom: Food[]): Food[] {
  return [...FOODS, ...custom]
}

export function foodById(id: string, custom: Food[]): Food | undefined {
  return allFoods(custom).find((f) => f.id === id)
}

export function useBureau() {
  const [state, setState] = useState<BureauState>(load)

  useEffect(() => {
    persist(state)
  }, [state])

  const registerIdentity = useCallback((food: Food, source: IdentitySource, quizAnswers?: Record<string, number>) => {
    setState((s) => ({
      ...s,
      identity: { food, source, since: Date.now() },
      swipes: [],
      lastReport: null,
      quizAnswers: quizAnswers ?? s.quizAnswers,
    }))
  }, [])

  const recordSwipe = useCallback((foodId: string, direction: SwipeDirection) => {
    setState((s) => {
      if (s.swipes.some((sw) => sw.foodId === foodId)) return s
      return { ...s, swipes: [...s.swipes, { foodId, direction, at: Date.now() }] }
    })
  }, [])

  const setOpenToWork = useCallback((openToWork: boolean) => {
    setState((s) => ({ ...s, openToWork }))
  }, [])

  const closeCase = useCallback((record: Omit<CaseRecord, 'id' | 'closedAt'>) => {
    const full: CaseRecord = { ...record, id: `case-${Date.now()}`, closedAt: Date.now() }
    setState((s) => ({ ...s, lastReport: full, cases: [full, ...s.cases].slice(0, 40) }))
    return full
  }, [])

  const addCustomFood = useCallback((food: Food) => {
    setState((s) => ({ ...s, customFoods: [...s.customFoods, food] }))
  }, [])

  const setQuizAnswers = useCallback((answers: Record<string, number>) => {
    setState((s) => ({ ...s, quizAnswers: answers }))
  }, [])

  const reset = useCallback(() => {
    setState((s) => ({ ...EMPTY, customFoods: s.customFoods }))
  }, [])

  const forgetCase = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      cases: s.cases.filter((c) => c.id !== id),
      lastReport: s.lastReport?.id === id ? null : s.lastReport,
    }))
  }, [])

  return {
    state,
    registerIdentity,
    recordSwipe,
    setOpenToWork,
    closeCase,
    addCustomFood,
    setQuizAnswers,
    reset,
    forgetCase,
  }
}

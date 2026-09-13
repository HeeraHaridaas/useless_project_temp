import type { FoodCategory } from './foods'

export type QuestionOption = {
  label: string
  detail?: string
  scores: Partial<Record<FoodCategory | 'lowkey' | 'loud' | 'trad' | 'chaos' | 'sweet', number>>
}

export type Question = {
  id: string
  number: number
  question: string
  note?: string
  options: QuestionOption[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    question: 'It is 4:45 pm. Where are you, honestly?',
    note: 'The Bureau considers this the single most revealing question on file.',
    options: [
      { label: 'At the chayakkada, same bench as every day', detail: 'Order already placed by the time I sat', scores: { 'fried snack': 2, 'beverage': 2, trad: 2 } },
      { label: 'Just woken up', detail: 'The day begins now. Deal with it', scores: { 'street food': 2, chaos: 2, lowkey: 1 } },
      { label: 'Somewhere with air conditioning', detail: 'Mall, office, anywhere with a generator', scores: { import: 2, loud: 1 } },
      { label: 'On a bench near the sea, judging everyone', scores: { beverage: 1, trad: 1, lowkey: 2 } },
    ],
  },
  {
    id: 'q2',
    number: 2,
    question: 'Someone criticises your life choices at a family function.',
    options: [
      { label: 'Nod politely, change nothing', scores: { trad: 2, lowkey: 2, 'main course': 1 } },
      { label: 'Deliver a 9-minute counter-argument with sources', scores: { loud: 2, 'street food': 1 } },
      { label: 'Cry in the bathroom, come back for biriyani', scores: { 'main course': 2, sweet: 1 } },
      { label: 'Agree enthusiastically. Regret at home.', scores: { chaos: 2, lowkey: 1 } },
    ],
  },
  {
    id: 'q3',
    number: 3,
    question: 'Your relationship with coconut oil is best described as',
    options: [
      { label: 'Primary love language', scores: { trad: 2, 'fried snack': 2 } },
      { label: 'Respectful but I keep options open', scores: { 'street food': 1, loud: 1 } },
      { label: 'Strictly professional. We work together.', scores: { import: 1, lowkey: 2 } },
      { label: 'My doctor and I do not discuss it', scores: { 'fried snack': 1, 'main course': 1, chaos: 1 } },
    ],
  },
  {
    id: 'q4',
    number: 4,
    question: 'Choose a Friday night.',
    options: [
      { label: 'Beef fry at the same hotel table, 10 pm', scores: { 'main course': 2, loud: 1, trad: 1 } },
      { label: 'Shawarma run, possibly twice', scores: { 'street food': 2, chaos: 2 } },
      { label: 'Home, blanket, something sweet', scores: { sweet: 2, lowkey: 2 } },
      { label: 'Every plan cancelled. The plan was the cancellation.', scores: { lowkey: 2, beverage: 1 } },
    ],
  },
  {
    id: 'q5',
    number: 5,
    question: 'How do you handle being called boring?',
    options: [
      { label: 'Correct them with a detailed history of my achievements', scores: { loud: 2, trad: 1 } },
      { label: 'Say nothing. Text about it four days later.', scores: { lowkey: 2, sweet: 1 } },
      { label: 'Agree. It is a strategic identity.', scores: { 'main course': 1, trad: 1, lowkey: 1 } },
      { label: 'Get louder. Cannot hear criticism over myself.', scores: { chaos: 2, 'street food': 1 } },
    ],
  },
  {
    id: 'q6',
    number: 6,
    question: 'Morning tea discourse. Your position?',
    options: [
      { label: 'Kattan, strong, no cardamom, no negotiation', scores: { 'beverage': 2, trad: 2, loud: 1 } },
      { label: 'Tea is tea. Do not romanticise it.', scores: { lowkey: 2, 'main course': 1 } },
      { label: 'Lime tea if it is hot out. I contain ranges.', scores: { beverage: 1, chaos: 1, lowkey: 1 } },
      { label: 'Coffee. I enjoy being contrarian before 8 am.', scores: { beverage: 2, chaos: 1 } },
    ],
  },
  {
    id: 'q7',
    number: 7,
    question: 'A wedding invitation arrives. Genuine first thought:',
    options: [
      { label: 'The menu. Immediately the menu.', scores: { 'main course': 2, sweet: 1, loud: 1 } },
      { label: 'What to wear. The menu is a consequence.', scores: { import: 2, loud: 2 } },
      { label: 'Whom I will be seated next to', scores: { lowkey: 2, trad: 1 } },
      { label: 'Whether I can attend only the reception', scores: { chaos: 2, 'street food': 1 } },
    ],
  },
  {
    id: 'q8',
    number: 8,
    question: 'Pick a weapon of choice during an argument.',
    options: [
      { label: 'Silence. Weaponised, load-bearing silence.', scores: { lowkey: 2, sweet: 1 } },
      { label: 'Sarcasm with surgical timing', scores: { chaos: 2, loud: 1 } },
      { label: 'Facts, listed, in order, on paper', scores: { trad: 2, loud: 1 } },
      { label: 'Leaving physically. Mid-sentence.', scores: { chaos: 2, 'street food': 1 } },
    ],
  },
  {
    id: 'q9',
    number: 9,
    question: 'Your relationship with sweetness is',
    options: [
      { label: 'Jaggery or nothing. White sugar is a rumour.', scores: { sweet: 2, trad: 2 } },
      { label: 'Chocolate, preferably imported, preferably nightly', scores: { sweet: 1, import: 2 } },
      { label: 'I take sweetness in tea form only', scores: { beverage: 2, trad: 1 } },
      { label: 'Suspicious of it. Sugar is a personality flaw.', scores: { 'main course': 2, lowkey: 1 } },
    ],
  },
  {
    id: 'q10',
    number: 10,
    question: 'The kettle in your hostel room had seen things. Did you have one?',
    options: [
      { label: 'Yes, and it still works. I checked.', scores: { chaos: 2, lowkey: 1, 'main course': 1 } },
      { label: 'No. My institution provided a proper mess.', scores: { trad: 2, 'main course': 1 } },
      { label: 'I lived at home and pity all of you', scores: { trad: 1, loud: 1 } },
      { label: 'Kettle, rice cooker, sandwich grill. A full setup.', scores: { chaos: 1, 'street food': 2 } },
    ],
  },
  {
    id: 'q11',
    number: 11,
    question: 'You are served food you dislike at someone\'s house.',
    options: [
      { label: 'Finish it. Every grain. Smile throughout.', scores: { trad: 2, lowkey: 1 } },
      { label: 'Move it around the plate archaeologically', scores: { lowkey: 2, chaos: 1 } },
      { label: 'Say it directly. Politely. Directly.', scores: { loud: 2, trad: 1 } },
      { label: 'Ask for a second helping. Panic later.', scores: { chaos: 2, sweet: 1 } },
    ],
  },
  {
    id: 'q12',
    number: 12,
    question: 'Final question. Your entire personality, in one vessel:',
    options: [
      { label: 'A steel tumbler. Unbreakable. Dented but functional.', scores: { beverage: 2, trad: 2, lowkey: 1 } },
      { label: 'A banana leaf. Holds everything together, asks nothing.', scores: { trad: 2, 'main course': 2 } },
      { label: 'A paper cone. Noisy, temporary, memorable.', scores: { 'fried snack': 2, chaos: 2 } },
      { label: 'A styrofoam box. Modern. Slightly sad. Keeps things warm.', scores: { import: 2, loud: 1 } },
    ],
  },
]

export const TRAIT_AXES = ['lowkey', 'loud', 'trad', 'chaos', 'sweet'] as const
export type TraitAxis = (typeof TRAIT_AXES)[number]

export const AXIS_LABELS: Record<TraitAxis, string> = {
  lowkey: 'Low Profile',
  loud: 'Loud Presence',
  trad: 'Traditional Temperament',
  chaos: 'Certified Chaos',
  sweet: 'Sweet Disposition',
}

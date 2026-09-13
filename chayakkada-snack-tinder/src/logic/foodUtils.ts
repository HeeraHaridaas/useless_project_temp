import type { Food } from '../data/foods'

export function nextRegNo(customCount: number): string {
  const n = 900 + customCount
  return `B/${String(n).padStart(3, '0')}/${new Date().getFullYear()}`
}

const FACE_MOUTHS = ['M 46 60 Q 60 72 74 60', 'M 50 62 L 70 62', 'M 48 58 Q 60 68 72 58', 'M 52 64 Q 60 56 68 64']

export function pickMouth(seed: number): string {
  return FACE_MOUTHS[seed % FACE_MOUTHS.length]
}

export function foodPalette(food: Food): { base: string; deep: string } {
  const table: Record<string, [string, string]> = {
    'pazham-pori': ['#E8B84B', '#8A5A1B'],
    parotta: ['#EAD9A8', '#9C7A3C'],
    appam: ['#F2EAD8', '#B08A4A'],
    puttu: ['#F4EFE2', '#C9A96A'],
    unniyappam: ['#B67A3A', '#5E3617'],
    samosa: ['#D9A441', '#7C5210'],
    'banana-chips': ['#E3C368', '#8F6B1E'],
    kozhukatta: ['#F1ECDC', '#B3A98C'],
    'beef-fry': ['#7A3B2A', '#3B1A10'],
    'kerala-biriyani': ['#D9A441', '#7C4A12'],
    chaya: ['#6B4226', '#2E1A0E'],
    'kattan-kapi': ['#4A2C1A', '#1F0F07'],
    'lime-tea': ['#D9C96A', '#7A6A1E'],
    pizza: ['#D97045', '#8A2F14'],
    shawarma: ['#D9B98A', '#7A5A2E'],
    burger: ['#C98A45', '#6E3E14'],
    'ice-cream': ['#EFD9E8', '#B07A9A'],
    'french-fries': ['#E8C84B', '#8A6A1B'],
    'plain-rice': ['#F4F0E4', '#B8AF94'],
    noodles: ['#E8C84B', '#9A7A2A'],
    'hostel-maggi': ['#E8B84B', '#B05A1B'],
    'kadala-curry': ['#8A5A32', '#5C3617'],
    stew: ['#F2EAD8', '#B08A4A'],
    egg: ['#F7F1E0', '#C98A2A'],
    biscuit: ['#E3B96A', '#9C7230'],
    payasam: ['#E8C873', '#A8742A'],
    pickle: ['#C96A2A', '#6E3410'],
  }
  const found = table[food.id]
  if (found) return { base: found[0], deep: found[1] }
  let h = 0
  for (let i = 0; i < food.id.length; i++) h = (h * 31 + food.id.charCodeAt(i)) % 360
  return { base: `hsl(${h} 42% 72%)`, deep: `hsl(${h} 45% 30%)` }
}

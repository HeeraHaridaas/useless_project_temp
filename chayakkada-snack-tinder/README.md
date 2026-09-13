# Kerala Snack Tinder

### The Chayakkada Food Bureau · Snack Compatibility Department · Est. 1938

A fictional Kerala tea shop has launched a food dating service. Register a food identity,
review the other foods of the Foodverse, and receive an absurdly serious relationship report,
stamped and filed in duplicate.

## Running it

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run preview    # serve the production build
```

## The three entrances

1. **Choose your food** - assume any identity from the register of 21 certified foods.
2. **Take the personality test** - twelve questions; the instruments decide which snack you have been all along.
3. **Register a new food** - Form 7 creates a full dossier (traits, flags, likes, boiling point) and enters it into the deck.

## The flow

Register → swipe through the deck (drag or buttons; 12 reviews minimum) → the Match Verdict
Office issues best match, worst match, classification and a dramatic decision → the Final Food
Dating Report scores every food in the Foodverse and is archived in your Case Files.

All state persists in `localStorage`. Identity, swipes, reports and custom foods survive reloads.

## Layout

```
src/
  data/       food register, personality test questions
  logic/      quiz scoring, compatibility engine
  state/      bureau state (React hooks + localStorage)
  art/        hand-drawn SVG food portraits, stamps, seals, tea stains
  pages/      landing, register, quiz, discovery, Form 7, profile,
              swipe deck, verdict, final report, case files
  styles.css  the entire art direction
```

No UI frameworks. No icon libraries. Every illustration is a hand-authored SVG.
Type: DM Serif Display, Karla, Noto Sans Malayalam.

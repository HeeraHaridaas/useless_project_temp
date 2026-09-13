/**
 * The Bureau's manually curated pairing matrix.
 *
 * Declared once per pair; the normaliser makes every rule symmetric so
 * Chaya + Pazham Pori and Pazham Pori + Chaya resolve to the same record.
 * A pair appears at most once across all kinds. The ledger has feelings
 * about duplicates and the ledger is never wrong.
 */

export type PairKind = 'partner' | 'rival' | 'wildcard' | 'conflict'

export type PairRule = {
  a: string
  b: string
  /** Base score 0-100 for this specific pairing. */
  score: number
  kind: PairKind
  /** The specific real-world reason. Cited verbatim by the comment engine. */
  fact: string
  /** Optional relationship type override for special pairs. */
  as?: string
}

export const PAIR_RULES: PairRule[] = [
  // -- The iconic marriages. Scores are the Bureau's settled law. --
  { a: 'parotta', b: 'beef-fry', score: 99, kind: 'partner', fact: 'the parotta was invented, structurally, as a delivery system for beef fry', as: 'tea-shop power couple' },
  { a: 'puttu', b: 'kadala-curry', score: 98, kind: 'partner', fact: 'the puttu kutti and the kadala pot have shared a kitchen covenant for centuries', as: 'tea-shop power couple' },
  { a: 'appam', b: 'stew', score: 97, kind: 'partner', fact: 'the lacy border exists specifically to hold stew; this is documented intent', as: 'society-approved pairing' },
  { a: 'pazham-pori', b: 'chaya', score: 97, kind: 'partner', fact: 'the 4:45 pm bench pairing that funds every chayakkada in the state', as: 'tea-shop power couple' },
  { a: 'kerala-biriyani', b: 'payasam', score: 96, kind: 'partner', fact: 'the wedding menu sequence: biriyani first, payasam after, always in that order', as: 'family-function pairing' },
  { a: 'burger', b: 'french-fries', score: 95, kind: 'partner', fact: 'the combo deal: fries are eaten first and credited never, by treaty', as: 'society-approved pairing' },
  { a: 'plain-rice', b: 'kadala-curry', score: 94, kind: 'partner', fact: 'rice takes the shape of whatever curry arrives; kadala arrived' },
  { a: 'samosa', b: 'chaya', score: 94, kind: 'partner', fact: 'the bakery counter arrangement: hot triangle, hotter glass, same tray' },
  { a: 'hostel-maggi', b: 'egg', score: 96, kind: 'partner', fact: 'one egg per packet, split four ways, at 1:47 am, with one fork', as: 'hostel survival pairing' },
  { a: 'kerala-biriyani', b: 'pickle', score: 94, kind: 'partner', fact: 'no biriyani plate in this state has ever left the kitchen without a pickle spoon' },
  { a: 'unniyappam', b: 'chaya', score: 92, kind: 'partner', fact: 'jaggery and tea leaf: the oldest quiet arrangement in the glass case' },
  { a: 'banana-chips', b: 'chaya', score: 91, kind: 'partner', fact: 'crunch survives the steam of the tea glass; the pairing was load-tested for decades' },
  { a: 'beef-fry', b: 'appam', score: 90, kind: 'partner', fact: 'the soft centre of one against the roasted edge of the other; mutually agreed' },
  { a: 'parotta', b: 'kadala-curry', score: 89, kind: 'partner', fact: 'kadala on parotta is the 11 pm compromise when beef is out of stock, and it holds' },
  { a: 'plain-rice', b: 'beef-fry', score: 88, kind: 'partner', fact: 'the lunch-hour arrangement: rice absorbs, beef decides' },
  { a: 'appam', b: 'egg', score: 88, kind: 'partner', fact: 'egg roasted into the appam centre: the sunday breakfast upgrade' },
  { a: 'chaya', b: 'biscuit', score: 93, kind: 'partner', fact: 'dunk time is measured in seconds and everyone knows the correct number', as: 'tea-shop power couple' },
  { a: 'noodles', b: 'egg', score: 90, kind: 'partner', fact: 'scrambled straight into the pan: the hostel protein programme' },
  { a: 'beef-fry', b: 'kerala-biriyani', score: 86, kind: 'partner', fact: 'the beef biriyani alliance: two heavyweights who somehow share a dum' },
  { a: 'shawarma', b: 'parotta', score: 85, kind: 'partner', fact: 'the porotta-shawarma crossover: Malappuram diplomacy at work' },
  { a: 'puttu', b: 'banana-chips', score: 84, kind: 'partner', fact: 'the sadya breakfast: steam and crunch, no oil politics involved' },
  { a: 'parotta', b: 'egg', score: 88, kind: 'partner', fact: 'egg roasted with the parotta: midnight hotel standard issue' },
  { a: 'beef-fry', b: 'egg', score: 84, kind: 'partner', fact: 'egg curry on the side; the iron pan permits it, barely' },
  { a: 'puttu', b: 'payasam', score: 82, kind: 'partner', fact: 'puttu with payasam on festival mornings: the sweet breakfast treaty' },
  { a: 'puttu', b: 'egg', score: 80, kind: 'partner', fact: 'egg roast over puttu: the quiet weekday understanding' },
  { a: 'appam', b: 'kadala-curry', score: 86, kind: 'partner', fact: 'kadala in the lacy centre: the morning backup plan that became classic' },
  { a: 'parotta', b: 'kerala-biriyani', score: 80, kind: 'partner', fact: 'porotta with biriyani rice: the wedding-queue workaround' },
  { a: 'unniyappam', b: 'kozhukatta', score: 84, kind: 'partner', fact: 'the two of them share a grandmother and neither would admit it first' },
  { a: 'kattan-kapi', b: 'biscuit', score: 92, kind: 'partner', fact: 'filter coffee and biscuit: the office canteen marriage of record' },
  { a: 'kattan-kapi', b: 'unniyappam', score: 85, kind: 'partner', fact: 'bitter filter and jaggery sweet: a mutual correction, widely respected' },
  { a: 'kattan-kapi', b: 'samosa', score: 82, kind: 'partner', fact: 'the sharp and the spiced: acceptable at both 6 am and 4 pm' },
  { a: 'kattan-kapi', b: 'kozhukatta', score: 80, kind: 'partner', fact: 'the steamed dumpling forgives the bitterness; the filter allows the softness' },
  { a: 'french-fries', b: 'shawarma', score: 88, kind: 'partner', fact: 'fries ride in the shawarma roll itself now; the treaty was amended' },
  { a: 'french-fries', b: 'ice-cream', score: 82, kind: 'partner', fact: 'salt-and-frost, the chaotic dessert-island arrangement tourists defend', as: 'weirdly works' },
  { a: 'french-fries', b: 'pizza', score: 84, kind: 'partner', fact: 'the food-court tray: neither asked, both approved' },
  { a: 'burger', b: 'ice-cream', score: 84, kind: 'partner', fact: 'the mall birthday combination: stacked then frozen, by ritual', as: 'family-function pairing' },
  { a: 'burger', b: 'pizza', score: 80, kind: 'partner', fact: 'two heavies of the food court; friendly rivalry with shared trays' },
  { a: 'banana-chips', b: 'payasam', score: 88, kind: 'partner', fact: 'the sadya leaf: chips upper left, payasam lower right, both load-bearing', as: 'society-approved pairing' },
  { a: 'banana-chips', b: 'plain-rice', score: 86, kind: 'partner', fact: 'crushed over rice with a spoon of ghee: a beloved secret, mostly at 3 pm' },
  // -- Rivalries. Not disgusting: competitive. The Bureau referees. --
  { a: 'chaya', b: 'kattan-kapi', score: 34, kind: 'rival', fact: 'the kettle and the filter have disputed billing rights since 1953', as: 'frenemies' },
  { a: 'chaya', b: 'lime-tea', score: 40, kind: 'rival', fact: 'the elder poured hot, the gulf cousin served over crushed ice. same shop, opposite theologies' },
  { a: 'kattan-kapi', b: 'lime-tea', score: 38, kind: 'rival', fact: 'filter pride versus ice-chip nonchalance; neither has blinked since 1984' },
  { a: 'pazham-pori', b: 'samosa', score: 55, kind: 'rival', fact: 'the glass case has one hero slot and both of them believe it is theirs', as: 'frenemies' },
  { a: 'parotta', b: 'plain-rice', score: 30, kind: 'rival', fact: 'two starch commanders; the plate has never recovered from the summit', as: 'rivalry' },
  { a: 'appam', b: 'puttu', score: 52, kind: 'rival', fact: 'the breakfast primary: lacy pan versus steam cylinder, one kitchen, one vote' },
  { a: 'noodles', b: 'hostel-maggi', score: 82, kind: 'partner', fact: 'same hostel, different kettles; they deny competing and compete nightly', as: 'hostel survival pairing' },
  { a: 'pizza', b: 'kerala-biriyani', score: 42, kind: 'rival', fact: 'the mall menu versus the wedding menu: a turf war with no neutral ground', as: 'rivalry' },
  { a: 'burger', b: 'shawarma', score: 48, kind: 'rival', fact: 'the late-night headliner slot has been contested since the shawarma arrived' },
  { a: 'french-fries', b: 'banana-chips', score: 45, kind: 'rival', fact: 'the fry question: one has coconut oil provenance, the other has a Belgian passport' },
  { a: 'french-fries', b: 'pazham-pori', score: 47, kind: 'rival', fact: 'golden strips versus golden batons; the oil is communal, the pride is not' },
  { a: 'samosa', b: 'french-fries', score: 56, kind: 'rival', fact: 'the bakery tray has limited space and the triangle does not share', as: 'frenemies' },
  { a: 'plain-rice', b: 'noodles', score: 44, kind: 'rival', fact: 'the plate has been held by rice for a century; noodles arrived with chopstick confidence' },
  { a: 'unniyappam', b: 'ice-cream', score: 36, kind: 'rival', fact: 'the dessert seat: one keeps for days, the other demands a freezer', as: 'rivalry' },
  { a: 'kozhukatta', b: 'ice-cream', score: 34, kind: 'rival', fact: 'the saturday plate versus the celebration cone; both claim the dessert slot', as: 'rivalry' },
  { a: 'lime-tea', b: 'pazham-pori', score: 58, kind: 'rival', fact: 'the gulf cousin orders banana fritters and calls them fusion; the bench noticed', as: 'frenemies' },
  // -- Wildcards. Strange, funny, but the Bureau cannot disprove them. --
  { a: 'pazham-pori', b: 'beef-fry', score: 62, kind: 'wildcard', fact: 'the 2 am hotel order that defies the Bench No. 2 seating chart; suspicious but recurring', as: 'chaotic but acceptable' },
  { a: 'pazham-pori', b: 'ice-cream', score: 60, kind: 'wildcard', fact: 'hot fritter, cold scoop: temperature diplomacy at its least stable', as: 'weirdly works' },
  { a: 'chaya', b: 'ice-cream', score: 55, kind: 'wildcard', fact: 'the elder has watched the freezer celebrity melt at every summer function', as: 'one-sided obsession' },
  { a: 'kattan-kapi', b: 'parotta', score: 64, kind: 'wildcard', fact: 'the night-shift filter pours for the morning-shift parotta; nobody planned this', as: 'chaotic but acceptable' },
  { a: 'banana-chips', b: 'parotta', score: 66, kind: 'wildcard', fact: 'crushed chips inside a porotta roll: documented in three canteens and denied by four' },
  { a: 'banana-chips', b: 'hostel-maggi', score: 58, kind: 'wildcard', fact: 'chips crushed on top of kettle maggi: the crunch rescue, attempted quarterly' },
  { a: 'appam', b: 'hostel-maggi', score: 56, kind: 'wildcard', fact: 'the ferment and the kettle met once; the pan has not spoken of it since', as: 'chaotic but acceptable' },
  { a: 'pizza', b: 'banana-chips', score: 52, kind: 'wildcard', fact: 'mall pizza, sadya crunch: the fusion canteen experiment nobody ordered', as: 'chaotic but acceptable' },
  { a: 'shawarma', b: 'appam', score: 58, kind: 'wildcard', fact: 'appam as shawarma wrap: attempted at one stall in Kozhikode, twice', as: 'weirdly works' },
  { a: 'lime-tea', b: 'french-fries', score: 78, kind: 'partner', fact: 'beach-afternoon standard issue; the ice accepts the salt without complaint' },
  { a: 'plain-rice', b: 'burger', score: 30, kind: 'conflict', fact: 'the matthu refuses to hold a cardboard tower; structural incompatibility, not personal', as: 'absolutely not' },
  { a: 'hostel-maggi', b: 'kerala-biriyani', score: 46, kind: 'wildcard', fact: 'the dum and the kettle met at a hostel fest; both were changed, briefly', as: 'chaotic but acceptable' },
  { a: 'noodles', b: 'samosa', score: 61, kind: 'wildcard', fact: 'samosa crushed into noodles: the canteen plate that works and knows it should not', as: 'weirdly works' },
  { a: 'payasam', b: 'unniyappam', score: 78, kind: 'partner', fact: 'pradhaman and unniyappam: two jaggery institutions, one shelf, mutual respect' },
  { a: 'pickle', b: 'chaya', score: 76, kind: 'partner', fact: 'achar with strong tea: the office-tiffin doctrine, defended loudly' },
  { a: 'stew', b: 'puttu', score: 74, kind: 'partner', fact: 'puttu with stew: the alternate-morning covenant, less famous than kadala but real' },
  { a: 'stew', b: 'parotta', score: 72, kind: 'partner', fact: 'stew on porotta: the Sunday brunch attempt that somehow keeps succeeding' },
  // -- Conflicts. The Bureau keeps these files in a separate locked drawer. --
  { a: 'ice-cream', b: 'beef-fry', score: 8, kind: 'conflict', fact: 'freezer celebrity meets iron pan: the thermal shock alone is a police matter', as: 'culinary enemies' },
  { a: 'ice-cream', b: 'chaya', score: 12, kind: 'conflict', fact: 'the kettle has never approved of the freezer and says so at every function' },
  { a: 'ice-cream', b: 'kerala-biriyani', score: 40, kind: 'wildcard', fact: 'dessert after biriyani is legal; on the same spoon is a different filing', as: 'chaotic but acceptable' },
  { a: 'ice-cream', b: 'parotta', score: 14, kind: 'conflict', fact: 'a food that makes a mess cannot court a food that melts; physics refuses' },
  { a: 'ice-cream', b: 'samosa', score: 16, kind: 'conflict', fact: 'hot spiced triangle into frost: the chutney would file a complaint', as: 'culinary enemies' },
  { a: 'ice-cream', b: 'puttu', score: 18, kind: 'conflict', fact: 'steam certification and freezer storage issue each other citations on sight' },
  { a: 'beef-fry', b: 'payasam', score: 14, kind: 'conflict', fact: 'roasted curry leaves and celebration sugar: the sadya leaf keeps them apart', as: 'culinary enemies' },
  { a: 'beef-fry', b: 'kozhukatta', score: 12, kind: 'conflict', fact: 'the grandmother plate and the iron pan occupy separate districts' },
  { a: 'beef-fry', b: 'unniyappam', score: 20, kind: 'conflict', fact: 'jaggery gentleness cannot survive an iron pan introduction' },
  { a: 'beef-fry', b: 'banana-chips', score: 44, kind: 'wildcard', fact: 'crushed chips over beef fry exists in exactly one toddy shop; it is guarded', as: 'chaotic but acceptable' },
  { a: 'plain-rice', b: 'pizza', score: 22, kind: 'conflict', fact: 'the baseline and the mall: rice cannot absorb cheese philosophy', as: 'absolutely not' },
  { a: 'plain-rice', b: 'ice-cream', score: 26, kind: 'conflict', fact: 'rice has held hot curries for a century; frost is outside the job description' },
  { a: 'plain-rice', b: 'biscuit', score: 24, kind: 'conflict', fact: 'a staple and a dunking implement: the Bureau sees no plate where both belong' },
  { a: 'parotta', b: 'ice-cream', score: 14, kind: 'conflict', fact: 'a food that makes a mess cannot court a food that melts; physics refuses', as: 'culinary enemies' },
  { a: 'parotta', b: 'payasam', score: 20, kind: 'conflict', fact: 'flaky layers and flowing sugar: one plate, zero outcomes' },
  { a: 'shawarma', b: 'puttu', score: 26, kind: 'conflict', fact: 'the 1 am stall and the 7 am cylinder: their hours have never once overlapped' },
  { a: 'shawarma', b: 'payasam', score: 22, kind: 'conflict', fact: 'mayonnaise economics and jaggery rivers: the stomach files first' },
  { a: 'shawarma', b: 'kozhukatta', score: 24, kind: 'conflict', fact: 'the quiet saturday dumpling has no business at the vertical spit' },
  { a: 'puttu', b: 'pizza', score: 24, kind: 'conflict', fact: 'the cylinder and the cardboard tower: both are built, neither is edible together' },
  { a: 'puttu', b: 'burger', score: 26, kind: 'conflict', fact: 'the tower and the cylinder decline mediation; both arrived pre-built' },
  { a: 'puttu', b: 'shawarma', score: 26, kind: 'conflict', fact: 'the shift timings are final: 7 am and 1 am do not negotiate' },
  { a: 'appam', b: 'pizza', score: 28, kind: 'conflict', fact: 'two flat rounds, two continents, zero shared ceremonies' },
  { a: 'appam', b: 'burger', score: 30, kind: 'conflict', fact: 'the lacy border and the stacked tower: the pan and the box disagree' },
  { a: 'chaya', b: 'noodles', score: 30, kind: 'conflict', fact: 'the kettle has watched the wok from across the shop for years; no tea has been offered' },
  { a: 'chaya', b: 'burger', score: 32, kind: 'conflict', fact: 'the elder disapproves of eating anything that requires two hands and a strategy' },
  { a: 'kattan-kapi', b: 'plain-rice', score: 28, kind: 'conflict', fact: 'the filter refuses to be poured over the matthu; the matthu agrees', as: 'absolutely not' },
  { a: 'kattan-kapi', b: 'payasam', score: 30, kind: 'conflict', fact: 'bitter filter into jaggery river: both claim the other started it' },
  { a: 'lime-tea', b: 'beef-fry', score: 26, kind: 'conflict', fact: 'iced citrus at an iron pan table: the bench went silent' },
  { a: 'lime-tea', b: 'kerala-biriyani', score: 28, kind: 'conflict', fact: 'crushed ice at a wedding dum: the silk objected immediately' },
  { a: 'lime-tea', b: 'puttu', score: 30, kind: 'conflict', fact: 'the gulf cousin and the steam purist: morning has rejected this pairing twice' },
  { a: 'banana-chips', b: 'ice-cream', score: 18, kind: 'conflict', fact: 'coconut-oil crunch into freezer softness: the sadya line wept' },
  { a: 'noodles', b: 'payasam', score: 26, kind: 'conflict', fact: 'soy sauce and jaggery: the plate returned to the kitchen on its own' },
  { a: 'noodles', b: 'unniyappam', score: 30, kind: 'conflict', fact: 'the four-minute food and the keeps-for-days food: neither understands the other'
  },
  { a: 'noodles', b: 'kerala-biriyani', score: 44, kind: 'conflict', fact: 'the dum requires patience; noodles has never once waited' },
  { a: 'noodles', b: 'banana-chips', score: 40, kind: 'conflict', fact: 'the wok and the sadya tray: crunch dissolves, everyone loses' },
]


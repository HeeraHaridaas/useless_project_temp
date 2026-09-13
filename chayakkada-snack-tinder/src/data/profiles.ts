/**
 * Structured food-relationship metadata. The compat engine reads this, not vibes.
 *
 * Flavour axes are 0-10. Temperature uses the hot/warm/cool/cold scale because
 * the Bureau rejects Celsius on principle: too modern, melts ice cream.
 */

export type Temperature = 'hot' | 'warm' | 'cool' | 'cold'
export type MealRole = 'snack' | 'meal' | 'beverage' | 'dessert' | 'topping' | 'condiment'
export type Context = 'chayakkada' | 'home kitchen' | 'bakery' | 'street' | 'wedding' | 'hostel' | 'mall'

export type FoodProfile = {
  flavour: {
    sweet: number
    spice: number
    richness: number
    /** crunch .. soft; high = crisp, flaky, structurally loud */
    crunch: number
    /** high = plain, mild, takes the shape of its company */
    plainness: number
  }
  temperature: Temperature
  role: MealRole
  context: Context
  archetype: string
  relationshipStyle: string
  /** Broad lures the personality layer matches on. */
  tags: string[]
  /** Culturally sensible daily companions. Strong, boring, correct. */
  partners: string[]
  /** Competitors. Not disgusting together; they compete for the same slot. */
  rivals: string[]
  conflicts: {
    /** Actively bad on a plate, in a stomach, or in principle. */
    foods: string[]
    /** Structural conflicts, e.g. oil vs ice. */
    principles: string[]
  }
  /** Unusual but believable combinations. The Bureau's chaos division. */
  wildcards: string[]
  /** Pair-specific facts the comment engine cites. */
  facts: string[]
}

export const PROFILES: Record<string, FoodProfile> = {
  'pazham-pori': {
    flavour: { sweet: 6, spice: 0, richness: 5, crunch: 7, plainness: 3 },
    temperature: 'warm',
    role: 'snack',
    context: 'chayakkada',
    archetype: 'the tea-shop celebrity',
    relationshipStyle: 'Loved by everyone, committed to the 4:45 pm slot',
    tags: ['loves tea', 'evening person', 'fried', 'sweet-toothed', 'crowd-pleaser'],
    partners: ['chaya', 'samosa', 'unniyappam', 'kattan-kapi', 'biscuit'],
    rivals: ['samosa', 'french-fries'],
    conflicts: {
      foods: ['ice-cream', 'beef-fry', 'plain-rice'],
      principles: [
        'one of them is dessert-adjacent and the other is iron-pan company',
        'cold dairy considers hot coconut oil a personal insult',
      ],
    },
    wildcards: ['beef-fry', 'ice-cream', 'kerala-biriyani'],
    facts: [
      'pazham pori has never once skipped the 4:45 pm slot',
      'pazham pori arrives wrapped in newspaper and is discussed like weather',
      'pazham pori believes chaya is the only beverage that takes it seriously',
    ],
  },
  parotta: {
    flavour: { sweet: 0, spice: 1, richness: 8, crunch: 6, plainness: 1 },
    temperature: 'hot',
    role: 'meal',
    context: 'street',
    archetype: 'the flaky drama king',
    relationshipStyle: 'High-maintenance, loyal to a fault, sheds layers everywhere',
    tags: ['loves curry', 'night person', 'flaky', 'drama', 'crowd-pleaser'],
    partners: ['beef-fry', 'kerala-biriyani', 'chaya', 'egg', 'kadala-curry'],
    rivals: ['plain-rice', 'appam', 'noodles'],
    conflicts: {
      foods: ['plain-rice', 'ice-cream', 'payasam'],
      principles: [
        'two starch commanders cannot share one plate without a referendum',
        'a food that makes a mess cannot court a food that melts',
      ],
    },
    wildcards: ['banana-chips', 'french-fries'],
    facts: [
      'parotta is slapped, stretched and folded in public every single day',
      'parotta has never been eaten quietly in the history of the state',
      'parotta measures all relationships by how much curry they can absorb',
    ],
  },
  appam: {
    flavour: { sweet: 2, spice: 0, richness: 3, crunch: 4, plainness: 6 },
    temperature: 'warm',
    role: 'meal',
    context: 'home kitchen',
    archetype: 'the well-raised diplomat',
    relationshipStyle: 'Emotionally intelligent, goes with everything, quietly confident',
    tags: ['loves stew', 'morning person', 'soft-centred', 'fermented', 'crowd-pleaser'],
    partners: ['stew', 'kadala-curry', 'egg', 'chaya', 'beef-fry'],
    rivals: ['puttu', 'parotta', 'plain-rice'],
    conflicts: {
      foods: ['ice-cream', 'pizza', 'burger'],
      principles: [
        'lacy fermented borders and freezer sections do not negotiate',
        'the pan ceremonies of one baffle the delivery apps of the other',
      ],
    },
    wildcards: ['hostel-maggi', 'french-fries'],
    facts: [
      'appam is fermented overnight, which it mentions whenever patience is discussed',
      'appam judges a relationship by how the centre holds',
      'appam believes stew is the only partner ever formally proposed',
    ],
  },
  puttu: {
    flavour: { sweet: 2, spice: 0, richness: 2, crunch: 1, plainness: 8 },
    temperature: 'hot',
    role: 'meal',
    context: 'home kitchen',
    archetype: 'the steam-purist bureaucrat',
    relationshipStyle: 'Dependable, structured, insufferable about cholesterol',
    tags: ['loves kadala', 'morning person', 'steamed', 'traditional', 'planner'],
    partners: ['kadala-curry', 'payasam', 'banana-chips', 'chaya', 'egg'],
    rivals: ['appam', 'parotta', 'noodles'],
    conflicts: {
      foods: ['pizza', 'burger', 'ice-cream', 'shawarma'],
      principles: [
        'steam-only certification cannot survive contact with a deep fryer courtship',
        'one partner is built in a cylinder, the other arrives in a cardboard tower',
      ],
    },
    wildcards: ['banana-chips', 'hostel-maggi'],
    facts: [
      'puttu has never seen a pan and brings it up at every meal',
      'puttu is built in layers and expects relationships to be the same',
      'puttu considers kadala curry the only legally recognised partner',
    ],
  },
  unniyappam: {
    flavour: { sweet: 8, spice: 0, richness: 6, crunch: 5, plainness: 3 },
    temperature: 'warm',
    role: 'dessert',
    context: 'chayakkada',
    archetype: 'the self-contained traditionalist',
    relationshipStyle: 'Keeps for days, no drama, judges modern desserts silently',
    tags: ['loves tea', 'traditional', 'sweet-toothed', 'jaggery-hearted', 'planner'],
    partners: ['chaya', 'kattan-kapi', 'payasam', 'kozhukatta', 'biscuit'],
    rivals: ['ice-cream', 'kozhukatta'],
    conflicts: {
      foods: ['beef-fry', 'shawarma', 'pizza'],
      principles: [
        'jaggery-hearted gentleness cannot sit opposite an iron pan',
        'one keeps for days, the other does not keep at all',
      ],
    },
    wildcards: ['beef-fry', 'french-fries'],
    facts: [
      'unniyappam keeps for days and considers this a personality',
      'unniyappam has never appeared at a venue it was not invited to',
      'unniyappam measures every modern dessert and finds it damp',
    ],
  },
  samosa: {
    flavour: { sweet: 0, spice: 5, richness: 7, crunch: 8, plainness: 2 },
    temperature: 'hot',
    role: 'snack',
    context: 'bakery',
    archetype: 'the naturalised overachiever',
    relationshipStyle: 'First at every party, hoards conversations, brings its own chutney',
    tags: ['loves tea', 'spicy', 'fried', 'opinionated', 'crowd-pleaser'],
    partners: ['chaya', 'pazham-pori', 'french-fries', 'biscuit', 'kattan-kapi'],
    rivals: ['pazham-pori', 'parotta', 'french-fries'],
    conflicts: {
      foods: ['ice-cream', 'payasam', 'plain-rice'],
      principles: [
        'a triangle that loud cannot share a plate with something that melts',
        'spiced interiors and sweet exteriors cancel each other socially',
      ],
    },
    wildcards: ['kerala-biriyani', 'noodles'],
    facts: [
      'samosa arrived decades ago and still introduces itself as a guest',
      'samosa has never entered a room quietly',
      'samosa brings its own chutney to everything, including funerals',
    ],
  },
  'banana-chips': {
    flavour: { sweet: 2, spice: 1, richness: 6, crunch: 10, plainness: 4 },
    temperature: 'cool',
    role: 'topping',
    context: 'wedding',
    archetype: 'the sadya loudspeaker',
    relationshipStyle: 'Essential, loud, correct, always talking',
    tags: ['loves sadya', 'traditional', 'fried', 'loud', 'planner'],
    partners: ['plain-rice', 'payasam', 'chaya', 'puttu'],
    rivals: ['french-fries', 'noodles'],
    conflicts: {
      foods: ['ice-cream', 'hostel-maggi', 'pizza'],
      principles: [
        'the sadya line and the food court have never recognised each other',
        'coconut-oil crispness and freezer softness are opposing philosophies',
      ],
    },
    wildcards: ['parotta', 'hostel-maggi'],
    facts: [
      'banana chips crackle in coconut oil by the hundred and pack by the kilo',
      'a sadya without chips is not a sadya and chips will say so',
      'banana chips have travelled further than most people in this state',
    ],
  },
  kozhukatta: {
    flavour: { sweet: 5, spice: 0, richness: 4, crunch: 0, plainness: 7 },
    temperature: 'warm',
    role: 'dessert',
    context: 'home kitchen',
    archetype: 'the grandmother-coded minimalist',
    relationshipStyle: 'Quiet, modest, appears on Saturdays, asks for nothing',
    tags: ['traditional', 'sweet-toothed', 'steamed', 'soft-centred', 'planner'],
    partners: ['chaya', 'unniyappam', 'payasam', 'puttu'],
    rivals: ['unniyappam', 'ice-cream'],
    conflicts: {
      foods: ['beef-fry', 'shawarma', 'pizza'],
      principles: [
        'saturday steaming rituals and vertical spits operate on different calendars',
        'one of them has never been photographed, the other is mostly camera',
      ],
    },
    wildcards: ['noodles', 'french-fries'],
    facts: [
      'kozhukatta appears on Saturdays, made by a grandmother who refuses thanks',
      'kozhukatta has no wrapper, no fanfare and no idea what a trend is',
      'kozhukatta judges silence to be the highest form of review',
    ],
  },
  'beef-fry': {
    flavour: { sweet: 0, spice: 8, richness: 9, crunch: 3, plainness: 0 },
    temperature: 'hot',
    role: 'meal',
    context: 'street',
    archetype: 'the iron-pan loyalist',
    relationshipStyle: 'Intense, unapologetic, rides with you at 2 am',
    tags: ['loves parotta', 'spicy', 'night person', 'intense', 'nonconformist'],
    partners: ['parotta', 'kerala-biriyani', 'appam', 'chaya', 'egg'],
    rivals: ['kerala-biriyani', 'plain-rice'],
    conflicts: {
      foods: ['ice-cream', 'payasam', 'kozhukatta', 'pazham-pori'],
      principles: [
        'roasted curry leaves and freezer aisles have nothing to discuss',
        'iron pans and celebration sugar operate at incompatible temperatures',
      ],
    },
    wildcards: ['pazham-pori', 'ice-cream'],
    facts: [
      'beef fry arrives at the table still sizzling and the table goes quiet',
      'beef fry has never apologised and does not intend to start',
      'beef fry measures loyalty in curry leaves, not words',
    ],
  },
  'kerala-biriyani': {
    flavour: { sweet: 3, spice: 5, richness: 8, crunch: 2, plainness: 1 },
    temperature: 'hot',
    role: 'meal',
    context: 'wedding',
    archetype: 'the ceremonial headliner',
    relationshipStyle: 'Appears at every major life event, expects an occasion',
    tags: ['loves weddings', 'ceremonial', 'spicy', 'rich', 'crowd-pleaser'],
    partners: ['payasam', 'parotta', 'beef-fry', 'banana-chips', 'pickle'],
    rivals: ['beef-fry', 'plain-rice', 'parotta'],
    conflicts: {
      foods: ['ice-cream', 'hostel-maggi', 'noodles'],
      principles: [
        'a dum timed to the minute cannot tolerate kettle cooking',
        'wedding silks and hostel forks do not enter the same hall',
      ],
    },
    wildcards: ['ice-cream', 'noodles'],
    facts: [
      'kerala biriyani is jeerakasala rice, fried onion and ghee, timed to the minute',
      'kerala biriyani has attended every major life event since records began',
      'kerala biriyani gossips about other biriyanis and considers it research',
    ],
  },
  chaya: {
    flavour: { sweet: 3, spice: 1, richness: 3, crunch: 0, plainness: 5 },
    temperature: 'hot',
    role: 'beverage',
    context: 'chayakkada',
    archetype: 'the all-seeing elder',
    relationshipStyle: 'Knows everyone\'s business, repeats nothing, judges everything',
    tags: ['loves snacks', 'all-day', 'observant', 'traditional', 'elder'],
    partners: ['pazham-pori', 'samosa', 'parotta', 'unniyappam', 'biscuit'],
    rivals: ['kattan-kapi', 'lime-tea'],
    conflicts: {
      foods: ['ice-cream', 'noodles', 'burger'],
      principles: [
        'the kettle has never approved of the freezer',
        'one has watched the state since 1938, the other arrived with a freezer',
      ],
    },
    wildcards: ['ice-cream', 'noodles', 'burger'],
    facts: [
      'chaya is poured between two glasses at height, as performance and policy',
      'chaya has witnessed every argument on this register and repeated none',
      'chaya is sold at the price of a phone call and knows your usual',
    ],
  },
  'kattan-kapi': {
    flavour: { sweet: 2, spice: 0, richness: 5, crunch: 0, plainness: 3 },
    temperature: 'hot',
    role: 'beverage',
    context: 'home kitchen',
    archetype: 'the bitter insomniac',
    relationshipStyle: 'Intense, defensive, secretly romantic about mornings',
    tags: ['loves bakery', 'morning person', 'intense', 'bitter', 'nonconformist'],
    partners: ['biscuit', 'unniyappam', 'samosa', 'kozhukatta'],
    rivals: ['chaya', 'lime-tea'],
    conflicts: {
      foods: ['ice-cream', 'payasam', 'plain-rice'],
      principles: [
        'filter bitterness and dessert sweetness argue in every cup',
        'one rises before dawn, the other has never been awake before noon',
      ],
    },
    wildcards: ['parotta', 'banana-chips'],
    facts: [
      'kattan kapi is brewed in a brass filter and considers this superior',
      'kattan kapi is darker than necessary and knows it',
      'kattan kapi has never forgiven the kettle for the billing arrangement',
    ],
  },
  'lime-tea': {
    flavour: { sweet: 6, spice: 0, richness: 1, crunch: 0, plainness: 4 },
    temperature: 'cold',
    role: 'beverage',
    context: 'street',
    archetype: 'the gulf-returned contrarian',
    relationshipStyle: 'Refreshing, smug, sunglasses indoors',
    tags: ['loves afternoons', 'contrarian', 'chilled', 'sweet-toothed', 'nonconformist'],
    partners: ['french-fries', 'burger', 'samosa', 'shawarma'],
    rivals: ['chaya', 'kattan-kapi'],
    conflicts: {
      foods: ['beef-fry', 'kerala-biriyani', 'puttu'],
      principles: [
        'iced citrus and iron pans do not share a table by law',
        'one exists for hot afternoons, the other makes them',
      ],
    },
    wildcards: ['pizza', 'burger'],
    facts: [
      'lime tea came back from the Gulf with a sunglasses habit',
      'lime tea is the only item on this register served with crushed ice',
      'lime tea considers purists a form of entertainment',
    ],
  },
  pizza: {
    flavour: { sweet: 2, spice: 3, richness: 8, crunch: 5, plainness: 2 },
    temperature: 'warm',
    role: 'meal',
    context: 'mall',
    archetype: 'the camera-ready extrovert',
    relationshipStyle: 'Confident, expensive, believes cheese solves problems',
    tags: ['loves delivery', 'city-bred', 'cheese-forward', 'photogenic', 'loud'],
    partners: ['french-fries', 'burger', 'ice-cream', 'shawarma'],
    rivals: ['burger', 'kerala-biriyani', 'noodles'],
    conflicts: {
      foods: ['plain-rice', 'puttu', 'appam', 'payasam'],
      principles: [
        'the mall and the matthu have never exchanged recipes',
        'one is plated for cameras, the other has never been photographed',
      ],
    },
    wildcards: ['banana-chips', 'parotta'],
    facts: [
      'pizza arrived with the malls and never left',
      'pizza orders are placed in its name without consultation',
      'pizza believes cheese is a coping mechanism and is mostly right',
    ],
  },
  shawarma: {
    flavour: { sweet: 1, spice: 6, richness: 7, crunch: 3, plainness: 2 },
    temperature: 'hot',
    role: 'snack',
    context: 'street',
    archetype: 'the last one awake',
    relationshipStyle: 'Night-shift loyalist, wrapped tight, no pretence',
    tags: ['loves nights', 'night person', 'spicy', 'chaotic', 'wrapped'],
    partners: ['french-fries', 'burger', 'parotta', 'egg'],
    rivals: ['parotta', 'pizza', 'burger'],
    conflicts: {
      foods: ['puttu', 'kozhukatta', 'appam', 'payasam'],
      principles: [
        'the 1 am stall and the 7 am cylinder have never overlapped',
        'mayonnaise volumes of this order are a commitment, not a garnish',
      ],
    },
    wildcards: ['appam', 'noodles'],
    facts: [
      'shawarma spins on a vertical spit like it is auditioning',
      'shawarma serves at hours no respectable food admits to',
      'the shawarma chilli sauce has ended friendships; it keeps count',
    ],
  },
  burger: {
    flavour: { sweet: 3, spice: 3, richness: 7, crunch: 4, plainness: 3 },
    temperature: 'warm',
    role: 'meal',
    context: 'mall',
    archetype: 'the optimistic stack',
    relationshipStyle: 'Up for anything, falls apart under pressure, photogenic',
    tags: ['loves fries', 'city-bred', 'layered', 'optimistic', 'loud'],
    partners: ['french-fries', 'ice-cream', 'shawarma', 'pizza'],
    rivals: ['pizza', 'shawarma', 'kerala-biriyani'],
    conflicts: {
      foods: ['puttu', 'plain-rice', 'appam', 'kozhukatta'],
      principles: [
        'a cardboard tower and a steam cylinder cannot share a tablecloth',
        'lettuce included for the feeling of health is not a value the matthu recognises',
      ],
    },
    wildcards: ['lime-tea', 'parotta'],
    facts: [
      'burger requires two hands and a strategy from the first bite',
      'burger thinks it looks great in photos and is mostly right',
      'burger includes lettuce purely for the feeling of health',
    ],
  },
  'ice-cream': {
    flavour: { sweet: 10, spice: 0, richness: 7, crunch: 0, plainness: 2 },
    temperature: 'cold',
    role: 'dessert',
    context: 'mall',
    archetype: 'the emotionally unavailable freezer celebrity',
    relationshipStyle: 'Present at celebrations and heartbreaks, melts when things get warm',
    tags: ['loves dessert', 'chilled', 'sweet-toothed', 'melts', 'contrarian'],
    partners: ['burger', 'french-fries', 'pizza', 'payasam'],
    rivals: ['payasam', 'unniyappam', 'kozhukatta'],
    conflicts: {
      foods: ['beef-fry', 'chaya', 'parotta', 'samosa', 'banana-chips', 'kerala-biriyani', 'pickle', 'appam', 'puttu', 'shawarma', 'egg'],
      principles: [
        'freezer and iron pan: the Bureau has a whole drawer on this',
        'melts at room temperature, let alone at the temperature of curry',
      ],
    },
    wildcards: ['chaya', 'beef-fry', 'french-fries'],
    facts: [
      'ice cream attends every celebration and every heartbreak',
      'ice cream melts exactly when things get warm, every single time',
      'ice cream changes flavour personality weekly and calls it growth',
    ],
  },
  'french-fries': {
    flavour: { sweet: 0, spice: 1, richness: 6, crunch: 9, plainness: 4 },
    temperature: 'warm',
    role: 'topping',
    context: 'mall',
    archetype: 'the eternal supporting character',
    relationshipStyle: 'Zero ego, eaten first, credited never',
    tags: ['loves ketchup', 'crowd-pleaser', 'fried', 'supportive', 'unpretentious'],
    partners: ['burger', 'shawarma', 'pizza', 'ice-cream'],
    rivals: ['banana-chips', 'pazham-pori', 'samosa'],
    conflicts: {
      foods: ['payasam', 'puttu', 'appam', 'kozhukatta'],
      principles: [
        'salted golden strips and jaggery dumplings are different kinds of support',
        'ketchup diplomacy is not recognised in traditional kitchens',
      ],
    },
    wildcards: ['pazham-pori', 'appam', 'lime-tea'],
    facts: [
      'french fries have never headlined anything and are at peace with this',
      'french fries are eaten first regardless of who ordered what',
      'french fries go cold and bitter in under six minutes, they counted',
    ],
  },
  'plain-rice': {
    flavour: { sweet: 0, spice: 0, richness: 0, crunch: 0, plainness: 10 },
    temperature: 'warm',
    role: 'meal',
    context: 'home kitchen',
    archetype: 'the patient foundation',
    relationshipStyle: 'Neutral, foundational, witnesses everything',
    tags: ['loves curries', 'traditional', 'planner', 'adaptive', 'quiet'],
    partners: ['banana-chips', 'pickle', 'kadala-curry', 'beef-fry', 'kerala-biriyani'],
    rivals: ['parotta', 'noodles', 'pizza'],
    conflicts: {
      foods: ['pizza', 'burger', 'ice-cream', 'biscuit'],
      principles: [
        'the baseline cannot be in a relationship with a condiment',
        'rice absorbs culture; burgers supply it',
      ],
    },
    wildcards: ['ice-cream', 'biscuit'],
    facts: [
      'plain rice has served three times a day since before personality existed',
      'plain rice takes the shape of every curry it meets and lets them shine',
      'plain rice considers fish curry the next day a small revenge',
    ],
  },
  noodles: {
    flavour: { sweet: 1, spice: 4, richness: 5, crunch: 0, plainness: 3 },
    temperature: 'hot',
    role: 'meal',
    context: 'hostel',
    archetype: 'the flexible survivor',
    relationshipStyle: 'Adapts to any situation, commits to none',
    tags: ['loves adaptation', 'hostel-raised', 'fast', 'chaotic', 'nonconformist'],
    partners: ['egg', 'hostel-maggi', 'shawarma', 'french-fries'],
    rivals: ['plain-rice', 'parotta', 'kerala-biriyani'],
    conflicts: {
      foods: ['kerala-biriyani', 'payasam', 'unniyappam', 'banana-chips'],
      principles: [
        'four-minute cooking and minute-timed dum are mutually offended',
        'soy sauce packets and wedding silks have never shared a table',
      ],
    },
    wildcards: ['kerala-biriyani', 'samosa'],
    facts: [
      'noodles cooks in four minutes and adapts to whatever is in the pan',
      'noodles has survived more late nights than anyone on the register',
      'noodles has no fixed position on anything, which is the whole problem',
    ],
  },
  'hostel-maggi': {
    flavour: { sweet: 1, spice: 5, richness: 4, crunch: 0, plainness: 2 },
    temperature: 'hot',
    role: 'meal',
    context: 'hostel',
    archetype: 'the 2 am confidant',
    relationshipStyle: 'Emotionally available at 1:47 am, made in a kettle, forgiving',
    tags: ['loves deadlines', 'hostel-raised', 'communal', 'forgiving', 'chaotic'],
    partners: ['egg', 'noodles', 'chaya', 'shawarma'],
    rivals: ['kerala-biriyani', 'puttu'],
    conflicts: {
      foods: ['kerala-biriyani', 'payasam', 'banana-chips', 'plain-rice'],
      principles: [
        'kettle-born noodles and ceremonial dum eat from different economies',
        'one is shared with one fork among four, the other expects silk',
      ],
    },
    wildcards: ['kerala-biriyani', 'appam'],
    facts: [
      'hostel maggi is made in a kettle that has seen things',
      'hostel maggi is eaten at 1:47 am while discussing career fears',
      'hostel maggi feeds four people with one fork and remembers your worst nights kindly',
    ],
  },
  'kadala-curry': {
    flavour: { sweet: 1, spice: 4, richness: 5, crunch: 1, plainness: 3 },
    temperature: 'hot',
    role: 'topping',
    context: 'home kitchen',
    archetype: 'the morning registrar',
    relationshipStyle: 'Dependable, poured with authority, legally bonded to puttu',
    tags: ['loves puttu', 'morning person', 'spiced but calm', 'planner', 'traditional'],
    partners: ['puttu', 'appam', 'parotta', 'plain-rice', 'egg'],
    rivals: ['stew', 'plain-rice'],
    conflicts: {
      foods: ['ice-cream', 'pizza', 'biscuit'],
      principles: [
        'breakfast gravity cannot be poured over mall food',
        'roasted coconut gravies and freezer aisles have separate jurisdictions',
      ],
    },
    wildcards: ['kerala-biriyani', 'noodles'],
    facts: [
      'kadala curry is poured over puttu with the confidence of a lease agreement',
      'kadala curry has never missed a breakfast appointment',
      'kadala curry improves overnight and knows it',
    ],
  },
  stew: {
    flavour: { sweet: 1, spice: 2, richness: 6, crunch: 0, plainness: 6 },
    temperature: 'warm',
    role: 'topping',
    context: 'home kitchen',
    archetype: 'the coconut-milk diplomat',
    relationshipStyle: 'Calms every table, never raises its heat, designed for appam',
    tags: ['loves appam', 'gentle', 'aromatic', 'morning person', 'planner'],
    partners: ['appam', 'puttu', 'parotta', 'egg'],
    rivals: ['kadala-curry', 'beef-fry'],
    conflicts: {
      foods: ['shawarma', 'burger', 'noodles'],
      principles: [
        'restraint of this order cannot survive mayonnaise economics',
        'whole spices and vertical spits run on different calendars',
      ],
    },
    wildcards: ['hostel-maggi', 'french-fries'],
    facts: [
      'stew is coconut milk, whole spices and remarkable restraint',
      'stew has calmed every Travancore morning since the recipe was first guarded',
      'stew considers chilli bravado a character flaw',
    ],
  },
  egg: {
    flavour: { sweet: 0, spice: 3, richness: 5, crunch: 1, plainness: 6 },
    temperature: 'hot',
    role: 'topping',
    context: 'street',
    archetype: 'the universal understudy',
    relationshipStyle: 'Cast in every production, delivers every time, never needs the credit',
    tags: ['works with everything', 'uncredited', 'reliable', 'fast', 'crowd-pleaser'],
    partners: ['appam', 'parotta', 'noodles', 'hostel-maggi', 'puttu', 'beef-fry'],
    rivals: ['beef-fry'],
    conflicts: {
      foods: ['ice-cream', 'payasam', 'biscuit'],
      principles: [
        'savoury versatility and dessert ceremony do not audition together',
        'the smell travels; the freezer celebrity has complained formally',
      ],
    },
    wildcards: ['kerala-biriyani', 'banana-chips'],
    facts: [
      'egg has done every job in this state and stopped needing the credit',
      'egg is ready in four minutes at any hour at any budget',
      'egg is slightly smug about protein and hides it poorly',
    ],
  },
  biscuit: {
    flavour: { sweet: 5, spice: 0, richness: 4, crunch: 9, plainness: 6 },
    temperature: 'cool',
    role: 'snack',
    context: 'bakery',
    archetype: 'the dunk-time professional',
    relationshipStyle: 'Always in stock, no opinions, improves every beverage it meets',
    tags: ['loves tea', 'unassuming', 'bakery-born', 'dunkable', 'quiet'],
    partners: ['chaya', 'kattan-kapi', 'unniyappam', 'samosa'],
    rivals: ['kozhukatta'],
    conflicts: {
      foods: ['plain-rice', 'beef-fry', 'pickle'],
      principles: [
        'a dunking implement cannot hold a plate together',
        'butter-baked mildness and iron pan intensity cancel out',
      ],
    },
    wildcards: ['payasam', 'french-fries'],
    facts: [
      'the bakery biscuit is sold loose by the quarter kilo in paper bags',
      'the bakery biscuit has one job and performs it without ambition',
      'dunk time is measured in seconds and everyone knows the correct number',
    ],
  },
  payasam: {
    flavour: { sweet: 9, spice: 0, richness: 8, crunch: 1, plainness: 2 },
    temperature: 'warm',
    role: 'dessert',
    context: 'wedding',
    archetype: 'the sadya full stop',
    relationshipStyle: 'Arrives last, closes every occasion, non-negotiable',
    tags: ['loves weddings', 'ceremonial', 'sweet-toothed', 'jaggery-hearted', 'traditional'],
    partners: ['kerala-biriyani', 'banana-chips', 'unniyappam', 'puttu'],
    rivals: ['ice-cream', 'unniyappam'],
    conflicts: {
      foods: ['beef-fry', 'shawarma', 'noodles', 'parotta'],
      principles: [
        'the sadya finale cannot follow an iron pan',
        'jaggery rivers and mayonnaise economics are separate filings',
      ],
    },
    wildcards: ['puttu', 'ice-cream', 'biscuit'],
    facts: [
      'payasam is the full stop at the end of every sadya sentence',
      'payasam is served in small cups at the exact moment the leaf is cleared',
      'every district defends its own payasam with theological fervour',
    ],
  },
  pickle: {
    flavour: { sweet: 1, spice: 9, richness: 3, crunch: 3, plainness: 0 },
    temperature: 'cool',
    role: 'condiment',
    context: 'home kitchen',
    archetype: 'the windowsill authoritarian',
    relationshipStyle: 'Tiny volume, massive opinion, ends meal conversations',
    tags: ['loves curd rice', 'intense', 'spicy', 'opinionated', 'elder'],
    partners: ['plain-rice', 'kerala-biriyani', 'chaya', 'banana-chips'],
    rivals: ['pazham-pori'],
    conflicts: {
      foods: ['ice-cream', 'payasam', 'biscuit', 'burger'],
      principles: [
        'salt-cured intensity and sweet celebration cannot share a tablespoon',
        'you do not serve achar; you concede to it',
      ],
    },
    wildcards: ['unniyappam', 'beef-fry'],
    facts: [
      'achar occupies one tablespoon of the plate and ninety percent of its personality',
      'achar is cured in ceramic jars that outlive their owners',
      'achar has ended more meal conversations than any main course',
    ],
  },
}

/**
 * One free "gift" per lesson: a printable checklist or worksheet that turns the lesson into something the
 * reader can use on their own deal. A visitor unlocks it by leaving their name, mobile and email and then
 * sending Kathryn a WhatsApp message (see components/GiftForm.tsx).
 *
 * Gifts are first-party content. Keep them factual, dated and free of predictions; point to the official
 * source for any rule, the same way the lessons do.
 */
export type GiftItem = { t: string; d?: string };
export type Gift = {
  slug: string;
  /** The lesson this gift belongs to. */
  post: string;
  title: string;
  /** One line under the title: what the reader will be able to do with it. */
  promise: string;
  /** Three or four bullets shown before the gift is unlocked. */
  inside: string[];
  sections: { heading: string; items: GiftItem[] }[];
  /** Optional blanks to fill in, shown as a worksheet. */
  fill?: { heading: string; rows: string[] };
};

const CHECKED = '21 Oct 2026';

export const GIFTS: Gift[] = [
  {
    slug: 'hdb-room-rental-checklist',
    post: 'renting-out-hdb-bedrooms-without-living-there',
    title: 'HDB Room Rental Readiness Checklist',
    promise: 'Tick every line before you rent out a bedroom in your HDB flat.',
    inside: ['The owner-occupation questions to answer first', 'What to register with HDB, and when', 'The tenant and paperwork checks', 'Red flags from agents and "room rental" offers'],
    sections: [
      {
        heading: 'Before you advertise',
        items: [
          { t: 'Confirm the flat has passed its Minimum Occupation Period', d: 'Check the date in My HDBPage, not from memory.' },
          { t: 'Check HDB’s current rules on who must live in the flat while rooms are rented', d: 'Read HDB’s “Renting out your bedroom” page on the day you decide.' },
          { t: 'Check the maximum number of occupants allowed for your flat type' },
          { t: 'Decide who will live in the flat during the tenancy, and write it down' },
        ],
      },
      {
        heading: 'Before anyone moves in',
        items: [
          { t: 'Register the tenancy with HDB within the time HDB requires' },
          { t: 'See each tenant’s original identity card or pass in person, and match the face to the photo' },
          { t: 'Check each foreign tenant’s pass is valid and eligible for HDB room rental' },
          { t: 'Put the rent, deposit, house rules and occupant names in a written agreement' },
        ],
      },
      {
        heading: 'Red flags',
        items: [
          { t: '“Everyone does it, HDB won’t check”', d: 'An agent saying yes is not the rule saying yes.' },
          { t: 'Being asked to declare something to HDB that isn’t true' },
          { t: 'A tenant who wants to move in before the checks are done' },
        ],
      },
    ],
  },
  {
    slug: 'gst-questions-before-offer',
    post: 'gst-surprise-on-industrial-property-purchase',
    title: 'GST Questions to Ask Before You Offer on a Shop, Office or Industrial Unit',
    promise: 'Five written answers to get before you put a number on the table.',
    inside: ['The exact questions to send the seller’s side', 'Where the answer must appear in the Option', 'A worksheet to run your numbers with GST included', 'Who to ask about claiming GST back'],
    sections: [
      {
        heading: 'Ask in writing',
        items: [
          { t: 'Is the seller GST-registered?' },
          { t: 'Will GST be charged on this sale, and at what rate?', d: 'The rate has been 9% since 1 January 2024.' },
          { t: 'Is the asking price before or after GST?' },
          { t: 'Is any part of the property residential, which may be treated differently?' },
          { t: 'Has the seller’s lawyer confirmed the GST position?' },
        ],
      },
      {
        heading: 'Before you sign',
        items: [
          { t: 'Ask your lawyer to check the Option states clearly whether the price includes or excludes GST' },
          { t: 'Tell your agent your deal-breakers and ask how each one will be verified' },
          { t: 'If you are GST-registered, ask your accountant whether any GST can be claimed' },
        ],
      },
    ],
    fill: { heading: 'Your numbers', rows: ['Price agreed', 'GST at 9% (if charged)', 'Total cost including GST', 'Loan amount', 'Cash needed', 'Rent ÷ total cost (gross yield)'] },
  },
  {
    slug: 'diy-resale-who-represents-whom',
    post: 'who-does-this-agent-actually-represent',
    title: 'Who Represents Whom? A DIY Resale Safety Checklist',
    promise: 'Know exactly who is on your side before you talk price.',
    inside: ['The one question to ask every person in the deal', 'How to check a salesperson on the CEA register', 'What to do before you sign any agreement', 'Red flags in “cash buyer” flyers'],
    sections: [
      {
        heading: 'For every person you deal with',
        items: [
          { t: 'Ask, out loud and in writing: who are you representing in this deal?' },
          { t: 'Look the person up on CEA’s Public Register using their registration number' },
          { t: 'Ask who is paying them, and how much' },
        ],
      },
      {
        heading: 'Before you sign anything',
        items: [
          { t: 'Read the title of the document. An Estate Agency Agreement appoints that person as your agent.' },
          { t: 'Get a copy of every document you sign, the same day' },
          { t: 'Pass every offer and counter-offer in writing, so both sides see the same numbers' },
        ],
      },
      {
        heading: 'Red flags',
        items: [
          { t: 'A “buyer” from a flyer who turns up as somebody’s agent' },
          { t: 'Being told to declare to HDB that you have no salesperson when someone is acting for you' },
          { t: 'A fee described as “just paperwork”' },
        ],
      },
    ],
  },
  {
    slug: 'fair-price-worksheet',
    post: 'how-to-check-if-a-condo-asking-price-is-fair',
    title: 'Fair Price Worksheet: Compare an Asking Price With Real Sales',
    promise: 'A one-page method to see where an asking price sits against recent sales of the same size.',
    inside: ['The four-step order: same project, same size, floor, then neighbours', 'A table to log every comparable sale', 'How to spot “not enough evidence”', 'The questions to ask when the price is above the range'],
    sections: [
      {
        heading: 'Collect the evidence',
        items: [
          { t: 'Write down the project, unit size and asking price' },
          { t: 'Pull every sale of the same size in the same project from the last 12 months', d: 'URA publishes private residential transactions by project.' },
          { t: 'Note each sale’s month, floor range and price per sq ft' },
          { t: 'If there are fewer than about five sales, widen the period carefully and note that the evidence is thin' },
        ],
      },
      {
        heading: 'Read the evidence',
        items: [
          { t: 'Where does the asking price per sq ft sit in the range?' },
          { t: 'Ignore the project-wide average across all sizes' },
          { t: 'Compare with two or three nearby projects of similar age and tenure, per sq ft' },
          { t: 'If the price is above every recent sale, ask what justifies the gap: floor, facing, condition, layout' },
        ],
      },
    ],
    fill: { heading: 'Comparable sales log', rows: ['Sale 1: month · floor · price · $psf', 'Sale 2: month · floor · price · $psf', 'Sale 3: month · floor · price · $psf', 'Sale 4: month · floor · price · $psf', 'Sale 5: month · floor · price · $psf', 'Asking price · $psf · above / within / below the range'] },
  },
  {
    slug: 'hdb-sale-proceeds-worksheet',
    post: 'hdb-cash-proceeds-second-hdb-loan',
    title: 'HDB Sale Proceeds Worksheet: What’s Really Left After You Sell',
    promise: 'Work out the cash you can actually spend before you grant an Option.',
    inside: ['The order your sale money is used in', 'Where to find each figure', 'The second-HDB-loan line most sellers miss', 'Questions to ask before you agree to sell'],
    sections: [
      {
        heading: 'Gather the figures',
        items: [
          { t: 'Outstanding HDB or bank loan', d: 'From HDB or your bank.' },
          { t: 'CPF used for the flat, plus accrued interest', d: 'From the CPF website, for every owner.' },
          { t: 'Resale levy, if it applies to you', d: 'From your HDB Flat Eligibility (HFE) letter or HDB.' },
          { t: 'How you will finance the next home: HDB loan, bank loan or cash' },
        ],
      },
      {
        heading: 'If you will take a second HDB loan',
        items: [
          { t: 'Read HDB’s current rule on using the cash proceeds from your last flat', d: `HDB generally lets you keep the higher of $25,000 or 50% of the cash; it counts the rest when setting your loan (checked ${CHECKED}).` },
          { t: 'Plan debts and renovation only on the cash you keep' },
        ],
      },
    ],
    fill: { heading: 'Your worksheet', rows: ['Expected sale price', 'Less: outstanding loan', 'Less: CPF refund (principal + accrued interest)', 'Less: costs (commission, legal, levy)', '= Cash proceeds', 'Amount HDB expects in the next flat (if second HDB loan)', '= Cash you can actually spend'] },
  },
  {
    slug: 'negative-sale-cpf-check',
    post: 'hdb-negative-sale-cpf-refund',
    title: 'Negative Sale Check: Your CPF Refund Worksheet',
    promise: 'See what your CPF will really get back before you commit to the next home.',
    inside: ['How to tell if your sale will be negative', 'The difference between “no cash top-up” and “full refund”', 'Which HDB letters to check, line by line', 'A worksheet for several sale prices'],
    sections: [
      {
        heading: 'Before you set a price',
        items: [
          { t: 'Get your outstanding loan, and CPF used plus accrued interest, for every owner' },
          { t: 'Work out the price at which the sale stops covering both' },
          { t: 'Ask whether you would need to top up in cash at your price', d: 'CPF says you generally don’t, if the property is sold at market value.' },
        ],
      },
      {
        heading: 'Before you commit to the next home',
        items: [
          { t: 'Read HDB’s statement of estimated sale proceeds and compare it with your own sums' },
          { t: 'Check every CPF refund notice against your estimate the day it arrives' },
          { t: 'Plan the next purchase on the CPF you will really have' },
        ],
      },
    ],
    fill: { heading: 'Try three prices', rows: ['Price A · less loan · = left for CPF · CPF used + interest · gap', 'Price B · less loan · = left for CPF · CPF used + interest · gap', 'Price C · less loan · = left for CPF · CPF used + interest · gap'] },
  },
  {
    slug: 'floor-area-check-card',
    post: 'check-hdb-floor-area-before-offer',
    title: 'Size Check Card: Verify the Floor Area Before You Offer',
    promise: 'Turn “the listing says” into “the official record says”.',
    inside: ['Three official places to check a flat’s size', 'The recess-area question to ask', 'How to compare price per sq ft on the true size', 'What to look for in the valuation report'],
    sections: [
      {
        heading: 'Check the size',
        items: [
          { t: 'Ask the seller’s side for the floor area from an official document' },
          { t: 'Ask whether that figure includes any recess area or approved extension' },
          { t: 'Check it against an official source, such as an SLA INLIS property search or HDB’s records' },
          { t: 'Convert carefully: 1 sqm = 10.764 sq ft' },
        ],
      },
      {
        heading: 'Then re-check the price',
        items: [
          { t: 'Work out price per sq ft on the true size' },
          { t: 'Compare it with recent sales of the same flat type nearby' },
          { t: 'Read the floor area line on the valuation report, not only the value' },
        ],
      },
    ],
    fill: { heading: 'Your check', rows: ['Size in listing', 'Size in official record', 'Recess / extension included?', 'Asking price ÷ true size = $psf', 'Recent nearby $psf range'] },
  },
  {
    slug: 'option-deadline-card',
    post: 'option-to-purchase-expiry-date',
    title: 'Option to Purchase Deadline Card',
    promise: 'Never lose an option fee to a date you didn’t read.',
    inside: ['What to do in the first hour after you receive an Option', 'A card for the dates that matter', 'Who should hold a copy', 'What a dispute does, and doesn’t do, to the deadline'],
    sections: [
      {
        heading: 'The day you receive the Option',
        items: [
          { t: 'Read the expiry date and time on the document yourself' },
          { t: 'Put it in your phone with reminders three days and one day before' },
          { t: 'Make copies for you, your agent and your lawyer' },
          { t: 'Ask your lawyer exactly how to exercise it: what to sign, what to pay, where it goes' },
        ],
      },
      {
        heading: 'If something goes wrong during the option period',
        items: [
          { t: 'Remember the deadline does not pause for a negotiation or a dispute' },
          { t: 'Any extension exists only if the seller agrees in writing' },
          { t: 'Decide what you will do before the deadline, not after' },
        ],
      },
    ],
    fill: { heading: 'Your dates', rows: ['Option issued on', 'Option fee paid', 'Expires on (date and time)', 'Exercise fee due', 'Lawyer’s name and number', 'Reminder set? (yes / no)'] },
  },
  {
    slug: 'ssd-date-finder',
    post: 'sellers-stamp-duty-22-days-too-early',
    title: 'SSD Date Finder: When Can You Sell Without Seller’s Stamp Duty?',
    promise: 'Find the exact day your holding period ends, and what selling earlier would cost.',
    inside: ['Today’s SSD rates for each holding period', 'How to find your purchase date as IRAS counts it', 'A worksheet comparing selling now with waiting', 'Myths to ignore'],
    sections: [
      {
        heading: 'Today’s rates (bought on or after 4 July 2025)',
        items: [
          { t: 'Held up to 1 year: 16%' },
          { t: 'More than 1 to 2 years: 12%' },
          { t: 'More than 2 to 3 years: 8%' },
          { t: 'More than 3 to 4 years: 4%' },
          { t: 'More than 4 years: no SSD', d: `Bought 11 Mar 2017 to 3 Jul 2025: three years at 12%, 8% and 4%. Source: MOF and IRAS (checked ${CHECKED}).` },
        ],
      },
      {
        heading: 'Myths to ignore',
        items: [
          { t: '“We can appeal to an MP to waive it”', d: 'Waivers are only for exceptional circumstances, and requests go to IRAS.' },
          { t: '“Occupancy years and the holding period are the same thing”', d: 'They are separate clocks with separate dates.' },
        ],
      },
    ],
    fill: { heading: 'Your worksheet', rows: ['Date of purchase (as IRAS counts it)', 'Holding period ends on', 'Expected sale price', 'SSD if you sell now (rate × price)', 'Days until SSD drops or ends', 'Price change you would need to lose to make waiting worse'] },
  },
  {
    slug: 'landlord-tenant-check',
    post: 'landlord-tenant-identity-checks',
    title: 'Landlord’s Tenant Check: Proof to See Before You Hand Over the Keys',
    promise: 'Ask for the proof behind every tick on the checklist.',
    inside: ['The three identity checks, step by step', 'What proof to ask your agent for', 'Extra checks for foreign tenants', 'The red flags in this case'],
    sections: [
      {
        heading: 'For every tenant and occupier',
        items: [
          { t: 'Original identity card or pass seen in person, and copied' },
          { t: 'Face matched to the photo, face to face' },
          { t: 'Validity verified with ICA for citizens and permanent residents, with the result kept', d: 'Foreigners need checks on their pass; see CEA’s practice guidelines.' },
          { t: 'Every occupier checked, not only the person signing' },
        ],
      },
      {
        heading: 'Before you sign the checklist',
        items: [
          { t: 'Ask to see the verification result, not just the ticked box' },
          { t: 'Keep your own copy of the signed checklist and the proof' },
          { t: 'Hand over keys only after every check is done' },
        ],
      },
      {
        heading: 'Red flags',
        items: [
          { t: 'Photos of an ID card instead of the card itself' },
          { t: 'A lost-then-found card, or any story that skips a check' },
          { t: '“I’ll verify it later”' },
        ],
      },
    ],
  },
];

export function getGift(slug: string): Gift | undefined {
  return GIFTS.find((g) => g.slug === slug);
}

export function giftForPost(postSlug: string): Gift | undefined {
  return GIFTS.find((g) => g.post === postSlug);
}

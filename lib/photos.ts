/**
 * Photography: free Adobe Stock images licensed through Adobe (standard licence, web use), the same
 * approach as the VizGrow website. Files live in public/images/ as WebP. Keep `alt` literal: describe what
 * is in the picture, not what the page is about.
 */
export type Photo = { src: string; alt: string; width: number; height: number; stockId: string };

const p = (name: string, stockId: string, width: number, height: number, alt: string): Photo => ({
  src: `/images/${name}.webp`,
  alt,
  width,
  height,
  stockId,
});

export const PHOTOS = {
  hdbPunggol: p('hdb-punggol', '438603457', 2000, 638, 'HDB blocks beside an open green field under a cloudy sky in Punggol'),
  hdbEstate: p('hdb-estate', '321800730', 1600, 1066, 'Aerial view of an HDB estate in Singapore at sunset'),
  condo: p('condo-toa-payoh', '155437376', 1600, 1068, 'Residential tower blocks in Toa Payoh at dusk'),
  bedroom: p('bedroom', '376356123', 1600, 1066, 'A bright, simply furnished bedroom'),
  factory: p('factory', '360611578', 1535, 1238, 'The empty interior of an industrial unit'),
  handshake: p('handshake', '465577031', 1600, 1043, 'Two people shaking hands across a table with papers'),
  movingBoxes: p('moving-boxes', '357620749', 1600, 1066, 'Packed cardboard boxes in a living room on moving day'),
  calculator: p('calculator', '487773075', 1600, 1066, 'A calculator, pen and magnifying glass on a printed statement'),
  floorPlan: p('floor-plan', '70899002', 1593, 1193, 'A white model of an apartment floor plan on architectural drawings'),
  calendarPages: p('calendar-pages', '278269261', 1600, 1068, 'Pages of a paper calendar'),
  clockCalendar: p('clock-calendar', '342083744', 1600, 696, 'A wall clock beside a monthly calendar'),
  houseKeys: p('house-keys', '517062054', 1600, 1066, 'A bunch of house keys on a ring'),
  coupleSigning: p('couple-signing', '322775344', 1600, 1066, 'A couple signing papers at a desk with an adviser'),
} satisfies Record<string, Photo>;

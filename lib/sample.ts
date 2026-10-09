/**
 * Sample figures for the valuation skeleton and the homepage chart.
 *
 * Source: a Property Analysis Report Kathryn generated on 9 Oct 2026 for a 4-room HDB flat in Clementi.
 * The subject address and block numbers are withheld. The street sales are HDB resale transactions
 * (Jul–Oct 2026) listed in that report; the 3-year figures are the report's summary for all 4-room
 * flats on the same street.
 */
export const SAMPLE_PROPERTY = {
  town: 'Clementi',
  flatType: '4-room',
  model: 'Model A',
  estimate: 533_000,
  psf: 604,
  sqft: 883,
  sqm: 82,
  yearCompleted: 1977,
  leaseStart: 1978,
  leaseYears: 99,
  asOfYear: 2026,
  unitsInBlock: 153,
  unitMix: '129 three-room, 22 four-room, 1 five-room',
  maxFloor: 12,
} as const;

export const leaseLeft = (year: number = SAMPLE_PROPERTY.asOfYear) =>
  SAMPLE_PROPERTY.leaseStart + SAMPLE_PROPERTY.leaseYears - year;

export type StreetSale = { month: string; leaseStart: number; price: number; sqm: number; storey: string };

/** Six recent 4-room resale transactions on the same street, Jul–Oct 2026. */
export const STREET_SALES: StreetSale[] = [
  { month: 'Oct 2026', leaseStart: 2021, price: 1_345_000, sqm: 93, storey: '31 to 33' },
  { month: 'Sep 2026', leaseStart: 2018, price: 1_220_000, sqm: 94, storey: '22 to 24' },
  { month: 'Sep 2026', leaseStart: 2006, price: 910_000, sqm: 90, storey: '07 to 09' },
  { month: 'Aug 2026', leaseStart: 1978, price: 620_000, sqm: 91, storey: '07 to 09' },
  { month: 'Aug 2026', leaseStart: 2021, price: 1_355_888, sqm: 93, storey: '37 to 39' },
  { month: 'Jul 2026', leaseStart: 1978, price: 650_000, sqm: 91, storey: '10 to 12' },
];

/** The report's 3-year summary for all 4-room flats on the street. */
export const STREET_3Y = { low: 552_888, average: 987_776, high: 1_355_888 } as const;

export const sgd = (n: number) => `$${Math.round(n).toLocaleString('en-SG')}`;
export const sgdK = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}m` : `$${Math.round(n / 1000)}k`;

/** Precise short form for individual sales, e.g. $1.345m, $620k. */
export const sgdShort = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(3).replace(/\.?0+$/, '')}m` : `$${Math.round(n / 1000)}k`;

import { SAMPLE_PROPERTY, STREET_3Y, STREET_SALES, sgdK, sgdShort } from '@/lib/sample';

/**
 * One street, one flat type: each recent sale is a dot, grouped by the year the block's lease began.
 * The dashed line is the street's 3-year average. Sales in blocks the same age as the sample flat are
 * highlighted, because those are the comparisons that matter.
 */
export function PriceStrip() {
  const W = 760;
  const left = 132;
  const right = 24;
  const top = 34;
  const rowH = 56;
  const groups = Array.from(new Set(STREET_SALES.map((s) => s.leaseStart))).sort((a, b) => b - a);
  const H = top + groups.length * rowH + 40;
  const min = 500_000;
  const max = 1_450_000;
  const x = (p: number) => left + ((p - min) / (max - min)) * (W - left - right);
  const ticks = [600_000, 800_000, 1_000_000, 1_200_000, 1_400_000];
  const avgX = x(STREET_3Y.average);
  const sameAge = SAMPLE_PROPERTY.leaseStart;

  return (
    <svg
      className="price-strip"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="strip-title strip-desc"
    >
      <title id="strip-title">Recent 4-room resale prices on one Clementi street, by block age</title>
      <desc id="strip-desc">
        {STREET_SALES.map((s) => `Lease from ${s.leaseStart}: ${sgdShort(s.price)}`).join('; ')}. Street 3-year average {sgdK(STREET_3Y.average)}.
      </desc>

      {ticks.map((t) => (
        <g key={t}>
          <line className="grid" x1={x(t)} x2={x(t)} y1={top - 8} y2={H - 34} />
          <text className="tick" x={x(t)} y={H - 14} textAnchor="middle">
            {sgdK(t)}
          </text>
        </g>
      ))}

      {groups.map((g, i) => {
        const cy = top + i * rowH + rowH / 2;
        const isMatch = g === sameAge;
        const sales = STREET_SALES.filter((s) => s.leaseStart === g);
        return (
          <g key={g}>
            {isMatch ? (
              <rect
                className="match-band"
                x={left - 8}
                y={cy - rowH / 2 + 6}
                width={W - left - right + 16}
                height={rowH - 12}
                rx={10}
              />
            ) : null}
            <text className="row-title" x={0} y={cy - 3}>
              Lease from {g}
            </text>
            <text className="row-label" x={0} y={cy + 14}>
              {SAMPLE_PROPERTY.asOfYear - g} years into lease
            </text>
            <line className="axis" x1={left} x2={W - right} y1={cy} y2={cy} />
            {sales.map((s, j) => (
              <g key={`${s.month}-${s.price}`}>
                <circle className={`dot${isMatch ? ' match' : ''}`} cx={x(s.price)} cy={cy} r={8} />
                <text
                  className="dot-label"
                  x={x(s.price)}
                  y={j % 2 === 0 ? cy - 14 : cy + 24}
                  textAnchor="middle"
                >
                  {sgdShort(s.price)}
                </text>
              </g>
            ))}
          </g>
        );
      })}

      <line className="avg-line" x1={avgX} x2={avgX} y1={top - 18} y2={H - 34} />
      <text className="avg-label" x={avgX + 6} y={top - 10}>
        Street average {sgdK(STREET_3Y.average)}
      </text>
    </svg>
  );
}

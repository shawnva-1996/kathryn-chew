import { Reveal } from './Reveal';
import { SAMPLE_PROPERTY as P, STREET_SALES, leaseLeft, sgd } from '@/lib/sample';

const sameAge = STREET_SALES.filter((s) => s.leaseStart === P.leaseStart).sort((a, b) => a.price - b.price);

/**
 * The skeleton of the sample valuation summary. Part 1 uses real (anonymised) sample figures;
 * parts 2 and 3 show what the summary will answer, without inventing numbers.
 */
export function SampleReport() {
  const left = leaseLeft();
  const used = P.leaseYears - left;
  const inTen = leaseLeft(P.asOfYear + 10);

  return (
    <article className="report" aria-label="Sample valuation summary preview">
      <div className="report-top">
        <h3>Valuation summary · {P.flatType} HDB flat, {P.town}</h3>
        <span>Sample · address withheld · figures as of Oct {P.asOfYear}</span>
      </div>

      <Reveal as="section" className="report-part" aria-labelledby="part-1">
        <div className="part-head">
          <span className="n" aria-hidden="true">
            1
          </span>
          <div>
            <h3 id="part-1">Your property at a glance</h3>
            <p>What it is, what it&rsquo;s likely worth, and the one or two facts that move its price most.</p>
          </div>
        </div>

        <div className="big-value">
          <span className="small muted">Estimated value</span>
          <span className="value num">{sgd(P.estimate)}</span>
          <p>
            That&rsquo;s about <strong>{sgd(P.psf)} for every square foot</strong> of a {P.sqft} sq ft ({P.sqm} m²) flat. It&rsquo;s a
            computer-generated estimate from recent sales, so treat it as a starting point, not a final price.
          </p>
        </div>

        <dl className="facts">
          <div>
            <dt>The closest comparisons</dt>
            <dd>
              {sameAge.map((s) => sgd(s.price)).join(' and ')}
              <span>
                Two {P.flatType} flats in blocks the same age on the same street, sold {sameAge.map((s) => s.month).join(' and ')}.
              </span>
            </dd>
          </div>
          <div>
            <dt>Building age</dt>
            <dd>
              {P.asOfYear - P.yearCompleted} years
              <span>Completed {P.yearCompleted}. Newer blocks on the same street sell for roughly double.</span>
            </dd>
          </div>
          <div>
            <dt>Lease left</dt>
            <dd>
              {left} of {P.leaseYears} years
              <span>The single biggest factor for who can buy it next, and how they can pay.</span>
            </dd>
          </div>
          <div>
            <dt>The block</dt>
            <dd>
              {P.unitsInBlock} flats, up to {P.maxFloor} storeys
              <span>Mostly three-room flats ({P.unitMix}), so few direct comparisons inside the block itself.</span>
            </dd>
          </div>
        </dl>

        <div className="lease-bar" aria-hidden="true">
          <div className="lease-track">
            <div className="lease-used" style={{ width: `${(used / P.leaseYears) * 100}%` }} />
            <div className="lease-left" style={{ left: `${(used / P.leaseYears) * 100}%`, right: 0 }} />
          </div>
          <div className="lease-ticks">
            <span>{P.leaseStart}: lease starts</span>
            <span>
              Today: {left} years left · in 10 years: {inTen}
            </span>
            <span>{P.leaseStart + P.leaseYears}</span>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="report-part" aria-labelledby="part-2">
        <div className="part-head">
          <span className="n" aria-hidden="true">
            2
          </span>
          <div>
            <h3 id="part-2">Entry plan</h3>
            <p>If you&rsquo;re buying: what to offer, what it will really cost, and what to check before you sign.</p>
          </div>
        </div>
        <ul className="plan-list">
          <li>
            <strong>A fair offer range</strong>
            <p>Built from like-for-like sales (same flat type, similar block age), never the street average.</p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>Cash you need on day one</strong>
            <p>Option and exercise fees, stamp duty, and any cash above valuation, added up in one place.</p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>Will CPF and a loan work with {left} years left?</strong>
            <p>How much CPF you can use depends on whether the lease covers the youngest buyer to age 95. We check it for your ages.</p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>Checks before the Option to Purchase</strong>
            <p>Your HDB Flat Eligibility letter, the loan you qualify for, and the questions to ask the seller.</p>
            <span className="pending">In the full summary</span>
          </li>
        </ul>
      </Reveal>

      <Reveal as="section" className="report-part" aria-labelledby="part-3">
        <div className="part-head">
          <span className="n" aria-hidden="true">
            3
          </span>
          <div>
            <h3 id="part-3">Exit plan</h3>
            <p>If you&rsquo;re selling, or planning ahead: when you can sell, who will buy, and what you&rsquo;ll keep.</p>
          </div>
        </div>
        <ul className="plan-list">
          <li>
            <strong>When you can sell</strong>
            <p>Your Minimum Occupation Period end date, and any timing that affects your next purchase.</p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>Who your likely buyers are</strong>
            <p>
              With {left} years left today and {inTen} in ten years, fewer buyers can use full CPF and loans. We show how that pool
              changes over time.
            </p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>What you&rsquo;ll actually keep</strong>
            <p>Sale price, minus the loan, minus the CPF you used plus interest. The cash left, in one line.</p>
            <span className="pending">In the full summary</span>
          </li>
          <li>
            <strong>A realistic price and timeline</strong>
            <p>Where your flat sits against recent like-for-like sales, and how long similar flats took to sell.</p>
            <span className="pending">In the full summary</span>
          </li>
        </ul>
      </Reveal>
    </article>
  );
}

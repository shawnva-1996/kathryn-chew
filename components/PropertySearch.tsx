import { Search } from 'lucide-react';

/**
 * The Airbnb-style pill on the home page. It is a plain GET form: it opens the valuation page with the
 * visitor's answers in the address, and the request form there picks them up (components/SampleRequestForm.tsx).
 */
export function PropertySearch() {
  return (
    <form action="/valuation" method="get" className="search-pill" role="search" aria-label="Check a property">
      <label className="seg seg-wide">
        <span className="seg-label">Property</span>
        <input name="property" type="text" placeholder="Block and street, or condo name" maxLength={120} autoComplete="off" />
      </label>
      <label className="seg">
        <span className="seg-label">Flat type</span>
        <select name="type" defaultValue="">
          <option value="">Any</option>
          <option>3-room</option>
          <option>4-room</option>
          <option>5-room</option>
          <option>Executive</option>
          <option>Condo</option>
          <option>Landed</option>
        </select>
      </label>
      <label className="seg">
        <span className="seg-label">I&rsquo;m</span>
        <select name="intent" defaultValue="">
          <option value="">Just looking</option>
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
          <option value="both">Selling, then buying</option>
        </select>
      </label>
      <button type="submit" className="search-go">
        <Search aria-hidden="true" />
        <span>Check</span>
      </button>
    </form>
  );
}

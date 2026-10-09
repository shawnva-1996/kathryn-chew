/** A rising bar chart inside a roofline: property, read through data. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path d="M4 14.5 16 5l12 9.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="19" width="3.6" height="8" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="14.2" y="15.5" width="3.6" height="11.5" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="20.4" y="12" width="3.6" height="15" rx="1" fill="currentColor" />
    </svg>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow">
        <h1 className="display-m">This page isn&rsquo;t here.</h1>
        <p className="lede" style={{ margin: '18px 0 28px' }}>
          It may have moved. The valuation sample and the lessons are a good place to start.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/blog" className="btn btn-ghost">
            Read the lessons
          </Link>
        </div>
      </div>
    </section>
  );
}

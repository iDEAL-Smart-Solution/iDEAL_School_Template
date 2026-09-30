const LandingPageLoader = () => (
  <main className="page-loader" role="status" aria-live="polite" aria-label="Loading school website">
    <span className="page-loader-ring" aria-hidden="true" />
    <p>Preparing your school website</p>
    <span className="sr-only">Loading</span>
  </main>
);

export default LandingPageLoader;

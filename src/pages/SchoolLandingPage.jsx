import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SchoolStats from '../components/SchoolStats';
import About from '../components/About';
import Features from '../components/Features';
import Programs from '../components/Programs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useSchoolData from '../hooks/useSchoolData';
import LandingPageLoader from '../components/LandingPageLoader';
import { resolveColor } from '../utils/landingPageTheme';
import { DEFAULT_LANDING_PAGE } from '../services/landingPageService';

export default function SchoolLandingPage() {
  const { data, loading } = useSchoolData();
  React.useEffect(() => {
    if (!data) return;
    document.title = data.name || 'School';
    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) { icon = document.createElement('link'); icon.rel = 'icon'; document.head.appendChild(icon); }
    icon.href = data.logo || '/logo.png';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = data.secondary_color || '#172b3a';
  }, [data]);
  if (loading) return <LandingPageLoader />;
  return <main className="school-site" style={{ '--lp-theme': resolveColor(data.theme_color, DEFAULT_LANDING_PAGE.theme_color), '--lp-secondary': resolveColor(data.secondary_color, DEFAULT_LANDING_PAGE.secondary_color), '--lp-accent': resolveColor(data.accent_color, DEFAULT_LANDING_PAGE.accent_color), '--lp-bg': resolveColor(data.background_color, DEFAULT_LANDING_PAGE.background_color), '--lp-text': resolveColor(data.text_color, DEFAULT_LANDING_PAGE.text_color) }}>
    <Navbar schoolData={data}/><Hero schoolData={data}/><SchoolStats schoolData={data}/><About schoolData={data}/><Features schoolData={data}/><Programs schoolData={data}/>
    {data.gallery?.length > 0 && <EditorialImages items={data.gallery} eyebrow="A glimpse of school life" title={<>Room to discover.<br/>Space to become.</>} />}
    {data.facilities?.length > 0 && <EditorialImages items={data.facilities} eyebrow="The school experience" title={<>Made for learning<br/>and possibility.</>} />}
    {data.testimonials?.length > 0 && <section className="quote-section"><p className="eyebrow">From our community</p>{data.testimonials.map((item) => <blockquote key={item.name}>“{item.quote}”<cite>{item.name}{item.role && ` · ${item.role}`}</cite></blockquote>)}</section>}
    <Admissions data={data}/><Contact schoolData={data}/><Footer schoolData={data}/>
  </main>;
}

function Admissions({ data }) { return <section className="admissions-band"><div><p className="eyebrow">A place to grow</p><h2>{data.cta?.title || 'An excellent beginning starts here.'}</h2><p>{data.cta?.description}</p></div><a className="button button-light" href={data.admission_url}>Begin an application <span aria-hidden="true">↗</span></a></section>; }

function EditorialImages({ items, eyebrow, title }) { return <section className="editorial-gallery section-wrap"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><div className="gallery-grid">{items.map((item, i) => <figure key={`${item.title}-${i}`}><img src={item.image} alt={item.title || ''}/>{item.title && <figcaption>{item.title}</figcaption>}</figure>)}</div></section>; }

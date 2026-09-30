import React from 'react';
import SmartImage from './SmartImage';
export default function Hero({schoolData:d}) {
 const images=d.hero_images?.length?d.hero_images:[d.hero_image].filter(Boolean); const [active,setActive]=React.useState(0);
 React.useEffect(()=>{if(images.length<2)return;const timer=setInterval(()=>setActive(i=>(i+1)%images.length),6000);return()=>clearInterval(timer)},[images.length]);
 return <section className="hero" id="top" aria-label="Welcome"><div className="hero-media">{images.map((src,i)=><SmartImage key={`${src}-${i}`} src={src} alt="" className={`hero-image ${i===active?'active':''}`} loading={i===0?'eager':'lazy'} fallback={<div className="hero-image hero-placeholder"/>}/>)}</div><div className="hero-shade"/><div className="hero-content"><p className="hero-kicker"><span/>{d.tagline}</p><h1>{d.hero_title||`Welcome to ${d.name}`}</h1><p className="hero-copy">{d.hero_description}</p><div className="hero-actions"><a className="button button-primary" href={d.admission_url}>Explore admissions <span>↗</span></a><a className="hero-link" href="#about">Discover our school <span>↓</span></a></div></div><div className="hero-caption"><span>{d.name}</span><span>Learning with purpose</span></div><div className="hero-index" aria-hidden="true">{String(active+1).padStart(2,'0')} <i/> {String(images.length).padStart(2,'0')}</div></section>
}

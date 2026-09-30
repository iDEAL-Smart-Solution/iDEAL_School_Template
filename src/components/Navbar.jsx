import React from 'react';
import SmartImage from './SmartImage';
export const computeNavStyle = (scrollY, secondaryColor) => scrollY > 40 ? { backgroundColor: secondaryColor } : { backgroundColor: 'transparent' };
export const deriveRegisterLink = (portalLink) => `${(portalLink || '/login').replace(/\/+$/, '')}/admission/apply`;
export default function Navbar({ schoolData: d }) {
 const [scrolled,setScrolled]=React.useState(false),[open,setOpen]=React.useState(false);
 React.useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
 React.useEffect(()=>{const fn=e=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 const links=[['Home','#top'],['About','#about'],['Academics','#programs'],['School life','#features'],['Contact','#contact']];
 return <header className={`site-nav ${scrolled?'is-scrolled':''} ${open?'menu-open':''}`}><div className="nav-inner"><a href="#top" className="brand-lockup" aria-label={`${d.name} home`}><SmartImage src={d.logo} alt="" className="brand-logo" fallback={<span className="brand-mark">{d.name?.slice(0,1)}</span>}/><span>{d.name}</span></a><nav className="desktop-links" aria-label="Main navigation">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><a className="nav-portal" href={d.portal_link}>Student portal <span>↗</span></a><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}><i/><i/></button></div>{open&&<nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}<span>↗</span></a>)}<a href={d.portal_link} onClick={()=>setOpen(false)}>Student portal ↗</a></nav>}</header>
}

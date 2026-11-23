import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function SplashScreen({ enabled = true, logo = '/dsign-logo-dark.png' }) {
  const [visible, setVisible] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try { return sessionStorage.getItem('dsign-splash-seen') !== 'yes'; }
    catch { return true; }
  });
  const [exit, setExit] = useState(false);
  useEffect(() => {
    if (!visible || !enabled) return;
    document.body.classList.add('splash-open');
    const beginExit = window.setTimeout(() => setExit(true), 1650);
    const finish = window.setTimeout(() => setVisible(false), 2180);
    return () => {
      window.clearTimeout(beginExit);
      window.clearTimeout(finish);
      document.body.classList.remove('splash-open');
    };
  }, [visible, enabled]);
  useEffect(() => {
    if (!visible) {
      try { sessionStorage.setItem('dsign-splash-seen','yes'); } catch { /* optional */ }
    }
  }, [visible]);
  if (!visible || !enabled) return null;
  return <div className={`brand-splash ${exit ? 'brand-splash-exit' : ''}`} aria-label="D-SIGN DESIGNERS loading screen">
    <div className="brand-splash-grid" aria-hidden="true" />
    <div className="brand-splash-aura" aria-hidden="true" />
    <div className="brand-splash-content">
      <span className="brand-splash-serial">CREATIVE STUDIO / SRI LANKA <span>EST. FOR THE NEXT</span></span>
      <div className="brand-splash-logo"><img src={logo} alt="D-SIGN DESIGNERS" width="1330" height="542" /></div>
      <div className="brand-splash-tagline">CRAFTING WHAT'S NEXT<span>.</span></div>
      <div className="brand-splash-loading"><span>PREPARING YOUR EXPERIENCE</span><span className="brand-splash-bar"><i /></span><span>100%</span></div>
    </div>
    <button type="button" className="brand-splash-skip" onClick={() => setVisible(false)}>Skip intro <ArrowUpRight size={14}/></button>
    <span className="brand-splash-corner" aria-hidden="true">DESIGN · DEVELOPMENT · DIGITAL</span>
  </div>;
}

import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import AdminPanel from './AdminPanel.jsx';
import './styles.css';
import './v4.css';

const isAdminRoute = /^\/admin(?:\/|$)/.test(window.location.pathname);

function Root() {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem('dsign-theme') || document.documentElement.dataset.theme || 'dark'; }
    catch { return document.documentElement.dataset.theme || 'dark'; }
  });
  const setTheme = useCallback((next, remember = true) => {
    const safeTheme = next === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = safeTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', safeTheme === 'light' ? '#f6f9fc' : '#061525');
    setThemeState(safeTheme);
    if (remember) {
      try { localStorage.setItem('dsign-theme', safeTheme); } catch { /* optional */ }
    }
  }, []);

  return <React.StrictMode>
    {isAdminRoute ? <AdminPanel theme={theme} setTheme={setTheme}/> : <App theme={theme} setTheme={setTheme}/>}
    {!isAdminRoute && <Analytics />}
  </React.StrictMode>;
}

createRoot(document.getElementById('root')).render(<Root />);

import { Moon, Sun } from 'lucide-react';

export function getPreferredTheme() {
  try {
    const stored = localStorage.getItem('dsign-theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch { /* Storage may be blocked. */ }
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function ThemeToggle({ theme, onChange, compact = false }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return <button className={`theme-toggle ${compact ? 'theme-toggle-compact' : ''}`}
    type="button" aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}
    onClick={() => onChange(next)}>
    {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    {!compact && <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>}
  </button>;
}

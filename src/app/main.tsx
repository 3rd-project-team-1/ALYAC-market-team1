import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from '@/app/App';

import './index.css';

// 테마
const lastUserId = localStorage.getItem('lastUserId');
const themeKey = lastUserId ? `theme_${lastUserId}` : 'theme';
const savedTheme = localStorage.getItem(themeKey) || 'system';

if (savedTheme === 'system') {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (systemDark) document.documentElement.classList.add('dark');
} else if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

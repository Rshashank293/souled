
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Global error handling for catch-all
window.onerror = function(message, source, lineno, colno, error) {
  console.error('SoulStore Boot Error:', message, 'at', source, ':', lineno);
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

// Remove initial loading screen once React takes over
const loadingScreen = document.getElementById('loading-screen');

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  if (loadingScreen) {
    // Small delay to ensure first paint is ready
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.remove(), 500);
    }, 500);
  }
} catch (err) {
  console.error('React Root Initialization Failed:', err);
}

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/silkscreen/400.css';
import '@fontsource/silkscreen/700.css';
import '@fontsource/vt323/400.css';
import './index.css';
import BootScreen from './components/OS/BootScreen';
import LoginScreen from './components/OS/LoginScreen';
import Desktop from './components/OS/Desktop';
import SimpleView from './components/SimpleView';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from 'framer-motion';
import { APP_IDS } from './os/apps';
import { useOSStore } from './store/osStore';

export default function App() {
  const [location] = useHashLocation();
  const [booted, setBooted] = useState(false);
  const [entered, setEntered] = useState(false);

  // Resolve boot/login state from sessionStorage + deep links.
  useEffect(() => {
    if (location === '/simple') return;
    const path = location.replace(/^\/|\/$/g, '');
    const sessionBoot = sessionStorage.getItem('portfolio-booted');
    const sessionEnter = sessionStorage.getItem('portfolio-entered');

    // Deep link straight to an app: bypass boot and login.
    const deep = APP_IDS.find((id) => id === path);
    if (deep && !sessionBoot) {
      sessionStorage.setItem('portfolio-booted', 'true');
      sessionStorage.setItem('portfolio-entered', 'true');
      useOSStore.getState().openApp(deep);
      setBooted(true);
      setEntered(true);
      return;
    }

    if (sessionBoot) {
      setBooted(true);
      setEntered(!!sessionEnter);
    }
  }, [location]);

  // Persist flags whenever state changes.
  useEffect(() => {
    if (booted) sessionStorage.setItem('portfolio-booted', 'true');
    if (entered) sessionStorage.setItem('portfolio-entered', 'true');
  }, [booted, entered]);

  if (location === '/simple') return <SimpleView />;
  if (!booted) return <BootScreen setBooted={setBooted} />;
  if (!entered) return <LoginScreen setEntered={setEntered} />;
  return <Desktop location={location} />;
}

createRoot(document.getElementById('root')!).render(
  <Router hook={useHashLocation}>
    <LazyMotion features={domAnimation} strict>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </LazyMotion>
  </Router>
);

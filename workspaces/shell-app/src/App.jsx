import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { eventBus, EVENT_TYPES } from 'events-module';

const PageVite = lazy(() => import('page-vite/App'));
const BurakApp = lazy(() => import('burak/App'));

const Loading = () => <div>Loading application...</div>;

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const unsubscribe = eventBus.subscribe(EVENT_TYPES.NAVIGATION_REQUESTED, payload => {
      if (!payload.completed) {
        setCurrentPath(payload.path);
      }
      console.log(EVENT_TYPES.NAVIGATION_REQUESTED, payload);
    });

    eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
      name: 'shell-app',
      version: '1.0.0',
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('Component loaded');
  }, [EVENT_TYPES.NAVIGATION_REQUESTED]);

  return (
    <BrowserRouter>
      <div className="shell-container">
        <header>
          <h1>Micro Frontend Shell</h1>
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/page-vite">Page Vite</Link>
              </li>
              <li>
                <Link to="/burak">Page Burak</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<h2>Home Page</h2>} />
              <Route path="/page-vite/*" element={<PageVite />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/burak/*" element={<BurakApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

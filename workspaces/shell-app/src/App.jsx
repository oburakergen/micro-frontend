import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { eventBus, EVENT_TYPES } from 'events-module';

const PageVite = lazy(() => import('page-vite/App'));
const PageWebpack = lazy(() => import('page-webpack/App'));

const Loading = () => <div>Loading application...</div>;

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Subscribe to navigation events from micro-frontends
    const unsubscribe = eventBus.subscribe(EVENT_TYPES.NAVIGATION_REQUESTED, (payload) => {
      if (!payload.completed) {
        setCurrentPath(payload.path);
      }
    });

    // Emit shell app mounted event
    eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
      name: 'shell-app',
      version: '1.0.0'
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
                  <Link to="/page-webpack">Page Webpack</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<h2>Home Page</h2>} />
                <Route path="/page-vite/*" element={<PageVite />} />
                <Route path="/page-webpack/*" element={<PageWebpack />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
  );
};

export default App;

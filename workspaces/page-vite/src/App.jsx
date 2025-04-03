import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { eventBus, EVENT_TYPES } from 'events-module';

const Home = () => (
  <div>
    <h2>Page Vite</h2>
    <p>This is the Vite-powered micro-frontend.</p>
    <button onClick={() => navigateTo('/page-vite/subpage')}>Go to Subpage</button>
  </div>
);

const Subpage = () => (
  <div>
    <h2>Vite Subpage</h2>
    <p>This is a subpage within the Vite micro-frontend.</p>
    <button onClick={() => navigateTo('/page-vite')}>Back to Vite Home</button>
  </div>
);

const navigateTo = path => {
  eventBus.emit(EVENT_TYPES.NAVIGATION_REQUESTED, { path });
};

const App = () => {
  useEffect(() => {
    eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
      name: 'page-vite',
      version: '1.0.0',
    });

    return () => {
      eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_UNMOUNTED, {
        name: 'page-vite',
      });
    };
  }, []);

  return (
    <div className="page-vite-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subpage" element={<Subpage />} />
      </Routes>
    </div>
  );
};

export default App;

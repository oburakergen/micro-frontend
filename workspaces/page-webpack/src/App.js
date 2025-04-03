import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { eventBus, EVENT_TYPES } from 'event-bus';

const Home = () => (
  <div>
    <h2>Page Webpack</h2>
    <p>This is the Webpack-powered micro-frontend.</p>
    <button onClick={() => navigateTo('/page-webpack/subpage')}>
      Go to Subpage
    </button>
  </div>
);

const Subpage = () => (
  <div>
    <h2>Webpack Subpage</h2>
    <p>This is a subpage within the Webpack micro-frontend.</p>
    <button onClick={() => navigateTo('/page-webpack')}>
      Back to Webpack Home
    </button>
  </div>
);

const navigateTo = (path) => {
  eventBus.emit(EVENT_TYPES.NAVIGATION_REQUESTED, { path });
};

const App = () => {
  useEffect(() => {
    eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
      name: 'page-webpack',
      version: '1.0.0'
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="page-webpack-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subpage" element={<Subpage />} />
      </Routes>
    </div>
  );
};

export default App;
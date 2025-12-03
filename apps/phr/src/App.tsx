import React, { Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import TigaHealthWrapper from './components/TigaHealthWrapper';
import './styles/app3.css';

const Loading: React.FC = () => (
  <div className="app3-loading">
    <div className="spinner"></div>
    <p>Loading Tiga Health...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="app3-container">
      <div className="app3-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<TigaHealthWrapper />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;

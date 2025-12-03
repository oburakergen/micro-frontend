import React, { Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card } from '@micro-frontend/ui-components';
import TigaHealthWrapper from './components/TigaHealthWrapper';
import './styles/app3.css';

const Loading: React.FC = () => (
  <div className="app3-loading">
    <div className="spinner"></div>
    <p>Loading Tiga Health...</p>
  </div>
);

const Overview: React.FC = () => (
  <div className="app3-overview">
    <h3>App 3 - Health Portal</h3>
    <Card title="Integration Status">
      <p>This module integrates Tiga Health PHR from CDN.</p>
      <p>Navigate to "Health Records" to view the embedded application.</p>
    </Card>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/phr') ? '/phr' : '';

  return (
    <div className="app3-container">
      <nav className="app3-nav">
        <Link to={`${basePath}/`}>Overview</Link>
        <Link to={`${basePath}/health-records`}>Health Records</Link>
      </nav>
      <div className="app3-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/health-records/*" element={<TigaHealthWrapper />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;

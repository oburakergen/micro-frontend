import React, { Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from '@micro-frontend/ui-components';
import { useAppSelector } from '@micro-frontend/store';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

const RemoteApp1 = React.lazy(() => import('remoteApp1/App'));
const RemoteApp2 = React.lazy(() => import('remoteApp2/App'));

const Loading = () => (
  <div className="loading">Loading...</div>
);

const App: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useAppSelector((state) => state.global);

  return (
    <div className={`app-container theme-${theme}`}>
      <Header title="Micro Frontend" onNavigate={navigate} />
      <main className="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/app1/*"
              element={
                <ErrorBoundary>
                  <RemoteApp1 />
                </ErrorBoundary>
              }
            />
            <Route
              path="/app2/*"
              element={
                <ErrorBoundary>
                  <RemoteApp2 />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;

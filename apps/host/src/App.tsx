import React, {Suspense, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from '@micro-frontend/ui-components';
import {setUser, useAppDispatch, useAppSelector} from '@micro-frontend/store';
import ErrorBoundary from './components/ErrorBoundary';

const RemoteApp1 = React.lazy(() => import('remoteApp1/App'));
const Phr = React.lazy(() => import('phrRemote/App'))

const Loading = () => (
  <div className="loading">Loading...</div>
);

const App: React.FC = () => {
  const { theme } = useAppSelector((state) => state.global);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handler = (e: any) => {
            const data = e.detail;

            dispatch(setUser(data.user));
            console.log(data);

        };

        window.addEventListener("remote-login-success", handler);

        return () => window.removeEventListener("remote-login-success", handler);
    }, []);

  return (
    <div className={`app-container theme-${theme}`}>
      <Navbar />
      <main className="main-content">
        <Suspense fallback={null}>
          <Routes>
              <Route
                  path="/*"
                  element={
                      <ErrorBoundary>
                          <Phr />
                      </ErrorBoundary>
                  }
              />
              <Route
                  path="/app1/*"
                  element={
                      <ErrorBoundary>
                          <RemoteApp1 />
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

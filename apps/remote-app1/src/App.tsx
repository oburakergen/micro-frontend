import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, Button } from '@micro-frontend/ui-components';
import { useAppDispatch, useAppSelector, addNotification } from '@micro-frontend/store';
import './styles/app1.css';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.global);

  const handleSendNotification = () => {
    dispatch(addNotification({
      type: 'info',
      message: 'Hello from App 1!',
      source: 'remote-app1',
    }));
  };

  return (
    <div className="app1-dashboard">
      <h3>App 1 - Dashboard</h3>
      <Card title="User Info">
        {user ? (
          <p>Welcome, {user.email}!</p>
        ) : (
          <p>Please login from the host app</p>
        )}
      </Card>
      <Button onClick={handleSendNotification}>
        Send Notification to Other Apps
      </Button>
    </div>
  );
};

const Settings: React.FC = () => (
  <div className="app1-settings">
    <h3>App 1 - Settings</h3>
    <Card title="Configuration">
      <p>App 1 specific settings go here</p>
    </Card>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/app1') ? '/app1' : '';

  return (
    <div className="app1-container">
      <nav className="app1-nav">
        <Link to={`${basePath}/`}>Dashboard</Link>
        <Link to={`${basePath}/settings`}>Settings</Link>
      </nav>
      <div className="app1-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

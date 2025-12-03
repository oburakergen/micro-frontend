import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, Button } from '@micro-frontend/ui-components';
import { 
  useAppDispatch, 
  useAppSelector, 
  addNotification,
  removeNotification 
} from '@micro-frontend/store';
import './styles/app2.css';

const NotificationCenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.notification);

  return (
    <div className="app2-notifications">
      <h3>App 2 - Notification Center</h3>
      <Card title="Received Notifications">
        {items.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul className="notification-list">
            {items.map((item) => (
              <li key={item.id} className={`notification-item notification-${item.type}`}>
                <span>[{item.source}] {item.message}</span>
                <button onClick={() => dispatch(removeNotification(item.id))}>
                  Dismiss
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

const Reports: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSendReport = () => {
    dispatch(addNotification({
      type: 'success',
      message: 'Report generated successfully!',
      source: 'remote-app2',
    }));
  };

  return (
    <div className="app2-reports">
      <h3>App 2 - Reports</h3>
      <Card title="Generate Report">
        <p>Click to generate a report and notify other apps</p>
        <Button onClick={handleSendReport}>Generate Report</Button>
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/app2') ? '/app2' : '';

  return (
    <div className="app2-container">
      <nav className="app2-nav">
        <Link to={`${basePath}/`}>Notifications</Link>
        <Link to={`${basePath}/reports`}>Reports</Link>
      </nav>
      <div className="app2-content">
        <Routes>
          <Route path="/" element={<NotificationCenter />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import { Card, Button } from '@micro-frontend/ui-components';
import { useAppDispatch, useAppSelector, setTheme, setUser } from '@micro-frontend/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, theme } = useAppSelector((state) => state.global);

  const handleLogin = () => {
    dispatch(setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    }));
  };

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="home-page">
      <h2>Welcome to Micro Frontend</h2>
      <Card title="User Status">
        {user ? (
          <p>Logged in as: {user.name}</p>
        ) : (
          <p>Not logged in</p>
        )}
        <Button onClick={handleLogin}>
          {user ? 'Switch User' : 'Login'}
        </Button>
      </Card>
      <Card title="Theme Settings">
        <p>Current theme: {theme}</p>
        <Button variant="secondary" onClick={handleToggleTheme}>
          Toggle Theme
        </Button>
      </Card>
    </div>
  );
};

export default Home;

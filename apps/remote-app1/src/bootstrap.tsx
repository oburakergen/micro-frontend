import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@micro-frontend/store';
import App from './App';

const store = createStore();
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
      <Provider store={store}>
          <BrowserRouter basename="/app1">
              <App />
          </BrowserRouter>
      </Provider>
  );
}

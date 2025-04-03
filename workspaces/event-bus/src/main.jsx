import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createEventStore, eventBus, EVENT_TYPES } from 'event-bus';

const store = createEventStore({}, { debug: true });

eventBus.subscribe(EVENT_TYPES.NAVIGATION_REQUESTED, (payload) => {
  window.history.pushState({}, '', payload.path);
  eventBus.emit(EVENT_TYPES.NAVIGATION_REQUESTED, {
    path: payload.path,
    completed: true
  });
});

eventBus.subscribe(EVENT_TYPES.ERROR_OCCURRED, (error) => {
  console.error('Error in micro-frontend:', error);
});

window.addEventListener('load', () => {
  eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
    name: 'shell-app',
    version: '1.0.0'
  });
});

// Render the shell application
createRoot(document.getElementById('main')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Expose a global API for micro-frontends
window.shellApp = {
  navigate: (path) => {
    eventBus.emit(EVENT_TYPES.NAVIGATION_REQUESTED, { path });
  },
  // Add any other shell app functionality needed by micro-frontends
};
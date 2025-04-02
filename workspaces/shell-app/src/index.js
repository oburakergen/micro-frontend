import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setupRouteSynchronization } from './route-sync';
import { eventBus } from 'event-bus';

setupRouteSynchronization();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

window.shellApp = {
  eventBus,
  navigate: (path) => {
    window.history.pushState(null, '', path);
    eventBus.emit('ROUTE_CHANGED', { path });
  }
};
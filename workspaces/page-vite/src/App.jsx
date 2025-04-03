import React, { useEffect } from 'react';
import { eventBus, EVENT_TYPES } from 'events-module';

const navigateTo = path => {
  eventBus.emit(EVENT_TYPES.NAVIGATION_REQUESTED, { path });
};

const App = () => {
  useEffect(() => {
    eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_MOUNTED, {
      name: 'page-vite',
      version: '1.0.0',
    });

    return () => {
      eventBus.emit(EVENT_TYPES.MICRO_FRONTEND_UNMOUNTED, {
        name: 'page-vite',
      });
    };
  }, []);

  return (
    <div className="page-vite-container">
        dsffsdf
    </div>
  );
};

export default App;

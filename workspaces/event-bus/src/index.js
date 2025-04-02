import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const EVENT_TYPES = {
  USER_LOGGED_IN: 'user/loggedIn',
  USER_LOGGED_OUT: 'user/loggedOut',
  DATA_UPDATED: 'data/updated',
  NAVIGATION_REQUESTED: 'navigation/requested',
  ERROR_OCCURRED: 'error/occurred',
};

export const emitEvent = createAction('events/emit', (type, payload) => ({
  payload: {
    type,
    payload,
    timestamp: Date.now()
  }
}));

// Event slice
const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    history: [],
    listeners: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emitEvent, (state, action) => {
      state.history.push(action.payload);
    });
  }
});

export const createEventMiddleware = () => {
  const listeners = {};

  return store => next => action => {
    const result = next(action);

    if (action.type === emitEvent.type) {
      const eventType = action.payload.type;
      const eventPayload = action.payload.payload;

      if (listeners[eventType]) {
        listeners[eventType].forEach(callback => {
          try {
            callback(eventPayload, store);
          } catch (err) {
            console.error(`Error in event listener for ${eventType}:`, err);
          }
        });
      }
    }

    return result;
  };
};

// Event listener API
export const eventBus = {
  subscribe: (eventType, callback) => {
    if (!eventBus.listeners[eventType]) {
      eventBus.listeners[eventType] = [];
    }
    eventBus.listeners[eventType].push(callback);

    // Unsubscribe fonksiyonu döndür
    return () => {
      eventBus.listeners[eventType] = eventBus.listeners[eventType]
        .filter(cb => cb !== callback);
    };
  },

  listeners: {},

  middleware: createEventMiddleware()
};

// Merkezi store oluşturma fonksiyonu
export function createEventStore(additionalReducers = {}) {
  return configureStore({
    reducer: {
      events: eventsSlice.reducer,
      ...additionalReducers
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eventBus.middleware)
  });
}

export default eventBus;
// events.js - Core events module using Node.js EventEmitter
import { EventEmitter } from 'events';

export const EVENT_TYPES = {
  NAVIGATION_REQUESTED: 'NAVIGATION_REQUESTED',
  NAVIGATION_COMPLETED: 'NAVIGATION_COMPLETED',
  MICRO_FRONTEND_MOUNTED: 'MICRO_FRONTEND_MOUNTED',
  MICRO_FRONTEND_UNMOUNTED: 'MICRO_FRONTEND_UNMOUNTED',
  STATE_CHANGED: 'STATE_CHANGED',
  STATE_REQUESTED: 'STATE_REQUESTED',
  ERROR_OCCURRED: 'ERROR_OCCURRED',
  USER_AUTHENTICATED: 'USER_AUTHENTICATED',
  USER_LOGOUT: 'USER_LOGOUT',
  DATA_FETCHED: 'DATA_FETCHED',
  DATA_UPDATED: 'DATA_UPDATED'
};

// Create a singleton event emitter instance
class MicroFrontendEventBus extends EventEmitter {
  constructor() {
    super();
    // Set higher limit for event listeners to avoid memory leak warnings
    this.setMaxListeners(50);
  }

  // Wrapper around the 'on' method for better naming consistency with the old API
  subscribe(eventType, callback) {
    this.on(eventType, callback);

    // Return an unsubscribe function for cleanup
    return () => {
      this.off(eventType, callback);
    };
  }

  // Emit is already provided by EventEmitter
}

export const eventBus = new MicroFrontendEventBus();

export const createEventStore = (initialState = {}, options = {}) => {
  let state = { ...initialState };
  const { debug = false } = options;

  const getState = () => state;

  const setState = (newState) => {
    const prevState = { ...state };
    state = { ...state, ...newState };

    if (debug) {
      console.log('Previous state:', prevState);
      console.log('Next state:', state);
    }

    eventBus.emit(EVENT_TYPES.STATE_CHANGED, {
      prevState,
      nextState: state
    });

    return state;
  };

  return {
    getState,
    setState
  };
};

export default {
  eventBus,
  EVENT_TYPES,
  createEventStore
};

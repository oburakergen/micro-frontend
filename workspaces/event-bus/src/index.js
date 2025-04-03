export const EVENT_TYPES = {
  NAVIGATION_REQUESTED: 'NAVIGATION_REQUESTED',
  MICRO_FRONTEND_MOUNTED: 'MICRO_FRONTEND_MOUNTED',
  ERROR_OCCURRED: 'ERROR_OCCURRED',
  STATE_CHANGED: 'STATE_CHANGED'
};

class EventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);

    return () => {
      this.subscribers[eventType] = this.subscribers[eventType].filter(
        (cb) => cb !== callback
      );
    };
  }

  emit(eventType, payload) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach((callback) => {
        try {
          callback(payload);
        } catch (err) {
          console.error(`Error in event handler for ${eventType}:`, err);
        }
      });
    }
  }
}

export const eventBus = new EventBus();

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
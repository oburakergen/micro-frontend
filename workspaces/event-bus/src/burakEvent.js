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

class MicroFrontendEventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50);
    }

    subscribe(eventType, callback) {
        this.on(eventType, callback);

        return () => {
            this.off(eventType, callback);
        };
    }
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

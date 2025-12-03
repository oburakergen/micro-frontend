import { combineReducers, createStore as createReduxStore } from 'redux';
import { globalReducer } from './slices/globalSlice';
import { notificationReducer } from './slices/notificationSlice';

const rootReducer = combineReducers({
    global: globalReducer,
    notification: notificationReducer,
});

export const createStore = () => createReduxStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
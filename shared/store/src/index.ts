export { createStore } from './store';
export type { RootState, AppDispatch, AppStore } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

export { globalReducer, setUser, setTheme, toggleSidebar, logout } from './slices/globalSlice';
export {
    notificationReducer,
    addNotification,
    removeNotification,
    clearNotifications,
} from './slices/notificationSlice';
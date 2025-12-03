export { createStore } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

export { globalSlice, setUser, setTheme, toggleSidebar, logout } from './slices/globalSlice';
export { notificationSlice, addNotification, removeNotification, clearNotifications } from './slices/notificationSlice';

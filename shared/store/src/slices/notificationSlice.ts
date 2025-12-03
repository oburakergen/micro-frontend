export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    source: string;
}

export interface NotificationState {
    items: Notification[];
}

const initialState: NotificationState = {
    items: [],
};

const ADD_NOTIFICATION = 'notification/ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'notification/REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATIONS = 'notification/CLEAR_NOTIFICATIONS';

export const addNotification = (notification: Omit<Notification, 'id'>) => ({
    type: ADD_NOTIFICATION as typeof ADD_NOTIFICATION,
    payload: { ...notification, id: Date.now().toString() },
});

export const removeNotification = (id: string) => ({
    type: REMOVE_NOTIFICATION as typeof REMOVE_NOTIFICATION,
    payload: id,
});

export const clearNotifications = () => ({
    type: CLEAR_NOTIFICATIONS as typeof CLEAR_NOTIFICATIONS,
});

type NotificationAction =
    | ReturnType<typeof addNotification>
    | ReturnType<typeof removeNotification>
    | ReturnType<typeof clearNotifications>;

export const notificationReducer = (
    state: NotificationState = initialState,
    action: NotificationAction,
): NotificationState => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
};
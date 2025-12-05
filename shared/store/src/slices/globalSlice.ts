
export interface GlobalState {
    user: any;
    isAuthenticated: boolean;
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
}

const initialState: GlobalState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  sidebarOpen: true,
};

const SET_USER = 'global/SET_USER';
const SET_THEME = 'global/SET_THEME';
const TOGGLE_SIDEBAR = 'global/TOGGLE_SIDEBAR';
const LOGOUT = 'global/LOGOUT';

export const setUser = (user: any) => ({
    type: SET_USER as typeof SET_USER,
    payload: user,
});

export const setTheme = (theme: 'light' | 'dark') => ({
    type: SET_THEME as typeof SET_THEME,
    payload: theme,
});

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR as typeof TOGGLE_SIDEBAR,
});

export const logout = () => ({
    type: LOGOUT as typeof LOGOUT,
});

type GlobalAction =
    | ReturnType<typeof setUser>
    | ReturnType<typeof setTheme>
    | ReturnType<typeof toggleSidebar>
    | ReturnType<typeof logout>;

export const globalReducer = (
    state: GlobalState = initialState,
    action: GlobalAction,
): GlobalState => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
            };
        case SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
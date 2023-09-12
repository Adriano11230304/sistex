import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case 'signIn': {
            return { ...state, signed: true };
        }
        case 'signOut': {
            return { ...state, signed: false };
        }
        case 'validateSignUp': {
            return { ...state, signed: true };
        }
        case 'invalidateSignUp': {
            return { ...state, signed: false };
        }
        case 'signOutAndInvalidateSignUp': {
            return { signed: false };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const initialState = {
    signed: false
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const value = { state, dispatch };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };
import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case 'signIn': {
            return { ...state, signed: true, user: action.user, fornecedores: null };
        }
        case 'signOut': {
            return { ...state, signed: false, user: null, fornecedores: null };
        }
        case 'atualizarFornecedores': {
            return {...state, fornecedores: action.fornecedores}
        }
        case 'loading':{
            return {...state, loading: true}
        }
        case 'loadingfalse':{
            return {...state, loading: false}
        }default: {
            throw new Error(`action.type não tratada: ${action.type}`);
        }
    }
}

const initialState = {
    signed: false,
    user: null,
    fornecedores: null,
    loading: false
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
import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case 'signIn': {
            return { ...state, signed: true, user: action.user, fornecedores: null };
        }case 'signOut': {
            return { ...state, signed: false, user: null, fornecedores: null };
        }case 'atualizarFornecedores': {
            return {...state, fornecedores: action.fornecedores}
        } case 'atualizarDespesasFixas': {
            return { ...state, despesasFixas: action.despesasFixas, valorTotalFixas: action.valorTotalFixas }
        } case 'atualizarDespesasVariaveis': {
            return { ...state, despesasVariaveis: action.despesasVariaveis, valorTotalVariaveis: action.valorTotalVariaveis, valorTotalDespesasNoPage: action.valorTotalDespesasNoPage }
        }case 'atualizarDespesas': {
            return{...state, despesas: action.despesas, valorTotal: action.valorTotal}
        } case 'atualizarReceitas': {
            return { ...state, receitas: action.receitas, valorTotalReceitas: action.valorTotalReceitas, valorTotalReceitasNoPage: action.valorTotalReceitasNoPage }
        } case 'atualizarCategorias': {
            return { ...state, categorias: action.categorias }
        }case 'loading':{
            return {...state, loading: true}
        }case 'loadingfalse':{
            return {...state, loading: false}
        } case 'atualizarClientes': {
            return { ...state, clientes: action.clientes }
        }default: {
            throw new Error(`action.type não tratada: ${action.type}`);
        }
    }
}

const initialState = {
    signed: false,
    user: null,
    fornecedores: null,
    loading: false,
    despesas: null,
    categorias: null,
    despesasFixas: null,
    despesasVariaveis: null,
    clientes: null,
    valorTotal: null,
    valorTotalVariaveis: null,
    valorTotalFixas: null,
    valorTotalReceitas: null,
    receitas: null,
    valorTotalDespesasNoPage: null,
    valorTotalReceitasNoPage: null,
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
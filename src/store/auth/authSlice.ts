import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/types';

interface LoginError {
    type: string;
    value: any;
    msg: string;
    path: string;
    location: string;
}

// Definimos el tipado para el estado del slice
export interface AuthState {
    loginError: boolean;
    errors: LoginError[];
    logged: boolean;
    user: User;
}

// Definimos el estado inicial con el tipado
const initialState: AuthState = {
    loginError: false,
    errors: [],
    logged: false,
    user: {
        name: '',
        email: '',
        role: '',
        state: false,
        google: false,
        uid: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin: ( state, { payload }: PayloadAction<User> ) => {
            state.logged = true;
            state.user = payload;
        },
        onErrorIn: ( state, { payload }: PayloadAction<LoginError[]> ) => {
            state.loginError = true;
            state.errors = payload;
        },
        onErrorOut: ( state ) => {
            state.loginError = false;
            state.errors = [];
        },
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onErrorIn, onErrorOut } = authSlice.actions;
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { onLogin, onErrorIn, onErrorOut } from '../store/auth/authSlice';
import type { RootState, AppDispatch } from '../store';
import { LoginData } from '../pages';
import { instance } from '../helpers';
import axios, { AxiosResponse } from 'axios';
import { User } from '../types/types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const { user, logged, loginError, errors } = useAppSelector( state => state.auth );

    interface LoginResponse {
        msg: string;
        user: User,
        token: string;
    }

    const login: (data: LoginData) => void = async (data) => {
          
        try {
            
            const resp: AxiosResponse<LoginResponse> = await instance.post('/auth/login', data);
            const { token, user } = resp.data;
            
            // Comprobamos si hubo un último enlace
            const lastPath: string = localStorage.getItem('lasthPath') || '/';
    
            // Funciones para iniciar sesión
            dispatch( onLogin( user ));

            // Guardamos datos en localstorage
            localStorage.setItem('usuario', JSON.stringify(user));
            localStorage.setItem('token', token );
    
            // Redireccionamos a la pantalla principal
            navigate(lastPath, { replace: true });

        } catch (error) {
            if(axios.isAxiosError( error )) {
                if( error.response ) {
                    console.log(error.response.data)
                    dispatch( onErrorIn( error.response.data.errors ))
                }
            }
        }

    }

    const loginErrorOut: () => void = () => {
    
        dispatch( onErrorOut() );
    }

    return {
        user,
        loginError,
        errors,
        logged,
        login,
        loginErrorOut
    }
}
import { useContext } from 'react';
import { peticionBase } from '../api';
import { useAuthStore } from '../hooks/useAuthStore';

export const HomePage = () => {
    
    const { user } = useAuthStore();

    return (
        <>
            <h1>Página principal</h1>
            <hr />
            <p>Hola { user.name }, bienvenido a la página principal. Desde esta aplicación podrás comprobar los datos de tu targeta de transporte.</p>
        </>
    )
}
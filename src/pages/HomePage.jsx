import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const HomePage = () => {
    
    const { user } = useContext( AuthContext );

    return (
        <>
            <h1>Página principal</h1>
            <hr />
            <p>Hola { user.name }, bienvenido a la página principal. Desde esta aplicación podrás comprobar los datos de tu targeta de transporte.</p>
        </>
    )
}
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

interface Props {
    children: JSX.Element
}

export const PublicRoute = ({ children }: Props) => {

    // Comprobamos si el usuario está autenticado
    const { logged } = useAuthStore();

    // Si lo está, devolvemos las rutas privadas; en caso contrario, redirigimos a la pagina login
    return (!logged)
        ? children
        : <Navigate to='/home' />

}
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography } from '@mui/material';

export const HomePage = () => {
    
    const { user } = useContext( AuthContext );
    console.log(user)

    return (
        <>
            <Typography variant="h1" sx={{ fontSize: { xs: "24px", sm: "32px", md: "38px" }, mb: 2 }}>Hola { user.nombre }!</Typography>
            <Typography>Bienvenido a la página principal. Desde esta aplicación podrás comprobar los datos de tu targeta de transporte.</Typography>
        </>
    )
}
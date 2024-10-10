import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Chip, Typography } from '@mui/material';

export const HomePage = () => {
    
    const { user } = useContext( AuthContext );

    return (
        <>
            <Typography variant="h1" sx={{ fontSize: { xs: "24px", sm: "32px", md: "38px" }, mb: 2 }}>Hola { user.nombre }!</Typography>
            <Typography>Bienvenido a la página principal. Desde esta aplicación podrás comprobar los datos de tu targeta de transporte de banda magnética.</Typography>
            <Chip label='Dirígete al apartado "Visualización" para leer los datos de la targeta' color="primary" variant="outlined" sx={{ mt: 2, mb: 2 }} />
        </>
    )
}
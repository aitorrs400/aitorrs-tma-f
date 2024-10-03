import { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '../../hooks/useAuthStore';

interface Props {
    drawerWidth: number
    handleDrawerToggle: () => void
}

export const AppSuperiorBar = ({ drawerWidth, handleDrawerToggle }: Props) => {

    // Declaramos los hooks necesarios
    const navigate: NavigateFunction = useNavigate();
    const { login } = useAuthStore();

    // Función para controlar el cierre de sesión
    const onLogout = () => {

        // Funciones para cerrar la sesión

        // Redireccionamos a la pantalla de Login
        navigate('/login', { replace: true });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                color='primary'
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                  }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={ handleDrawerToggle }
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        T-Manager
                    </Typography>
                    <Button variant='outlined' color="inherit" onClick={ onLogout }>Cerrar sesión</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';
import { AppSuperiorBar, SidebarMenu } from '../components';

interface Props {
    children: JSX.Element
}

export const MainLayout = ({ children }: Props) => {

    // Preparamos variables estáticas
    const drawerWidth: number = 300;

    // Preparamos estados
    const [mobileOpen, setMobileOpen] = useState(false);

    // Declaramos funciones necesarias
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppSuperiorBar
                drawerWidth= {drawerWidth }
                handleDrawerToggle={ handleDrawerToggle }
            />
            <SidebarMenu
                drawerWidth={ drawerWidth }
                mobileOpen={ mobileOpen }
                handleDrawerToggle={ handleDrawerToggle }
            />
            <Box sx={{
                width: { sm: 'calc( 100% - '+drawerWidth+'px)' },
                marginLeft: { sm: drawerWidth+'px' },
                padding: '0 25px',
                backgroundColor: '#F0F0F0'
            }}>
                <Toolbar />
                { children }
            </Box>
        </>
        
    )
}
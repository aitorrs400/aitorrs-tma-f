import { useContext, useEffect, useState } from 'react';
import { Grid, Card, Typography, Button, TextField, Modal, Box, SxProps, Theme } from '@mui/material';
import { useAuthStore } from '../hooks/useAuthStore';
import logo from '../assets/icono.png';

export interface LoginData {
    email: string,
    password: string
}

export const LoginPage = () => {
    
    const { login, loginError, errors, loginErrorOut } = useAuthStore();
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: ''});
    const [errorModal, setErrorModal] = useState<boolean>(false);

    const errorModalStyles: SxProps<Theme> = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    // Efecto que detecta si se ha notificado un error de inicio de sesión
    useEffect(() => {
        if(loginError) {
            setErrorModal( true );
        }
    },[ loginError ]);

    const handleErrorModal: () => void = () => {

        loginErrorOut();
        setErrorModal( false );

    }

    return (
        <Grid container justifyContent='center' alignItems='center' style={{ backgroundColor: '#F0F0F0' }}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                <Card sx={{ p: 4, textAlign: 'center' }}>

                    <Typography variant='h3'>T-Manager</Typography>
                    <Typography variant='h6'>de AitorRS</Typography>
                    <img src={ logo } width="35%" style={{ margin: '25px 0' }} />
                    <hr />

                    <Typography variant='h5' sx={{ mb: 4, mt: 4 }}>Inicio de sesión</Typography>

                    <TextField
                        id="email"
                        label="Correo electrónico"
                        variant="outlined"
                        type="email"
                        onChange={ (e) => setLoginData({ ...loginData, email: e.target.value }) }
                        sx={{ mb: 2, width: '80%' }}
                    />
                    <TextField
                        id="password"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        onChange={ (e) => setLoginData({ ...loginData, password: e.target.value }) }
                        sx={{ mb: 4, width: '80%' }}
                    />
                    <br/>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={ () => login(loginData) }
                        sx ={{ width: '80%' }}
                    >
                        Iniciar sesión
                    </Button>
                </Card>
                <Modal
                    open={ errorModal }
                    onClose={ handleErrorModal }
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                <Box sx={{ ...errorModalStyles, width: 500 }}>
                    <h2 id="parent-modal-title">Ha habido un error</h2>
                    {
                        errors.map( error => (
                            <p id="parent-modal-description">
                                { error.msg }
                            </p>
                        ))
                    }
                </Box>
                </Modal>
            </Grid>
        </Grid>
    )
}
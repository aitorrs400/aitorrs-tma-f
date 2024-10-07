import { useContext, useEffect, useState } from 'react';
import { Grid, Card, Typography, Button, TextField, Modal, Box, SxProps, Theme, Container, Avatar, Snackbar, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuthStore } from '../hooks/useAuthStore';
import logo from '../assets/icono.png';
import { Link, useNavigate } from 'react-router-dom';

export interface LoginData {
    email: string,
    password: string
}

export const LoginPage = () => {
    
    // Declaramos variables necesarias
    const { login, loginError, errors, loginErrorOut } = useAuthStore();
    // const { login } = useContext( AuthContext ); 
    const navigate = useNavigate();


    // Declaramos los estados
    const [datos, setDatos] = useState({ correo: '', contrasena: '' });
    const [formErrors, setFormErrors] = useState({ correo: false, contrasena: false });
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });
    // const [loginData, setLoginData] = useState<LoginData>({ email: '', password: ''});
    // const [errorModal, setErrorModal] = useState<boolean>(false);

    // const errorModalStyles: SxProps<Theme> = {
    //     position: 'absolute' as 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     borderRadius: '5px',
    //     boxShadow: 24,
    //     pt: 2,
    //     px: 4,
    //     pb: 3,
    // };

    // Efecto que detecta si se ha notificado un error de inicio de sesión
    // useEffect(() => {
    //     if(loginError) {
    //         setErrorModal( true );
    //     }
    // },[ loginError ]);

    // const handleErrorModal: () => void = () => {

    //     loginErrorOut();
    //     setErrorModal( false );

    // }

    

    

    // Función que controla el inicio de sesión del botón
    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = false;
        let errorsForm = { correo: false, contrasena: false };

        // Validamos los datos del formulario
        if( datos.correo === '') {
            errorsForm.correo = true;
            errors = true;
        }

        if( datos.contrasena === '') {
            errorsForm.contrasena = true;
            errors = true;
        }

        setFormErrors(errorsForm);

        // Validamos si ha habido algún error
        if( errors ) {

            // Mostramos el mensaje
            setSnackState({
                ...snackState,
                text: 'Errores en el formulario. Corrígelos y vuélvelo a intentar',
                severity: 'error',
                open: true
            });

        } else {

            // Comprobamos si hubo un último enlace
            const lastPath = localStorage.getItem('lastPath') || '/';
    
            // Funciones para iniciar sesión
            const isLogin = await login(datos.correo, datos.contrasena);
    
            // Si ha habido un error al hacer login, lo notificamos
            if( isLogin.error ) {

                // Mostramos el mensaje
                setSnackState({
                    ...snackState,
                    text: 'Error al iniciar sesión: '+isLogin.msg,
                    severity: 'error',
                    open: true
                });
    
            } else {

                // Configuramos la instancia de axios con el token
                axiosInstance.defaults.headers['x-token'] = isLogin.token;
    
                // Redireccionamos a la pantalla principal
                navigate(lastPath, { replace: true });
    
            }

        }

    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false });
    }


    // return (
    //     <Grid container justifyContent='center' alignItems='center' style={{ backgroundColor: '#F0F0F0' }}>
    //         <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
    //             <Card sx={{ p: 4, textAlign: 'center' }}>

    //                 <Typography variant='h3'>T-Manager</Typography>
    //                 <Typography variant='h6'>de AitorRS</Typography>
    //                 <img src={ logo } width="35%" style={{ margin: '25px 0' }} />
    //                 <hr />

    //                 <Typography variant='h5' sx={{ mb: 4, mt: 4 }}>Inicio de sesión</Typography>

    //                 <TextField
    //                     id="email"
    //                     label="Correo electrónico"
    //                     variant="outlined"
    //                     type="email"
    //                     onChange={ (e) => setLoginData({ ...loginData, email: e.target.value }) }
    //                     sx={{ mb: 2, width: '80%' }}
    //                 />
    //                 <TextField
    //                     id="password"
    //                     label="Contraseña"
    //                     variant="outlined"
    //                     type="password"
    //                     onChange={ (e) => setLoginData({ ...loginData, password: e.target.value }) }
    //                     sx={{ mb: 4, width: '80%' }}
    //                 />
    //                 <br/>
    //                 <Button
    //                     variant='contained'
    //                     color='primary'
    //                     onClick={ () => login(loginData) }
    //                     sx ={{ width: '80%' }}
    //                 >
    //                     Iniciar sesión
    //                 </Button>
    //             </Card>
    //             <Modal
    //                 open={ errorModal }
    //                 onClose={ handleErrorModal }
    //                 aria-labelledby="parent-modal-title"
    //                 aria-describedby="parent-modal-description"
    //             >
    //             <Box sx={{ ...errorModalStyles, width: 500 }}>
    //                 <h2 id="parent-modal-title">Ha habido un error</h2>
    //                 {
    //                     errors.map( error => (
    //                         <p id="parent-modal-description">
    //                             { error.msg }
    //                         </p>
    //                     ))
    //                 }
    //             </Box>
    //             </Modal>
    //         </Grid>
    //     </Grid>
    // )

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box sx={{ paddingTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Typography component="p" sx={{ mt: 2 }}>
                        T-Manager - TMA
                    </Typography>
                    <Box component="form" onSubmit={ handleSubmit } noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="correo"
                            label="Correo electrónico"
                            name="correo"
                            autoComplete="correo"
                            autoFocus
                            helperText={ formErrors.correo ? "Campo obligatorio" : "" }
                            error={ formErrors.correo }
                            onChange={ (e) => setDatos(prev => ({ ...prev, correo: e.target.value })) }
                            value={ datos.correo }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={ formErrors.contrasena ? "Campo obligatorio" : "" }
                            error={ formErrors.contrasena }
                            onChange={ (e) => setDatos(prev => ({ ...prev, contrasena: e.target.value })) }
                            value={ datos.contrasena }
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                            Iniciar sesión
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Typography>Registro no disponible por el momento</Typography>
                            </Grid>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Contraseña olvidada?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Regístrate
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    {'Aplicación web de Aitor RS. '}
                    <Link color="inherit" href="https://aitorrs.es">
                        Ir a AitorRS
                    </Link>{'. ESGA-F '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>

            {/* Mensaje de alerta */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={ snackState.open }
                onClose={ handleSnackClose }
                autoHideDuration={ 5000 }
                TransitionComponent={ snackState.Transition }
            >
                <Alert
                    onClose={ handleSnackClose }
                    severity={ snackState.severity }
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    { snackState.text }
                </Alert>
            </Snackbar>
        </>
    )

}
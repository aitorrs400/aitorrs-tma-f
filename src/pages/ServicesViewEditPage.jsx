import { Alert, Box, Button, Grid, Paper, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, mensajesBack } from "../helpers";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveAsIcon from '@mui/icons-material/SaveAs';


export const ServicesViewEditPage = ({ edit }) => {

    // Inicializamos variables
    const navigate = useNavigate();
    const { id } = useParams();

    // Iniciamos estados
    const [formErrors, setFormErrors] = useState({ nombre: false, imagen: false });
    const [service, setService] = useState({ nombre: '', imagen: '' });
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    // Efectos
    useEffect(() => {
        peticionesApi();
    },[]);

    // Funciones
    const peticionesApi = async () => {

        try {

            // Obtenemos el servicio
            const serviceApi = await axiosInstance.get('/api/servicio/'+id);
            setService( serviceApi.data.data );

        } catch ( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al obtener el servicio. Motivo: '+mensaje,
                severity: 'error',
                open: true,
                autoHide: null
            });

        }

    }

    const handleAtras = (e) => {
        navigate('/services', { replace: true });
    }

    const handleSave = async (e) => {

        let errors = false;
        let errorsForm = { nombre: false, imagen: false };

        // Validamos todos los campos primero
        if( service.nombre === '' ) {
            errorsForm.nombre = true;
            errors = true;
        }
        
        if( service.imagen === '' ) {
            errorsForm.imagen = true;
            errors = true;
        }

        // Una vez revisados, seteamos todos los resultados en el estado
        setFormErrors(errorsForm);

        try {

            // Si hay algún error, no seguimos
            if( errors ) {

                // Mostramos un mensaje
                setSnackState({
                    ...snackState,
                    text: 'Errores en el formulario. Revisa todos los campos',
                    severity: 'error',
                    open: true
                });

            } else {

                // Hacemos la petición al back
                const result = await axiosInstance.put('/api/servicio/'+id, service);
    
                // Mostramos mensaje informativo
                setSnackState({
                    ...snackState,
                    text: 'Servicio actualizado correctamente',
                    severity: 'success',
                    open: true
                });

            }

        } catch( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al actualizar el servicio. Motivo: '+mensaje,
                severity: 'error',
                open: true
            });

        }

    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false });
    }


    return (
        <>
            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={8} lg={8}>
                            <Grid container spacing={3}>

                                {/* Datos del servicio */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                            Datos del servicio
                                        </Typography>
                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextField
                                                    required
                                                    disabled={ !edit }
                                                    error={ formErrors.nombre }
                                                    helperText={ formErrors.nombre ? "Campo obligatorio" : "" }
                                                    id="nombre"
                                                    label="Nombre"
                                                    variant="filled"
                                                    value={ service.nombre }
                                                    onChange={ (e) => setService(prev => ({ ...prev, nombre: e.target.value })) }
                                                    sx={{ width: '100%' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextField
                                                    required
                                                    disabled={ !edit }
                                                    error={ formErrors.imagen }
                                                    helperText={ formErrors.imagen ? "Campo obligatorio" : "" }
                                                    id="imagen"
                                                    label="Imagen (en base64)"
                                                    variant="filled"
                                                    multiline
                                                    rows={12}
                                                    value={ service.imagen }
                                                    onChange={ (e) => setService(prev => ({ ...prev, imagen: e.target.value })) }
                                                    sx={{ width: '100%' }}
                                                />
                                            </Grid> 
                                        </Grid>
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                                            <Button variant="contained" onClick={ handleAtras } startIcon={ <ArrowBackIosIcon /> }>
                                                Atrás
                                            </Button>
                                            {
                                                edit && (
                                                    <Button color="warning" variant="contained" onClick={ handleSave } endIcon={ <SaveAsIcon /> }>
                                                        Guardar
                                                    </Button>
                                                )
                                            }
                                        </Box>
                                    </Paper>
                                </Grid>

                            </Grid>
                        </Grid>

                        {/* Imagen del servicio */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Imagen del servicio
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <img src={ service.imagen } />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>

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

            </Grid>
        </>
    )
}
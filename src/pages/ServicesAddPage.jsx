import { Alert, Box, Button, Grid, Paper, Snackbar, TextField, Typography, Slide } from "@mui/material";
import { mensajesBack } from "../helpers/mensajesBack";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../helpers";

export const ServicesAddPage = () => {

    // Inicializamos variables
    const navigate = useNavigate();

    // Declaración de estados
    const [service, setService] = useState({ nombre: '', imagen: '' });
    const [formErrors, setFormErrors] = useState({ nombre: false, imagen: false });
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    // Declaración de funciones
    const handleCrear = async (e) => {

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
                const result = await axiosInstance.post('/api/servicio', service);
    
                // Mostramos mensaje informativo
                setSnackState({
                    ...snackState,
                    text: 'Servicio creado correctamente',
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
                text: 'Error al crear el servicio. Motivo: '+mensaje,
                severity: 'error',
                open: true
            });

        }

    }

    const handleAtras = (e) => {
        navigate('/services', { replace: true });
    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false });
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Añadir nuevo servicio
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                error={ formErrors.imagen }
                                helperText={ formErrors.imagen ? "Campo obligatorio" : "" }
                                id="imagen"
                                label="Imagen (en base64)"
                                variant="filled"
                                multiline
                                rows={ 12 }
                                value={ service.imagen }
                                onChange={ (e) => setService(prev => ({ ...prev, imagen: e.target.value })) }
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: '8px', sm: '0' }, justifyContent: 'space-between' }}>
                        <Button variant="contained" onClick={ handleAtras } startIcon={ <ArrowBackIosIcon /> }>
                            Atrás
                        </Button>
                        <Button variant="contained" color="success" onClick={ handleCrear } endIcon={ <AddIcon /> }>
                            Crear
                        </Button>
                    </Box>
                </Paper>
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
    )
}
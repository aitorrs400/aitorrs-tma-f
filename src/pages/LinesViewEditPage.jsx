import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, mensajesBack } from "../helpers";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveAsIcon from '@mui/icons-material/SaveAs';


export const LinesViewEditPage = ({ edit }) => {

    // Inicializamos variables
    const navigate = useNavigate();
    const { id } = useParams();

    // Iniciamos estados
    const [formErrors, setFormErrors] = useState({ nombre: false, label: false, colorFondo: false, colorTexto: false, servicio: false });
    const [line, setLine] = useState({ nombre: '', label: '', colorFondo: '', colorTexto: '', servicio: '' });
    const [service, setService] = useState(null);
    const [servicesList, setServicesList] = useState([]);
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    // Efectos
    useEffect(() => {
        peticionesApi();
    },[]);

    useEffect(() => {
        changeService(line.servicio);
    }, [servicesList]);

    // Funciones
    const peticionesApi = async () => {

        try {

            // Obtenemos la linea
            const lineApi = await axiosInstance.get('/api/linea/'+id);
            setLine( lineApi.data.data );

            // Obtenemos listado de servicios
            const serviceApi = await axiosInstance.get('/api/servicio');
            setServicesList( serviceApi.data.servicios );

        } catch ( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al obtener datos de la API. Motivo: '+mensaje,
                severity: 'error',
                open: true,
                autoHide: null
            });

        }

    }

    const changeService = (id) => {

        const serviceFiltrado = servicesList.filter(s => s.id === id);

        if( serviceFiltrado ) {
            if( serviceFiltrado.length > 0 ) {
                setService(serviceFiltrado[0]);
            }
        }

    }

    const handleAtras = (e) => {
        navigate('/lines', { replace: true });
    }

    const handleSave = async (e) => {

        let errors = false;
        let errorsForm = { nombre: false, label: false, colorFondo: false, colorTexto: false, servicio: false };

        // Validamos todos los campos primero
        if( line.nombre === '' ) {
            errorsForm.nombre = true;
            errors = true;
        }

        if( line.label === '' ) {
            errorsForm.label = true;
            errors = true;
        }

        if( line.colorFondo === '' ) {
            errorsForm.colorFondo = true;
            errors = true;
        }

        if( line.colorTexto === '' ) {
            errorsForm.colorTexto = true;
            errors = true;
        }

        if( line.servicio === '' ) {
            errorsForm.servicio = true;
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
                const result = await axiosInstance.put('/api/linea/'+id, line);
    
                // Mostramos mensaje informativo
                setSnackState({
                    ...snackState,
                    text: 'Línea actualizada correctamente',
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
        <Grid container spacing={3}>

            {/* Datos del servicio */}
            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Datos de la línea
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.nombre }
                                helperText={ formErrors.nombre ? "Campo obligatorio" : "" }
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                value={ line.nombre }
                                onChange={ (e) => setLine(prev => ({ ...prev, nombre: e.target.value })) }
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required disabled={ !edit } variant="filled" sx={{ width: '100%', minWidth: 120 }} error={ formErrors.servicio }>
                                <InputLabel id="servicio-label">Servicio</InputLabel>
                                <Select
                                    id="servicio"
                                    value={ line.servicio }
                                    onChange={ (e) => {
                                        setLine(prev => ({ ...prev, servicio: e.target.value }));
                                        changeService(e.target.value);
                                    } }
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                        servicesList.length > 0  &&
                                            servicesList.map( service => (
                                                <MenuItem key={ service.id } value={ service.id }>{ service.nombre }</MenuItem>
                                            ))
                                    }
                                </Select>
                                { formErrors.servicio && (<FormHelperText>Campo obligatorio</FormHelperText>) }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.label }
                                helperText={ formErrors.label ? "Campo obligatorio" : "" }
                                id="label"
                                label="Etiqueta"
                                variant="filled"
                                value={ line.label }
                                onChange={ (e) => setLine(prev => ({ ...prev, label: e.target.value })) }
                                inputProps={{ maxLength: 3 }}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.colorFondo }
                                helperText={ formErrors.colorFondo ? "Campo obligatorio" : "" }
                                id="colorFondo"
                                label="Color de fondo"
                                placeholder="#RRGGBB"
                                variant="filled"
                                value={ line.colorFondo }
                                onChange={ (e) => setLine(prev => ({ ...prev, colorFondo: e.target.value })) }
                                inputProps={{ maxLength: 7 }}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.colorTexto }
                                helperText={ formErrors.colorTexto ? "Campo obligatorio" : "" }
                                id="colorTexto"
                                label="Color de texto"
                                placeholder="#RRGGBB"
                                variant="filled"
                                value={ line.colorTexto }
                                onChange={ (e) => setLine(prev => ({ ...prev, colorTexto: e.target.value })) }
                                inputProps={{ maxLength: 7 }}
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

            {/* Icono de la línea */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Vista previa del icono
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{
                                marginTop: '8px',
                                padding: 0,
                                width: '100px',
                                height: '100px',
                                backgroundColor: line.colorFondo
                            }}>
                                <p style={{
                                    margin: 0,
                                    padding: 0,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 28,
                                    lineHeight: '100px',
                                    color: line.colorTexto
                                }}>{ line.label }</p>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {/* Imagen del servicio */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Imagen del servicio
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {
                                service ? (<img style={{ marginTop: '8px' }} src={ service.imagen } />) : (<Typography>Sin imagen de servicio</Typography>)
                            }
                        </Grid>
                    </Grid>
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
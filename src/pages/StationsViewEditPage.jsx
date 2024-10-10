import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, mensajesBack } from "../helpers";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveAsIcon from '@mui/icons-material/SaveAs';


export const StationsViewEditPage = ({ edit }) => {

    // Inicializamos variables
    const navigate = useNavigate();
    const { id } = useParams();

    // Iniciamos estados
    const [formErrors, setFormErrors] = useState({ codigo: false, nombre: false, linea: false });
    const [station, setStation] = useState({ codigo: '', nombre: '', linea: '' });
    const [line, setLine] = useState(null);
    const [service, setService] = useState(null);
    const [linesList, setLinesList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    // Efectos
    useEffect(() => {
        peticionesApi();
    },[]);

    useEffect(() => {
        changeLine(station.linea);
    }, [linesList]);

    useEffect(() => {
        if(line) {
            changeService(line.servicio)
        }
    }, [line]);

    // Funciones
    const peticionesApi = async () => {

        try {

            // Obtenemos la parada
            const stationData = await axiosInstance.get('/api/parada/'+id);
            setStation( stationData.data.data );

            // Obtenemos listado de lineas
            const lineData = await axiosInstance.get('/api/linea');
            setLinesList( lineData.data.lineas );

            // Obtenemos listado de servicios
            const serviceData = await axiosInstance.get('/api/servicio');
            setServicesList( serviceData.data.servicios );

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

    const changeLine = (id) => {

        const lineFiltrado = linesList.filter( l => l.id === id );

        if( lineFiltrado ) {
            if( lineFiltrado.length > 0 ) {

                setLine( lineFiltrado[0] );

            }
        }

    }

    const changeService = (id) => {

        const serviceFiltrado = servicesList.filter( s => s.id === id );
        
        if( serviceFiltrado ) {
            if( serviceFiltrado.length > 0 ) {

                setService(serviceFiltrado[0]);

            }
        }

    }

    const handleAtras = (e) => {
        navigate('/stations', { replace: true });
    }

    const handleSave = async (e) => {

        let errors = false;
        let errorsForm = { codigo: false, nombre: false, linea: false };

        // Validamos todos los campos primero
        if( station.codigo === '' ) {
            errorsForm.codigo = true;
            errors = true;
        }

        if( station.nombre === '' ) {
            errorsForm.nombre = true;
            errors = true;
        }

        if( station.linea === '' ) {
            errorsForm.linea = true;
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
                const result = await axiosInstance.put('/api/parada/'+id, station);
    
                // Mostramos mensaje informativo
                setSnackState({
                    ...snackState,
                    text: 'Parada actualizada correctamente',
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
                text: 'Error al actualizar la parada. Motivo: '+mensaje,
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

            {/* Datos de la parada */}
            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Datos de la parada
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.codigo }
                                helperText={ formErrors.codigo ? "Campo obligatorio" : "" }
                                id="codigo"
                                label="Código"
                                variant="filled"
                                value={ station.codigo }
                                onChange={ (e) => setStation(prev => ({ ...prev, codigo: e.target.value })) }
                                inputProps={{ maxLength: 5 }}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                disabled={ !edit }
                                error={ formErrors.nombre }
                                helperText={ formErrors.nombre ? "Campo obligatorio" : "" }
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                value={ station.nombre }
                                onChange={ (e) => setStation(prev => ({ ...prev, nombre: e.target.value })) }
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl required disabled={ !edit } variant="filled" sx={{ width: '100%', minWidth: 120 }} error={ formErrors.linea }>
                                <InputLabel id="servicio-label">Línea</InputLabel>
                                <Select
                                    id="linea"
                                    value={ station.linea }
                                    onChange={ (e) => {
                                        setStation(prev => ({ ...prev, linea: e.target.value }));
                                        changeLine(e.target.value);
                                    } }
                                >
                                    <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                    {
                                        linesList.map( line => (
                                            <MenuItem key={ line.id } value={ line.id }>{ line.nombre }</MenuItem>
                                        ))
                                    }
                                </Select>
                                { formErrors.linea && (<FormHelperText>Campo obligatorio</FormHelperText>) }
                            </FormControl>
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
                            {
                                line ? (
                                    <div style={{
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                        padding: 0,
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: line.colorFondo
                                    }}>
                                        <p style={{
                                            margin: 0,
                                            padding: 0,
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            lineHeight: '70px',
                                            color: line.colorTexto
                                        }}>{ line.label }</p>
                                    </div>
                                ) : (
                                    <Typography>Sin icono de línea</Typography>
                                )
                            }
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
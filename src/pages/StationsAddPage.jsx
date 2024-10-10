import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { axiosInstance, mensajesBack } from "../helpers";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';

export const StationsAddPage = () => {

    // Inicializamos variables
    const navigate = useNavigate();

    // Declaración de estados
    const [station, setStation] = useState({ codigo: '', nombre: '', linea: '' });
    const [line, setLine] = useState(null);
    const [linesList, setLinesList] = useState([]);
    const [formErrors, setFormErrors] = useState({ codigo: false, nombre: false, linea: false });
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    // Efectos
    useEffect(() => {
        peticionesApi();
    },[]);

    const peticionesApi = async () => {

        try {

            // Obtenemos el listado de líneas
            const listaLineas = await axiosInstance.get('/api/linea');
            setLinesList(listaLineas.data.lineas);

        } catch ( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al obtener datos de la API. Motivo: '+mensaje,
                severity: 'error',
                open: true
            });

        }

    }

    const changeLine = (id) => {

        const lineFiltrado = linesList.filter(s => s.id === id);

        if( lineFiltrado ) {
            if( lineFiltrado.length > 0 ) {
                setLine(lineFiltrado[0]);
            }
        }

    }

    // Declaración de funciones
    const handleCrear = async (e) => {

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
                const result = await axiosInstance.post('/api/parada', station);
    
                // Mostramos mensaje informativo
                setSnackState({
                    ...snackState,
                    text: 'Parada creada correctamente',
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
        navigate('/stations', { replace: true });
    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false });
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Añadir nueva parada
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
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
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="filled" sx={{ width: '100%', minWidth: 120 }} error={ formErrors.linea }>
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

            {/* Icono de la línea */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Vista previa del icono de la línea
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
                                    <Typography>Sin icono de la línea</Typography>
                                )
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
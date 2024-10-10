import { Alert, Chip, Grid, Paper, Slide, Snackbar, Typography } from '@mui/material';
import { axiosInstance, getServiceIconByCode, mensajesBack } from '../../helpers';
import { generateLineIcon } from '../../helpers/cardFunctions';
import { useEffect, useState } from 'react';


export const StationDataComponent = ({ cardData }) => {

    // Declaramos variables necesarias
    const { stationCode } = cardData;

    // Declaramos los efectos
    const [station, setStation] = useState(null);
    const [line, setLine] = useState(null);
    const [service, setService] = useState(null);
    const [linesList, setLinesList] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info' });

    useEffect(() => {
        peticionesApi();
    },[])

    useEffect(() => {

        let newStationCode = stationCode;

        if( stationCode != '' ) {
            if( stationCode.length == 3 ) {
                newStationCode = '0'+stationCode;
            }
            getStationData(newStationCode);
        }
    },[stationCode]);

    // Efecto para actualizar la línea
    useEffect(() => {
        if(station) {

            const lineFiltrado = linesList.filter( l => l.id === station.linea );
    
            if( lineFiltrado ) {
                if( lineFiltrado.length > 0 ) {
    
                    setLine( lineFiltrado[0] );
    
                }
            }

        }
    },[station, linesList]);

    // Efecto para actualizar el servicio
    useEffect(() => {

        const serviceFiltrado = servicesList.filter( s => s.id === line.servicio );
        
        if( serviceFiltrado ) {
            if( serviceFiltrado.length > 0 ) {

                setService(serviceFiltrado[0]);

            }
        }

    },[line]);

    const peticionesApi = async () => {

        try {

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

    const getStationData = async (id) => {

        try {

            // Obtenemos la parada por código
            const stationData = await axiosInstance.get('/api/parada/codigo/'+id);
            setStation( stationData.data.data );

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

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false });
    }

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                
                {/* Cabecera del componente */}
                <Grid container justifyContent='space-between'>
                    <Grid item>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Datos de la estación
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Chip label={ (station === null) ? 'Sin datos' : `Código: ${ station.codigo }` } color='primary' variant='outlined' />
                    </Grid>
                </Grid>

                {/* Mostramos datos si existe un código de estación */}
                {
                    (station === null)
                        ? ( <Typography>Sin datos</Typography> )
                        : (
                            <>
                                <Grid container spacing={2}>

                                    {/* Nombre de la estación */}
                                    {
                                        station && (
                                            <Grid item xs={12} sx={{ mb: 3 }}>
                                                <Typography variant='h5'>Estación</Typography>
                                                <Typography>{ station.nombre }</Typography>
                                            </Grid>
                                        )
                                    }

                                    {/* Datos del servicio y linea */}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>

                                            {/* Icono de la línea */}
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                                {
                                                    line 
                                                        ? generateLineIcon( line.label, line.colorFondo, line.colorTexto )
                                                        : generateLineIcon( '', '', '' )
                                                }
                                                <div>
                                                    <Typography variant='h5'>Linea</Typography>
                                                    <Typography>{ line ? line.nombre : 'Sin datos' }</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                                {
                                                    service
                                                        ? <img
                                                            style={{
                                                                marginRight: '16px',
                                                                width: '70px',
                                                                height: '70px'
                                                            }}
                                                            src={ service.imagen }
                                                        />
                                                        : <img
                                                            style={{
                                                                marginRight: '16px',
                                                                width: '70px',
                                                                height: '70px'
                                                            }}
                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAABgFBMVEUAAAD///+qqqqAgICZmZmqqqqSkpKZmZmVlZWkpKSlpaWhoaGZmZmenp6ioqKfn5+dnZ2hoaGbm5uenp6cnJyfn5+bm5uenp6cnJyfn5+dnZ2enp6goKCfn5+bm5ufn5+enp6fn5+dnZ2cnJyfn5+enp6dnZ2fn5+cnJyfn5+dnZ2fn5+fn5+dnZ2enp6dnZ2enp6dnZ2enp6enp6fn5+fn5+dnZ2dnZ2enp6fn5+dnZ2enp6fn5+dnZ2enp6dnZ2fn5+enp6fn5+enp6enp6enp6fn5+enp6enp6dnZ2enp6dnZ2enp6enp6fn5+enp6enp6enp6dnZ2enp6enp6enp6enp6enp6enp6dnZ2enp6enp6enp6fn5+enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6fn5+enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6/dqAQAAAAf3RSTlMAAQMEBQYHCgwOERMUFRYYGhscHR8gISIkJScqKy0uMDc4OT5FR0lKS01OUFJTVFZXW1xhYmVoa2xtcHFydXt9f4GChIaIiouRkpOVmKCkqq2ur7Cys7W4u7y9vsDBwsPFx8jLzdTV29/g4eLj5Obp7O3v8PHy8/X3+fr7/P3+jjRJmAAAAAFiS0dEAf8CLd4AAAGmSURBVBgZ7cHpV4xxGAbgO9OIGkU0GsVkCZGYkSWlsmStJDQIlRYtaNDGLPe/rjO/531rnDrnnec5Dh/mulBW9jfsi7acbKqDRVVyaJEF6Te3Y9CpuZfmdqnTULi0zD8NR1CiPYPcwfxxlGTvCHf0/QRKMcRdfK1DcF3c1RgCi27Ql5l+OTK5yi1nEdQoPcs3q7Gpsm2anncIKE7P+whE6AlFPopgBimmqrAlRXEdwdxaYsHKYWxzNENnGAGF2t/mSfajyAc6HxFc09PVjVoUuU/nM0qx/wyK9dL5ApMHdD7BZIJOChbNOToDMKgYozgFg16KuQrodeYpLkDvWpbiOfR68hQL1VDro2ctDrV+en6eg1ofPb8uQi1BT6YDakfWKLIJ6L2iyF6BXpyeHhg8pHgNiyk6uWZY/KAzAYtaigFYNFDcgMUxiiQsYhSXYXHgmWhB2X8u3Nrd3RqGUdsSNy2eh0kyx4JcAgaH1inWD0LvLn13oDdO3zj0Zuibgd4L+kah10nfVeiF5yhmK2EQW2DBfCNMIo+/kelHNbAK1deHUPbP/QbYmSq7dQMBqAAAAABJRU5ErkJggg=="
                                                        />
                                                }
                                                <div>
                                                    <Typography variant='h5'>Servicio</Typography>
                                                    <Typography>{ service ? service.nombre : 'Sin datos' }</Typography>
                                                </div>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>

                            </>
                        )
                }

                {/* Mostramos información adicional */}
                <Chip label='Base de datos incompleta. Más información en "Ayuda"' color="warning" variant="outlined" sx={{ mt: 3 }} />
                    
            </Paper>

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
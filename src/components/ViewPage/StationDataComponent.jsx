import { Chip, Grid, Paper, Typography } from '@mui/material';
import { getServiceIconByCode } from '../../helpers';
import { generateLineIcon } from '../../helpers/cardFunctions';


export const StationDataComponent = ({ cardData }) => {

    const { station, stationData } = cardData;
    const { code, line, lineCode, lines, name, type } = stationData;

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
                        <Chip label={ (station === '') || (station === '0') ? 'Sin datos' : `Código: ${ station }` } color='primary' variant='outlined' />
                    </Grid>
                </Grid>

                {/* Mostramos datos si existe un código de estación */}
                {
                    (station === '') || (station === '0')
                        ? ( <Typography>Sin datos</Typography> )
                        : (
                            <>
                                <Grid container spacing={2}>

                                    {/* Nombre de la estación */}
                                    {
                                        name && (
                                            <Grid item xs={12} sx={{ mb: 3 }}>
                                                <Typography variant='h5'>Estación</Typography>
                                                <Typography>{ name }</Typography>
                                            </Grid>
                                        )
                                    }

                                    {/* Datos del servicio y linea */}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>

                                            {/* Icono de la línea */}
                                            <Grid item xs={6} sx={{ display: 'flex' }}>
                                                { generateLineIcon() }
                                                <div>
                                                    <Typography variant='h5'>Linea</Typography>
                                                    <Typography>{ line }</Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                { getServiceIconByCode( type ) }
                                                <Typography variant='h5'>Servicio</Typography>
                                                <Typography>{ type }</Typography>
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
        </Grid>
    )
}
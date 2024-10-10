import { Card, CardContent, Chip, Grid, Paper, Typography } from '@mui/material';
import { getServiceIconByCode } from '../../helpers';
import { lineColors } from '../../assets/data/lineColors';
import { generateIconByLineCode } from '../../helpers/cardFunctions';


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
                                    <Grid item xs={2}>
                                        { getServiceIconByCode( type ) }
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant='h5'>Servicio</Typography>
                                        <Typography>{ type }</Typography>
                                    </Grid>

                                    <Grid item xs={2}>
                                        { generateIconByLineCode( lineCode ) }
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant='h5'>Linea</Typography>
                                        <Typography>{ line }</Typography>
                                    </Grid>

                                </Grid>

                                {/* Lineas en esta estación */}
                                {
                                    lines && ( <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>Lineas disponibles en esta Estación</Typography> )
                                }
                                {
                                    lines != undefined
                                        ? lines.length === 0
                                            ? ( <Typography>Sin datos</Typography>)
                                            : (
                                                <Grid container spacing={1}>
                                                    {
                                                        lines.map( (l, i) => {
                                                            return (
                                                                <Grid item key={i} xs={2}>
                                                                    { generateIconByLineCode( l ) }
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                            )
                                        : ''
                                }
                            </>
                        )
                }

                {/* Mostramos información adicional */}
                <Chip label='BD incompleta. Más info. en "Datos"' color="warning" variant="outlined" sx={{ mt: 3 }} />
                    
            </Paper>
        </Grid>
    )
}
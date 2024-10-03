import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { CardData, LineColorData } from '../../types/types';
import { getServiceIconByCode } from '../../helpers';
import { lineColors } from '../../assets/data/lineColors';
import { generateIconByLineCode } from '../../helpers/cardFunctions';

interface Props {
    cardData: CardData
}

export const StationDataComponent = ({ cardData }: Props ) => {

    const { station, stationData } = cardData;
    const { code, line, lineCode, lines, name, type } = stationData;

    return (
        <Grid item xs={12}>
            <Grid container justifyContent='space-between'>

                {/* Cabecera del componente */}
                <Grid item>
                    <Typography variant='h5' sx={{ mb: 2 }}>Datos de la estación</Typography>
                </Grid>
                <Grid item>
                    <Chip label={ (station === '') || (station === '0') ? 'Sin datos' : `Código: ${ station }` } color='primary' variant='outlined' />
                </Grid>

            </Grid>
            <Card>
                <CardContent>

                    {/* Mostramos datos si existe un código de estación */}
                    {
                        (station === '') || (station === '0')
                            ? ( <Typography variant='h5'>Sin datos</Typography> )
                            : (
                                <>
                                    <Grid container spacing={2}>

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

                                    {/* Nombre de la estación */}
                                    { name && (
                                        <>
                                            <Typography variant='h5' sx={{ mt: 2 }}>Estación</Typography>
                                            <Typography>{ name }</Typography>
                                        </>
                                    )}

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
                    
                </CardContent>
            </Card>
        </Grid>
    )
}
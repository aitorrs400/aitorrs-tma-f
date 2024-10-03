import { Card, CardContent, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import { CardData } from '../../types/types';

interface Props {
    cardData: CardData
}

export const ExpirationComponent = ({ cardData }: Props ) => {

    // Obtenemos los datos necesarios. Esto hará que el código se vea mas limpio
    const { type, trips, expiration } = cardData;
    const { showRemainTime, showRemainTrips } = type;
    const { remainTrips, remainTripsPercentage, usedTrips } = trips;
    const { day, month, remainDays, remainDaysPercent, year } = expiration;

    return (
        <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>Caducidad</Typography>
            <Card>
                <CardContent>

                    {/* No mostramos nada si no está habilitada la opción en la BD */}
                    {
                        !showRemainTime && !showRemainTrips && (
                            <Typography variant='h5'>Sin datos</Typography>
                        )
                    }

                    {/* Lo mostramos si está habilitado en la BD para ver por VIAJES */}
                    {
                        showRemainTrips && (
                        <>
                            <LinearProgress variant="determinate" value={ remainTripsPercentage } sx={{ mt: 1, mb: 2 }} />
                            <Typography variant='h5'>
                                {
                                    remainTrips === 1
                                        ? '1 Viaje restante'
                                        : `${ remainTrips } Viajes restantes`
                                }
                            </Typography>
                            <Typography>{ usedTrips === 1 ? '1 viaje utilizado' : ` ${ usedTrips } viajes utilizados` }</Typography>
                        </>
                        )
                    }

                    {/* Lo mostramos si está habilitado en la BD para ver por FECHA */}
                    {
                        showRemainTime && (
                            <>
                                <LinearProgress variant="determinate" value={remainDaysPercent} sx={{ mt: 3, mb: 2 }} />
                                <Typography variant='h5'>Caduca el dia</Typography>
                                {
                                    day === 0 ? (
                                        <Typography>El billete es nuevo. No existen datos en la codificación</Typography>
                                    ) : (
                                        <Typography>{ day } de { month } de { year }</Typography>
                                    )
                                }
                                {
                                    day !== 0 && (
                                        remainDays <= 0 ? (
                                            <>
                                                <Typography>0 días restantes</Typography>
                                                <Chip label={ remainDays * -1 === 1 ? 'Esta tarjeta caducó hace 1 día' : `Esta tarjeta caducó hace ${ remainDays * -1 } días` } color="error" sx={{ mt: 2 }} />
                                            </>
                                        ) : (
                                            <Typography>{ remainDays } días restantes</Typography>
                                        )
                                    )
                                }
                            </>
                        )
                    }

                </CardContent>
            </Card>
        </Grid>
    )
}
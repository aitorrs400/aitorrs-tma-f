import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { CardData } from '../../types/types';

interface Props {
    cardData: CardData
}

export const TickDataComponent = ({ cardData }: Props ) => {

    const { day, hour, lastHour, lastMinute, lastTickDays, minute, month, year } = cardData.tick;

    return (
        <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>Datos de marcaje</Typography>
            <Card>
                <CardContent>
                    {
                        cardData.type.name === ''
                            ? ( <Typography variant='h5'>Sin datos</Typography> )
                            : (
                                <>
                                    <Typography variant='h5'>{ day === 0 ? 'Sin datos' : 'Tarjeta marcada el'}</Typography>
                                    <Typography>
                                        {
                                            day === 0
                                                ? 'El billete es nuevo. No existen datos en la codificación'
                                                : `${ day } de ${ month } de ${ year }`
                                        }
                                    </Typography>
                                    {
                                        day != 0 && (
                                            <>
                                                <Typography>
                                                    { hour < 10 ? '0'+hour.toString() : hour.toString() }
                                                    :
                                                    { minute < 10 ? '0'+minute.toString() : minute.toString() }
                                                </Typography>
                                                <Chip label={ lastTickDays * -1 === 1 ? 'Marcada hace 1 día' : `Marcada hace ${ lastTickDays * -1 } días` } color='primary' sx={{ mt: 2 }} />
                                                <Typography variant='h5' sx={{ mt: 2 }}>Último transbordo</Typography>
                                                <Typography>
                                                    { lastHour < 10 ? '0'+lastHour.toString() : lastHour.toString() }
                                                    :
                                                    { lastMinute < 10 ? '0'+lastMinute.toString() : lastMinute.toString() }
                                                </Typography>
                                            </>
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
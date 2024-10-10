import { Card, CardContent, Chip, Grid, Paper, Typography } from '@mui/material';


export const TickDataComponent = ({ cardData }) => {

    const { day, hour, lastHour, lastMinute, lastTickDays, minute, month, year } = cardData.tick;

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Datos de marcaje
                </Typography>
                {
                    cardData.type.name === ''
                        ? ( <Typography>Sin datos</Typography> )
                        : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant='h5'>Fecha y hora</Typography>
                                        <Typography>
                                            {
                                                day === 0
                                                    ? 'El billete es nuevo. No existen datos en la codificación'
                                                    : `${ day } de ${ month } de ${ year }`
                                            }
                                        </Typography>
                                        <Typography>
                                            { hour < 10 ? '0'+hour.toString() : hour.toString() }
                                            :
                                            { minute < 10 ? '0'+minute.toString() : minute.toString() }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {
                                            day != 0 && (
                                                <> 
                                                    <Typography variant='h5'>Último transbordo</Typography>
                                                    <Typography>
                                                        { lastHour < 10 ? '0'+lastHour.toString() : lastHour.toString() }
                                                        :
                                                        { lastMinute < 10 ? '0'+lastMinute.toString() : lastMinute.toString() }
                                                    </Typography>
                                                    <Chip label={ lastTickDays * -1 === 1 ? 'Marcada hace 1 día' : `Marcada hace ${ lastTickDays * -1 } días` } color='primary' sx={{ mt: 2 }} />
                                                </>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </>
                        )
                }
            </Paper>
        </Grid>
    )
}
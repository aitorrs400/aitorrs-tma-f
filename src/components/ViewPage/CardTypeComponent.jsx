import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Billete from '../../assets/billete';


export const CardTypeComponent = ({ cardData }) => {

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Tipo de tarjeta
                </Typography>
                {
                    // Si no existe un nombre del tipo de billete, no mostramos los datos
                    cardData.type.name === ''
                        ? ( <Typography>Sin datos</Typography> )
                        : (
                            <Grid container spacing={3}>

                                {/* Mostramos el icono del billete */}
                                <Grid item xs={12} sm={7} md={7}>
                                    <Billete
                                        nombre={ cardData.type.name }
                                        zonas={
                                            cardData.zone === 0
                                                ? ''
                                                :  cardData.zone === 1
                                                    ? `${ cardData.zone.toString() } Zona`
                                                    : `${ cardData.zone.toString() } Zones`
                                        }
                                    />
                                </Grid>

                                {/* Mostramos los datos del tipo de targeta */}
                                <Grid item xs={12} sm={5} md={5}>
                                    <Typography variant='h5'>{ cardData.type.name }</Typography>
                                    <Typography>
                                        {
                                            cardData.zone === 0
                                                ? ''
                                                : cardData.zone === 1
                                                    ? `${ cardData.zone.toString() } Zona`
                                                    : `${ cardData.zone.toString() } Zonas`
                                        }
                                    </Typography>
                                </Grid>
                                
                            </Grid>
                        )
                }
            </Paper>
        </Grid>
    )
}

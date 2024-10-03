import { Card, CardContent, Grid, Typography } from '@mui/material';
import Billete from '../../assets/billete';
import { CardData } from '../../types/types';

interface Props {
    cardData: CardData
}

export const CardTypeComponent = ({ cardData }: Props ) => {

    return (
        <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>Tipo de tarjeta</Typography>
            <Card>
                <CardContent>
                    {
                        // Si no existe un nombre del tipo de billete, no mostramos los datos
                        cardData.type.name === ''
                            ? ( <Typography variant='h5'>Sin datos</Typography> )
                            : (
                                <Grid container spacing={2}>

                                    {/* Mostramos el icono del billete */}
                                    <Grid item xs={5}>
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
                                    <Grid item xs={7}>
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
                </CardContent>
            </Card>
        </Grid>
    )
}
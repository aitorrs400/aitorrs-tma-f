import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { CardData } from '../../types/types';

interface Props {
    cardData: CardData
}

export const VerifyComponent = ({ cardData }: Props ) => {

    const { realCRC, calculatedCRC } = cardData;

    return (
        <Grid item xs={12}>
            <Typography variant='h5' sx={{ mb: 2 }}>Comprobación</Typography>
            <Card>
                <CardContent>
                    {
                        realCRC === ''
                            ? ( <Typography variant='h5'>Sin datos</Typography> )
                            : (
                                <>
                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item xs={6}>
                                            <Typography variant='h5'>Código del billete</Typography>
                                            <Typography>{ realCRC }</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant='h5'>Código calculado</Typography>
                                            <Typography>{ calculatedCRC }</Typography>
                                        </Grid>
                                    </Grid>
                                    {
                                        realCRC === calculatedCRC
                                            ? ( <Chip label="Los códigos coinciden" color="success" /> )
                                            : ( <Chip label="Los códigos no coinciden" color="error" /> )
                                    }
                                </>
                            )
                    }
                </CardContent>
            </Card>
        </Grid>
    )
}
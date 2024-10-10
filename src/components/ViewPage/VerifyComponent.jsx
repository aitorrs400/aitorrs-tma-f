import { Chip, Grid, Paper, Typography } from '@mui/material';


export const VerifyComponent = ({ cardData }) => {

    const { realCRC, calculatedCRC } = cardData;

    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Comprobación
                </Typography>
                {
                    realCRC === ''
                        ? ( <Typography>Sin datos</Typography> )
                        : (
                            <>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Typography variant='h5'>Código del billete</Typography>
                                        <Typography>{ realCRC }</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
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
            </Paper>
        </Grid>
    )
}
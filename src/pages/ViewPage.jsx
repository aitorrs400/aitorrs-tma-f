import { useContext, useState } from 'react';
import { Grid, TextField, Button, Chip, Typography, Paper, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { binToDec, calculaCRC, getCardType, getRealCRC, getRemainTime, getRemainTrips, getStationData, getTickData, hexToBin } from '../helpers';
import { CardTypeComponent, ExpirationComponent, StationDataComponent, TickDataComponent, VerifyComponent } from '../components/ViewPage';
import { AuthContext } from '../context/AuthContext';


export const ViewPage = () => {
    
    const [modalData, setModalData] = useState({ abierto: false, titulo: '', contenido: '' });
    const [cardCode, setCardCode] = useState('');
    const [cardData, setCardData] = useState({
        type: {
            showRemainTrips: false,
            showRemainTime: false,
            type: 0,
            hex: '',
            binary: '',
            name: ''
        },
        zone: 0,
        tick: {
            day: 0,
            month: '',
            year: '',
            hour: 0,
            minute: 0,
            lastHour: 0,
            lastMinute: 0,
            lastTickDays: 0
        },
        station: '',
        stationData: {
            code: 0,
            type: 'Metro',
            lineCode: '',
            line: '',
            name: '',
            lines: []
        },
        trips: {
            remainTrips: 0,
            remainTripsPercentage: 0,
            usedTrips: 0
        },
        expiration: {
            year: '',
            month: '',
            day: 0,
            remainDays: 0,
            remainDaysPercent: 0
        },
        realCRC: '',
        calculatedCRC: ''
    });

    const { user } = useContext( AuthContext );

    const handleModalData = (e) => {
        setModalData({ abierto: false, titulo: '', contenido: '' });
    }

    const handleShow = () => {

        // Comprobamos que la logitud del código sea de 50 caracteres
        if ((cardCode.length != 50) && (cardCode.length != 40)) {

            setModalData({ abierto: true, titulo: 'Error en el código', contenido: `El código que has introducido no tiene 50 caracteres (tiene ${ cardCode.length }) ¿estás seguro que es correcto?` });
            
        } else {
        
            // Convertimos la codificación en binario y empezamos a obtener la información
            const binaryData = hexToBin(cardCode);

            // Obtenemos los datos de la targeta
            const type = getCardType(binaryData);
            const zone = binToDec(binaryData.slice(61, 64));
            const tick = getTickData(binaryData);
            const station = binToDec(binaryData.slice(76,87)).toString();
            const stationData = getStationData(parseInt(station, 10));
            const trips = getRemainTrips(binaryData, type.totalTrips);
            const expiration =  getRemainTime(binaryData, type.totalDays);
            const realCRC = getRealCRC(binaryData);
            const calculatedCRC = calculaCRC(binaryData);

            // Finalmente, seteamos los datos en el estado
            setCardData({ type, zone, tick, station, stationData, trips, expiration, realCRC, calculatedCRC });

        }

    }
    

    return (
        <>
            <Grid container spacing={2} alignItems='center' mb={4}>

                {/* Cabecera principal, donde se insertan los datos */}
                <Grid item xs={12}>
                    <Typography variant="h1" sx={{ fontSize: { xs: "24px", sm: "32px", md: "38px" }, mb: 2 }}>Hola { user.nombre }!</Typography>
                    <Typography sx={{ mb: 2 }}>Para visualizar los datos de la banda magnética de tu targeta de transporte, introduce la codificación en el campo de texto. Para mas información sobre como funciona este código, dirígete al apartado "Ayuda".</Typography>
                    <Typography sx={{ mb: 2 }}>Esta aplicación está diseñada para obtener datos mas precisos del estado de la targeta.</Typography>
                    
                    <Chip label='AVISO: Modificar los datos de la banda magnética no es ético y corres el riesgo de ser sancionado' color="error" variant="filled" sx={{ mb: 2 }} />
                </Grid>

                {/* Input del código de banda magnética */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Entrada de banda magnética
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label='Código de la banda magnética'
                                    variant='filled'
                                    sx={{ width: '100%' }}
                                    onChange={ (e) => setCardCode(e.target.value) }
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: '8px', sm: '0' }, justifyContent: 'space-between' }}>
                            <Button variant="contained" onClick={ handleShow } startIcon={ <VisibilityIcon /> }>
                                Ver datos de la targeta
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Aquí se empieza a mostrar toda la información de la targeta */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <CardTypeComponent cardData={ cardData } />
                                <ExpirationComponent cardData={ cardData } />
                                <VerifyComponent cardData={ cardData } />
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <TickDataComponent cardData={ cardData } />
                                <StationDataComponent cardData={ cardData } />
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
                
            </Grid>
            <Dialog
                open={ modalData.abierto }
                keepMounted
                onClose={ handleModalData }
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{ modalData.titulo }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        { modalData.contenido }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ handleModalData }>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
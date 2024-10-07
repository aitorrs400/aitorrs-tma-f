import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Slide, Snackbar, Tooltip, Typography, Zoom } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { axiosInstance, mensajesBack } from "../helpers";

import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';


export const ServicesPage = () => {

    // Preparamos las variables necesarias
    const navigate = useNavigate();

    // Preparamos los estados necesarios
    const [loading, setLoading] = useState(true);
    const [serviciosList, setServiciosList] = useState([]);
    const [modalEliminar, setModalEliminar] = useState({ abierto: false, id: '', nombre: '' });
    const [snackState, setSnackState] = useState({ open: false, Transition: Slide, text: 'Snackbar sin asignar', severity: 'info', autoHide: 5000 });

    // Listado de columnas que tendrá la tabla
    const columns = [
        {
            field: 'imagen',
            headerName: 'Imagen',
            width: 70,
            headerAlign: 'center',
            resizable: false,
            sortable: false,
            renderCell: (params) => <img width="50" src={params.value} />,
        },
        { field: 'nombre', headerName: 'Nombre', width: 460 },
        {
            field: 'actions',
            headerName: 'Acciones',
            type: 'actions',
            headerAlign: 'center',
            width: 120,
            renderCell: (params) => {

                const navigate = useNavigate();
                
                // const handleDetails = (e) => {
                //     e.stopPropagation(); // don't select this row after clicking
                //     navigate('/vehiculos/detalles/'+params.id, { replace: true });
                // };

                // const handleEdit = (e) => {
                //     e.stopPropagation(); // don't select this row after clicking
                //     navigate('/vehiculos/editar/'+params.id, { replace: true });
                // };

                const handleDelete = (e) => {
                    e.stopPropagation();
                    setModalEliminar({ abierto: true, id: params.id, nombre: params.row.nombre });
                }
        
                return (
                    <>
                        {/* <Tooltip arrow title="Detalles" placement="left" TransitionComponent={Zoom}>
                            <IconButton color="primary" onClick={ handleDetails }>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip arrow title="Editar" placement="right" TransitionComponent={Zoom}>
                            <IconButton color="warning" onClick={ handleEdit }>
                                <ModeEditIcon />
                            </IconButton>
                        </Tooltip> */}
                        <Tooltip arrow title="Eliminar" placement="right" TransitionComponent={Zoom}>
                            <IconButton color="error" onClick={ handleDelete }>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                );

            }       
        },
    ];

    // Preparamos los efectos necesarios
    useEffect(() => {
        peticionesApi();
    },[]);

    // Función para realizar las peticiones al back
    const peticionesApi = async () => {

        // Obtenemos el listado de servicios
        try {

            const data = await axiosInstance.get('/api/servicio');
            setServiciosList(data.data.servicios);
            setLoading(false);

        } catch ( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al cargar el listado de servicios. Motivo: '+mensaje,
                severity: 'error',
                open: true,
                autoHide: null
            });

        }

    }

    const handleAdd = () => {
        navigate('/services/add', { replace: true });
    }

    const handleModalEliminar = (e) => {
        setModalEliminar({ abierto: false, id: '', nombre: '' });
    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, open: false, autoHide: 5000 });
    }

    const handleEliminar = async (id) => {
        
        // Cerramos el modal
        handleModalEliminar();

        try {

            // Hacemos la petición al back
            const result = await axiosInstance.delete('/api/servicio/'+id);

            // Mostramos mensaje informativo
            setSnackState({
                ...snackState,
                text: 'Servicio eliminado correctamente',
                severity: 'success',
                open: true
            }); 
            
            // Volvemos a hacer petición a la API
            peticionesApi();

        } catch( error ) {

            // Generamos el mensaje de error
            let mensaje = mensajesBack(error);

            // Si hay algún error, mostramos un mensaje
            setSnackState({
                ...snackState,
                text: 'Error al eliminar el servicio. Motivo: '+mensaje,
                severity: 'error',
                open: true
            });

        }

    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Lista de servicios
                        </Typography>
                        {
                            loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <>
                                    <div style={{ width: '100%', marginBottom: '16px' }}>
                                        <DataGrid
                                            rows={ serviciosList }
                                            columns={ columns }
                                            disableColumnMenu
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                        />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: '8px' }}>
                                        <Button variant="contained" color="success" endIcon={ <AddIcon /> } onClick={ handleAdd }>Añadir nuevo</Button>
                                        <Button variant="contained" color="primary" endIcon={ <RefreshIcon /> } onClick={ peticionesApi }>Actualizar</Button>
                                    </Box>
                                </>
                            )
                        }
                    </Paper>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={ snackState.open }
                    onClose={ handleSnackClose }
                    autoHideDuration={ snackState.autoHide }
                    TransitionComponent={ snackState.Transition }
                >
                    <Alert
                        onClose={ handleSnackClose }
                        severity={ snackState.severity }
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        { snackState.text }
                    </Alert>
                </Snackbar>

            </Grid>
            <Dialog
                open={ modalEliminar.abierto }
                keepMounted
                onClose={ handleModalEliminar }
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Eliminar servicio</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        ¿Estás seguro que quieres eliminar el servicio { modalEliminar.nombre }?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ handleModalEliminar }>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={ () => handleEliminar(modalEliminar.id) }>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
import { useContext } from 'react';
import { stationsDB } from '../assets/data/stationsDB';
import { ObtenirDadesAMBResult } from '../assets/data/output';
import { useAuthStore } from '../hooks/useAuthStore';

export const DataPage = () => {
    
    const { usuario } = useAuthStore();

    const obtenerServicios = (): string[] => {
    
        let registros: string[] = [];
    
        // Obtenemos el tipo de estación de todas las estaciones
        stationsDB.map( station => {
            registros.push(Object.values( station )[1]);
        });
    
        // Eliminamos los registros duplicados para obtener finalmente los servicios disponibles
        let registrosFiltrados = registros.filter((item,index)=>{
            return registros.indexOf(item) === index;
        });

        return registrosFiltrados;

    }

    const obtenerLineas = ( servicio: string ): string[] => {
    
        let registros: string[] = [];

        const serviciosFiltrados = stationsDB.filter( station => station.type === servicio );

        // Obtenemos el tipo de estació de todas las estaciones
        serviciosFiltrados.map( station => {
            registros.push(Object.values( station )[2]);
        });
    
        // Eliminamos los registros duplicados para obtener finalmente los servicios disponibles
        let registrosFiltrados = registros.filter((item,index)=>{
            return registros.indexOf(item) === index;
        });

        return registrosFiltrados;

    }

    let servicios = obtenerServicios();
    let lineas = obtenerLineas('Metro');

    const getData = () => {

        let data = '';

        

    }

    return (
        <>
            <h1>Base de datos de estaciones</h1>
            <hr />
            <p>Hola { usuario.nombre }, aquí podrás ver los datos de las estaciones que hay actualmente en el sistema. Es una base de datos local, y actualmente solo existen todas las lineas del metro de Barcelona excepto la L11 y todas las líneas de bus (no es seguro del todo).</p>
            {
                ObtenirDadesAMBResult.Linies.Linia.map( linia => (<p><b>{ linia.CodATM }</b> - { linia.Nom } | { linia.DescripcioInterna }</p>))
            }
            {/* <Grid container spacing={2}>
                {
                    servicios.map( registro => (
                        <Grid item xs={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                {
                                    registro == 'Metro' && <MetroIcon />
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        { registro }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant='outlined'>Mostrar más</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <br></br>
            <Grid container spacing={2}>
                {
                    lineas.map( linea => (
                        <Grid item xs={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                { linea == 'L1' && <L1Icon /> }
                                { linea == 'L2' && <L2Icon /> }
                                { linea == 'L3' && <L3Icon /> }
                                { linea == 'L4' && <L4Icon /> }
                                { linea == 'L5' && <L5Icon /> }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        { linea }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant='outlined'>Mostrar más</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid> */}
        </>
    )
}
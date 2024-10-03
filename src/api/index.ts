import axios from 'axios';

// Definimos la URL base del servidor backend
const baseURL = 'https://pokeapi.co/api/v2';

// Definimos la instancia de Axios para realizar las peticiones
const instance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar'
    }
});

// Petición de prueba
export const peticionBase = async () => {

    const data = await instance.get('/pokemon/ditto');
    return data;

}
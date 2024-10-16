import { cardTypes } from '../assets/data/cardTypes';
import { stationsDB } from '../assets/data/stationsDB';
import { BusIcon, MetroIcon } from '../assets/servicios';

// Función que obtiene el tipo de targeta
export const getCardType = ( code ) => {

    // Obtenemos el tipo de targeta
    const binaryCardType = code.slice(4,16);
    const foundCardType = cardTypes.find( v => v.binary === binaryCardType );

    let data;

    // Si se ha encontrado un registro, preparamos los datos
    if(foundCardType) {
        
        data = {
            hex: foundCardType.hex,
            binary: foundCardType.binary,
            name: foundCardType.name,
            type: foundCardType.type,
            showRemainTrips: foundCardType.showRemainTrips,
            showRemainTime: foundCardType.showRemainTime,
        }

        // Añadimos datos opcionales si existen
        if(foundCardType.totalTrips) {
            data = { ...data, totalTrips: foundCardType.totalTrips }
        }
        if(foundCardType.totalDays) {
            data = { ...data, totalDays: foundCardType.totalDays }
        }

        // Devolvemos los datos
        return data;

    } else {
        return {
            showRemainTrips: false,
            showRemainTime: false,
            type: 0,
            hex: '',
            binary: '',
            name: 'Desc.'
        };
    }

}

// Funcion que obtiene los datos de marcaje
export const getTickData = ( code ) => {

    // Obtenemos la fecha del último marcaje
    const day = binToDec(code.slice(104,109));
    const month = getMothByNumber(binToDec(code.slice(100,104)));
    const year = '20' + binToDec(code.slice(93,100)).toString();

    // Obtenemos la hora del último marcaje
    const hour = binToDec(code.slice(109,114));
    const minute = binToDec(code.slice(114,120));

    // Obtenemos la hora del último transbordo
    const lastHour = binToDec(code.slice(64,69));
    const lastMinute = binToDec(code.slice(69,75));

    const { remainDays } = getRemainDays( year+'-'+binToDec(code.slice(100,104)).toString()+'-'+day.toString(), undefined);

    return { day, month, year, hour, minute, lastHour, lastMinute, lastTickDays: remainDays }

}

// Función que devuelve el número de viajes restantes
export const getRemainTrips = ( code, trips ) => {

    if( trips ) {

        const remainTrips = binToDec(code.slice(130,134));
        const usedTrips = trips - remainTrips;
        const remainTripsPercentage = usedTrips * 10;

        return { remainTrips, remainTripsPercentage, usedTrips };

    } else {
    
        return { remainTrips: 0, remainTripsPercentage: 0, usedTrips: 0 };
        
    }
    
}

// Función que devuelve el número de días restantes
export const getRemainTime = ( code, days ) => {

    // const year: string = '20' + binToDec(code.slice(93,100)).toString()
    const decYear = binToDec(code.slice(48,52)) + 16 // ACTUALIZADO A 2023
    const year = '20' + decYear.toString();
    const month = getMothByNumber(binToDec(code.slice(52,56)));
    const day = binToDec(code.slice(56,61));

    let { remainDays, remainDaysPercent } = getRemainDays( year + '-' + binToDec(code.slice(52,56)) + '-' + day, days );

    return { year, month, day, remainDays, remainDaysPercent }

}

// Función que obtiene los datos de la estación
export const getStationData = ( code ) => {

    // TODO: Conectar con la BD

    let foundStation = stationsDB.find( v => v.code === code );

    if(!foundStation) {
        foundStation = stationsDB.find( v => v.code === code );
    }

    if(foundStation) {
        return foundStation;
    } else {
        return {
            code: 0,
            type: 'Desconocido',
            lineCode: '0',
            line: 'Desconocida',
            name: 'Desconocida',
            lines: []
        };
    }

}

// Función que devuelve el nombre del mes por el número
const getMothByNumber = ( number ) => {
    
    // Obtenemos el mes del último marcaje y lo devolvemos como nombre del mes
    switch ( number ) {
        case 1:
            return 'Enero';
            break;
        case 2:
            return 'Febrero';
            break;
        case 3:
            return 'Marzo';
            break;
        case 4:
            return 'Abril';
            break;
        case 5:
            return 'Mayo';
            break;
        case 6:
            return 'Junio';
            break;
        case 7:
            return 'Julio';
            break;
        case 8:
            return 'Agosto';
            break;
        case 9:
            return 'Septiembre';
            break;
        case 10:
            return 'Octubre';
            break;
        case 11:
            return 'Noviembre';
            break;
        case 12:
            return 'Diciembre';
            break;
        default:
            return '-'
            break;
    }

}

// Función para calcular los días restantes
export const getRemainDays = ( date, tDays ) => {

    const msDays = 24 * 60 * 60 * 1000;
    const actualDay = new Date();
    const futureDay = new Date(date);

    const msDifference = Math.abs( actualDay.getTime() - futureDay.getTime() );
    let remainDays = Math.floor( msDifference / msDays );
    let remainDaysPercent;
    
    if(tDays) {
        remainDaysPercent = Math.round( 100 - ((remainDays * 100) / tDays) );
    } else {
        remainDaysPercent = 0;
    }

    if (futureDay < actualDay) {

        remainDays *= -1;
        remainDaysPercent = 100

    }

    return { remainDays, remainDaysPercent };

}

// Función que obtiene el código de comprobación real del billete
export const getRealCRC = ( code ) => {

    const crc = binaryToHex( code.slice(184,196) );
    return crc;

}

// Función que devuelve el icono según el tipo de servicio
export const getServiceIconByCode = ( code ) => {

    switch ( code ) {
    
        case 'Metro':
            return (<MetroIcon />);
        case 'Bus':
            return (<BusIcon />);

        default:
            return (<></>);

    }

}

// Función de devuelve el icono de la línea
export const generateLineIcon = (label, colorFondo, colorTexto) => {

    const backColor = colorFondo == '' ? '#9E9E9E' : colorFondo;
    const textColor = colorTexto == '' ? '#FFFFFF' : colorTexto;
    const text = label == '' ? 'N/A' : label;

    return (
        <div style={{
            marginRight: '16px',
            padding: 0,
            width: '70px',
            height: '70px',
            backgroundColor: backColor
        }}>
            <p style={{
                margin: 0,
                padding: 0,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: '70px',
                color: textColor
            }}>{ text }</p>
        </div>
    )

}


// CONVERSORES

// Conversor de hexadecimal a binario
export const hexToBin = ( hex ) => {

    let bin = "";

    for (let i = 0; i < hex.length; i++) {

      const num = parseInt(hex[i], 16);
      const binary = num.toString(2).padStart(4, "0");

      bin += binary;

    }

    return bin;

}

// Conversor de binario a decimal
export const binToDec = ( bin ) => {

    let dec = 0;

    for (let i = 0; i < bin.length; i++) {

      const bit = parseInt(bin[i]);
      dec += bit * Math.pow(2, bin.length - i - 1);

    }

    return dec;

}

// Conversor de binario a hexadecimal
export const binaryToHex = ( binary ) => {
    
    // Asegurarse de que la longitud de la cadena binaria sea un múltiplo de 4
    while (binary.length % 4 !== 0) {
        binary = '0' + binary;
    }

    const hexMap = {
      '0000': '0',
      '0001': '1',
      '0010': '2',
      '0011': '3',
      '0100': '4',
      '0101': '5',
      '0110': '6',
      '0111': '7',
      '1000': '8',
      '1001': '9',
      '1010': 'A',
      '1011': 'B',
      '1100': 'C',
      '1101': 'D',
      '1110': 'E',
      '1111': 'F',
    };
  
    let hex = '';

    for (let i = 0; i < binary.length; i += 4) {

      const chunk = binary.substr(i, 4);
      hex += hexMap[chunk];

    }
  
    return hex;

};

// CÁLCULO DE CRC

// Función que calcula el código de comprobación del código del billete
export const calculaCRC = ( pistaCompleta ) => {

    /*
    Ejemplo: BC901E395AD900014A335C00C542390C18B11000000000071F
    En binario seria: 1110 0100 1000 0000 1111 0001 1100 1010 1101 0110 1100 1000 0000 0000 0000 1010 0101 0001 1001 1010 1110 0000 0000 0110 0010 1010 0001 0001 1100 1000 0110 0000 1100 0101 1000 1000 1000 0000 0000 0000 0000 0000 0000 0000 0000 0000
    La cadena completa tiene 200 bits.
    Se descartan los 3 primeros bits y los 13 últimos, consiguiendo una cadena de 184 bits (200 - 3 - 13 = 184 bits).
    */
    // Vamos a calcular el código de comprobación (CRC)
    // Cogemos 184 bits. Es decir a partir de bit 3 (el cuarto bit ya que comenzamos por cero) hasta la posición 187.

    let datos = '';

    //alert("Cadena que recibe CRC: "+pistaCompleta);
    datos = pistaCompleta.substring(3, 187);

    //alert("Cadena cortada pa calcular CRC (de bit 3 al bit 187):: "+datos);
    const datosBinArray = datos.split('');	// convertimos en array
    const ochoCeros = '00000000'; // necesario para el calculo CRC
    const col_odd_parity = ochoCeros.split('');

    // A continuación es la traducción literal de opTMestre en Python a Javascript,
    // básicamente lee cada 8 bits la paridad y lo añade al resultado final.
    // Los comentarios en ingles estaban en el código original en Python.
    for ( let i = 0; i < 8; i++) {

        let parity = '0';

        for (let j = i; j < 184; j = j + 8){

            // hacemos un XOR
            parity = (datosBinArray[j] ^ parity);

        }

        col_odd_parity[i] = parity;

    }

    // Option 0: (Fast/emulated one) Calc even parity of resulting columun odd parity string
    let parity_check = '0';

    for (let i = 0; i < 8; i++) {

        parity_check = (col_odd_parity[i] ^ parity_check); // parity_check = bits_xor(col_odd_parity[i], parity_check)

    }

    // String concatenation resulting 9bit-crc
    let rlc = '';

    for (let i = 0; i < 8; i++) {
        rlc = rlc + col_odd_parity[i];
    }

    rlc = rlc + parity_check;

    return binaryToHex( arrange_crc(rlc) );

}

// Función extra de apollo a la función anterior
export const arrange_crc = ( crc ) => {

    // CRC are not a pure RLC, there are 2 bits (8 and 0) that doens't
    // act as expeted, this automata tries to correct that to emulate
    // the TMB behaviour """
    /* ------------------------------------
    La correción de los bits es problemático, ya que según que opciones se graben,
    el CRC se calcula mal en algunas tarjetas.

    La "tabla original" que hay unas líneas más abajo, es la original de opTMestre en Phyton
    Esta tabla no funciona bien, a veces da errores en el CRC final

    TABLA ORIGINAL DE opTMestre en su versión Phyton de Danonymous
    Si bit[0]=0 y bit[8]=0 --> bit[0]=1 y bit[8]=0
    Si bit[0]=0 y bit[8]=1 --> bit[0]=0 y bit[8]=1
    Si bit[0]=1 y bit[8]=0 --> bit[0]=0 y bit[8]=0
    Si bit[0]=1 y bit[8]=1 --> bit[0]=1 y bit[8]=1

    La "tabla modificada" que hay más abajo, parece arreglar los fallos anteriores, pero sigue fallando a veces.
    Quizás una explicación es que las máquinas marcadoras, cuando el billete se agota, A VECES escriben mal el CRC expresamente.
    Pero en otros casos no hay explicación del motivo. O quizás es que soy un poco burra y no doy pa mas, quien sabe.

    TABLA MODIFICADA de opTMestre en esta versión Javascript
    Si bit[0]=0 y bit[8]=0 --> bit[0]=0 y bit[8]=1
    Si bit[0]=0 y bit[8]=1 --> bit[0]=0 y bit[8]=1
    Si bit[0]=1 y bit[8]=0 --> bit[0]=0 y bit[8]=0

    Versión año 2012: Si bit[0]=1 y bit[8]=1 --> bit[0]=1 y bit[8]=1 	(cuando esta agotada marca 00 y no 11)(aunque no estoy seguro del todo)
    Versión año 2013: Si bit[0]=1 y bit[8]=1 --> bit[0]=0 y bit[8]=0	¿Son imaginaciones mías o este año TMB ha modificado un poco el CRC?
    ----------------------------------------
    */

    let x = cogeBit(crc, 0);
    let y = cogeBit(crc, 8);
    let x2 = '0';
    let y2 = '0';

    if (x == '0') {

        if (y == '0') { x2 = '0'; y2 = '1'; }
        else { x2 = '0'; y2 = '1'; }

    } else {

        if (y == '0') { x2 = '0'; y2 = '0'; }
        else { x2 = '0'; y2 = '0'; }

    }

    crc = ponBit(crc, 0, x2);
    crc = ponBit(crc, 8, y2);

    return crc;

}

// Lee un bit en la posicion dada. Comienza por posicion 0.
const cogeBit = ( cadena, pos ) => {

    let result = '';
    result = cadena.charAt(pos);

    return(result);

}

// Escribe un bit en la posicion dada.  
const ponBit = ( str, index, chr ) => {

    if (index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);

}


interface Types {
    login: string
    logout: string
}

export const types: Types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout'
}

export interface Tick {
    day: number
    month: string
    year: string
    hour: number
    minute: number
    lastHour: number
    lastMinute: number
    lastTickDays: number
}

export interface Trips {
    remainTrips: number
    remainTripsPercentage: number
    usedTrips: number
}

export interface Expiration {
    year: string
    month: string
    day: number
    remainDays: number
    remainDaysPercent: number
}

export interface CardData {
    type: CardType
    zone: number
    tick: Tick
    station: string
    stationData: StationData
    trips: Trips
    expiration: Expiration
    realCRC: string
    calculatedCRC: string
}

// Formato de los datos de la base de datos local
export interface CardType {
    hex: string
    binary: string
    name: string
    type: number
    showRemainTrips: boolean
    showRemainTime: boolean
    totalDays?: number
    totalTrips?: number
}

export interface StationData {
    code: number
    type: 'Metro' | 'Bus' | 'Desconocido'
    lineCode: string
    line: string
    name?: string
    lines?: string[]
}

// Formato de la base de datos de colores de lineas
export interface LineColorData {
    intCode: string,
    code: string,
    backColor: string,
    textColor: string
}

export interface User {
    name: string;
    email: string;
    role: string;
    state: boolean;
    google: boolean;
    uid: string;
}
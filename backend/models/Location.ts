import { Geolocation } from './GeoLocation';
export interface Location {
    pitchid: number;
    name: string;
    address: string;
    coordinates: Geolocation;
}

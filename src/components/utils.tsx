import {TemperaturUnits} from '../store/types';

export const convertTemperature = (destUnit:TemperaturUnits, temperature:number ):string => {
    let displayTemperature = temperature;
    let sign = temperature>=0? "+" : "-";
    if(destUnit==TemperaturUnits.Ferenheit){
        displayTemperature = (temperature * 9/5) + 32;       ;
    }
    return `${sign} ${displayTemperature} ${destUnit}`;
}
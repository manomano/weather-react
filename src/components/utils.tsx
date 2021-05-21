import {TemperaturUnits} from '../store/types';

export const convertTemperature = (destUnit: TemperaturUnits, temperature: number ): string => {
    let displayTemperature = temperature;
    const sign = temperature >= 0 ? '+' : '-';
    if (destUnit === TemperaturUnits.Ferenheit) {
        displayTemperature = Number(((temperature * 9 / 5) + 32).toFixed(2));
    }
    const symbol = destUnit === TemperaturUnits.Ferenheit ? 'F' : 'C';
    return `${sign} ${displayTemperature} ${symbol}`;
};

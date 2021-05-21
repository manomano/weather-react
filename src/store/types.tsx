export const SAVE_GAME = 'SAVE_GAME';
export const SET_UNIT = 'SET_UNIT';

export enum TemperaturUnits {
  Celsius= 'Celsius',
  Ferenheit= 'Ferenheit',
}

export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }

  export interface WeatherData {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: {
      lon: number;
      lat: number;
    };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: string;
    sys: {
      country: string;
      id: number;
      sunrise: number;
      sunset: number;
      type: number;
    };
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: {
      speed: number;
      deg: number;
    };
  }

  export interface City {
    id: number;
    city: string;
    state: string;
    country: string;
    countryName: string;
    temperature?: number;
    [propName: string]: any;

  }

  export interface GameRecord {
    left: City;
    right: City;
    isWon: boolean;
  }

  export interface GameState {
    history: GameRecord[] ;
    unit: TemperaturUnits;
  }

  export interface SetUnitAction {
    type: typeof SET_UNIT;
    payload: TemperaturUnits;
  }

  export interface AddGameAction {
    type: typeof SAVE_GAME;
    payload: GameRecord;
  }

  export type GameAction = SetUnitAction | AddGameAction;

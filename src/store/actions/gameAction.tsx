import { SET_UNIT, SAVE_GAME, SetUnitAction, GameRecord, AddGameAction, TemperaturUnits } from '../types';

export const setUnit = (message: TemperaturUnits): SetUnitAction => {
  return {
    type: SET_UNIT,
    payload: message,
  };
};

export const saveGame = (data: GameRecord): AddGameAction => {
    return {
        type: SAVE_GAME,
        payload: data,
      };
};

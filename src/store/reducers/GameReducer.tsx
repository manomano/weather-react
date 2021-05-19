import { GameState, SET_UNIT, SAVE_GAME, GameAction, TemperaturUnits } from "../types";

const initialState: GameState = {
  history: [],
  unit: TemperaturUnits.Celsius
}

export default (state = initialState, action: GameAction): GameState => {
  console.log("state in reducer", state);
  switch(action.type) {
    case SAVE_GAME:
      return {
        ...state,
        history: [...state.history, action.payload]
      }
    case SET_UNIT:
      return {
        ...state,
        unit: action.payload
      }
   
    default: 
      return state;
  }
}
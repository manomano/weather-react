import { GameState, SET_UNIT, SAVE_GAME, GameAction, TemperaturUnits } from "../types";

const initialState: GameState = {
  history: [],
  unit: TemperaturUnits.Celsius
}

const GameReducer =   (state = initialState, action: GameAction): GameState => {
  
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

export default GameReducer;
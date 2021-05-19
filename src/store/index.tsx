import { createStore,  combineReducers } from 'redux';





import GameReducer from './reducers/GameReducer';

const rootReducer = combineReducers({
  game: GameReducer  
});


function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("game", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}


function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("game");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

/* const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); */

const store = createStore(rootReducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
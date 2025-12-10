import { createContext, useContext, useReducer } from 'react';
import { ABILITIES, ABILITIES_LOWER_BOUND, ABILITIES_UPPER_BOUND } from './constants';

////// ACTIONS
//// 'abilities/increment'
// payload = ability name (string)

const reducer = (state: any, action: any) => {
  // TODO add default/fail case
  // TODO (bug fix): these action triggers twice on each single click
  switch (action.type) {

    case 'abilities/increment': {
      if (state.get(action.payload) >= ABILITIES_UPPER_BOUND) {
        return state;
      }
      return new Map([...state, [action.payload, state.get(action.payload) + 1]]);
    }

    case 'abilities/decrement': {
      if (state.get(action.payload) <= ABILITIES_LOWER_BOUND) {
        return state;
      }
      return new Map([...state, [action.payload, state.get(action.payload) - 1]]);
    }
  }
}

// TODO create type for context/state
const AbilitiesContext = createContext({} as any);

export const useAbilitiesContext = () => {
  return useContext(AbilitiesContext)
}

const defaultAbilitiesMap = new Map<string, number>(
  Object.values(ABILITIES).map((ability) => [ability, 0])
)

export const AbilitiesContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, defaultAbilitiesMap)

  return (
    <AbilitiesContext.Provider value={{state, dispatch}}>
      {children}
    </AbilitiesContext.Provider>
  );
}

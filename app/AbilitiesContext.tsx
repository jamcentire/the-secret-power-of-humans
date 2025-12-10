import { createContext, useContext, useReducer } from 'react';
import { ABILITIES } from './constants';

////// ACTIONS
//// 'abilities/increment'
// payload = ability name (string)

const reducer = (state: any, action: any) => {
  // TODO add default/fail case
  // TODO (bug fix): these action triggers twice on each single click
  switch (action.type) {
    case 'abilities/increment': {
      console.log(`increment ${action.payload}`);
      return state;
      // return {...state, ability = state[ability] + 1};
    }
    case 'abilities/decrement': {
      console.log(`decrement ${action.payload}`);
      return state;
      // return {...state, ability = state[ability] + 1};
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

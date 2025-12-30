import { createContext, useContext, useReducer } from 'react';
import { ABILITIES } from './constants';

type Action = 
  | { type: 'abilities/increment'; payload: { name: string } }
  | { type: 'abilities/decrement'; payload: { name: string } }
  | { type: 'aspects/create'; payload: { name: string } }
  | { type: 'aspects/delete'; payload: { name: string } }
  | { type: 'aspects/increment'; payload: { name: string } }
  | { type: 'aspects/decrement'; payload: { name: string } }

const reducer = (state: any, action: Action) => {
  // TODO add default/fail case
  // TODO (bug fix): these action triggers twice on each single click
  switch (action.type) {

    case 'abilities/increment': {
      return new Map([...state, [action.payload, state.get(action.payload) + 1]]);
    }

    case 'abilities/decrement': {
      return new Map([...state, [action.payload, state.get(action.payload) - 1]]);
    }

  }
}

// TODO create type for dispatch?
const AbilitiesContext = createContext({} as Map<string, number>);
const DispatchContext = createContext({} as any);

export const useAbilitiesContext = () => {
  return useContext(AbilitiesContext);
}

export const useAbilitiesDispatch = () => {
  return useContext(DispatchContext);
}

export const CharacterCreatorContextProvider = ({children}: any) => {
  const defaultAbilitiesMap = new Map<string, number>(
    Object.values(ABILITIES).map((ability) => [ability, 0])
  )

  const [state, dispatch] = useReducer(reducer, defaultAbilitiesMap)

  return (
    <AbilitiesContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </AbilitiesContext.Provider>
  );
}

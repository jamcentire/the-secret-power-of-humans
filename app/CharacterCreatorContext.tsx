import { createContext, useContext, useReducer } from 'react';
import { ABILITIES } from './constants';

type Action = 
  | { type: 'name/create'; payload: { name: string } }
  | { type: 'abilities/increment'; payload: { name: string } }
  | { type: 'abilities/decrement'; payload: { name: string } }
  | { type: 'aspects/create'; payload: { name: string } }
  | { type: 'aspects/delete'; payload: { name: string } }
  | { type: 'aspects/increment'; payload: { name: string } }
  | { type: 'aspects/decrement'; payload: { name: string } }


  // TODO add level, description, id, archetypes
export interface CharacterData {
  name: string
  abilities:  Map<string, number>
  aspects:  Map<string, number>
  // NOTE: Why is this a map? Feels like it could be a list since we don't need lookups by aspect name
  archetypes: Object
}

// TODO abstract CharacterData from/to State
export interface State {
  name: string
  abilities:  Map<string, number>
  aspects:  Map<string, number>
}
// TODO: add archetypes

const reducer = (state: State, action: Action) => {
  // TODO add default/fail case
  // TODO (bug fix): these action triggers twice on each single click
  switch (action.type) {

    case 'name/create': {
      const name = action.payload.name

      return {
        ...state,
        name: name
      }
    }

    case 'abilities/increment': {
      const newAbilities = new Map(state.abilities).set(
        action.payload.name,
        (state.abilities.get(action.payload.name) ?? 0) + 1
      );

      return {
        ...state,
        abilities: newAbilities
      }
    }

    case 'abilities/decrement': {
      const newAbilities = new Map(state.abilities).set(
        action.payload.name,
        (state.abilities.get(action.payload.name) ?? 0) - 1
      );

      return {
        ...state,
        abilities: newAbilities
      }
    }

    case 'aspects/increment': {
      const newAspects = new Map(state.aspects).set(
        action.payload.name,
        (state.aspects.get(action.payload.name) ?? 0) + 1
      );

      return {
        ...state,
        aspects: newAspects
      }
    }

    case 'aspects/decrement': {
      const newAspects = new Map(state.aspects).set(
        action.payload.name,
        (state.aspects.get(action.payload.name) ?? 0) - 1
      );

      return {
        ...state,
        aspects: newAspects
      }
    }

    case 'aspects/create': {
      const newAspects = new Map(state.aspects).set(
        action.payload.name,
        1
      );

      return {
        ...state,
        aspects: newAspects
      }
    }

    case 'aspects/delete': {
      const newAspects = new Map(state.aspects);
      newAspects.delete(action.payload.name)

      return {
        ...state,
        aspects: newAspects
      }
    }

  }
}

// TODO create type for dispatch?
const CharacterCreatorContext = createContext({} as State);
const CharacterCreatorDispatchContext = createContext({} as any);

export const useCharacterCreatorContext = () => {
  return useContext(CharacterCreatorContext);
}

export const useCharacterCreatorDispatch = () => {
  return useContext(CharacterCreatorDispatchContext);
}

export const CharacterCreatorContextProvider = ({children}: any) => {
  const defaultAbilitiesMap = new Map<string, number>(
    Object.values(ABILITIES).map((ability) => [ability, 0])
  )

  const defaultState = {
    name: '',
    abilities: defaultAbilitiesMap,
    aspects: new Map(),
  }
  // console.log('establishing context')
  // console.log(defaultState)

  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <CharacterCreatorContext.Provider value={state}>
      <CharacterCreatorDispatchContext.Provider value={dispatch}>
        {children}
      </CharacterCreatorDispatchContext.Provider>
    </CharacterCreatorContext.Provider>
  );
}

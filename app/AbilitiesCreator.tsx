'use client'

import './AbilitiesCreator.css'

import {
  ABILITIES_STARTING_POINTS,
  ABILITIES_LOWER_BOUND,
  ABILITIES_UPPER_BOUND
} from './constants'

import { useState } from 'react';
import { useCharacterCreatorContext, useCharacterCreatorDispatch } from './CharacterCreatorContext';
import { AbilitiesTable } from './AbilitiesTable';
import { AvailablePoints } from './AvailablePoints';


export const AbilitiesCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ABILITIES_STARTING_POINTS)
  // Can this abilitiesMap be punted further down (into the abilities table)?
  const abilitiesMap = useCharacterCreatorContext().abilities;
  const dispatch = useCharacterCreatorDispatch();

  const tryIncrementAbility = (ability: string): void => {
    if (availablePoints <= 0 || abilitiesMap.get(ability) >= ABILITIES_UPPER_BOUND) {
      return
    }
    setAvailablePoints(availablePoints - 1)
    dispatch({
      type: 'abilities/increment',
      payload: {name: ability}
    })
  }

  const tryDecrementAbility = (ability: string): void => {
    if (abilitiesMap.get(ability) <= ABILITIES_LOWER_BOUND) {
      return
    }
    setAvailablePoints(availablePoints + 1)
    dispatch({
      type: 'abilities/decrement',
      payload: {name: ability}
    })
  }

  // TODO: eventually move text styling into its own doc
  return (
    <div className='abilities-creator'>
        <AvailablePoints
          availablePoints={availablePoints}
        ></AvailablePoints>
        <AbilitiesTable
          availablePoints={availablePoints}
          triggerDecrementAbility={tryDecrementAbility}
          triggerIncrementAbility={tryIncrementAbility}
        ></AbilitiesTable>
    </div>
  )
}
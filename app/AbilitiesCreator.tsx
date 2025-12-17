'use client'

import {
  ABILITIES_STARTING_POINTS,
  ABILITIES_LOWER_BOUND,
  ABILITIES_UPPER_BOUND
} from './constants'

import { useState } from 'react';
import { useAbilitiesContext, useAbilitiesDispatch } from './AbilitiesContext';
import { AbilitiesTable } from './AbilitiesTable';
import { AvailablePoints } from './AvailablePoints';

export const AbilitiesCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ABILITIES_STARTING_POINTS)
  const abilitiesMap = useAbilitiesContext();
  const dispatch = useAbilitiesDispatch();

  const tryIncrementAbility = (ability: string): void => {
    if (availablePoints <= 0 || abilitiesMap.get(ability) >= ABILITIES_UPPER_BOUND) {
      return
    }
    setAvailablePoints(availablePoints - 1)
    dispatch({
      type: 'abilities/increment',
      payload: ability
    })
  }

  const tryDecrementAbility = (ability: string): void => {
    if (abilitiesMap.get(ability) <= ABILITIES_LOWER_BOUND) {
      return
    }
    setAvailablePoints(availablePoints + 1)
    dispatch({
      type: 'abilities/decrement',
      payload: ability
    })
  }

  return (
    <>
      <AbilitiesTable 
        availablePoints={availablePoints}
        triggerDecrementAbility={tryDecrementAbility}
        triggerIncrementAbility={tryIncrementAbility}
      ></AbilitiesTable>
      <AvailablePoints
        availablePoints={availablePoints}
      ></AvailablePoints>
    </>
  )
}
'use client'

import './AspectsCreator.css'

import {
  ASPECTS_STARTING_POINTS,
  ASPECTS_LOWER_BOUND,
  ASPECTS_UPPER_BOUND
} from './constants'

import { useState } from 'react';
import { useAbilitiesContext, useAbilitiesDispatch } from './CharacterCreatorContext';
import { AbilitiesTable } from './AbilitiesTable';
import { AvailablePoints } from './AvailablePoints';

const ABILITIES_TEXT = `
Aspects are your life experiences and the hella cool shit you can do
`

export const AspectsCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ASPECTS_STARTING_POINTS)
  const dispatch = useAbilitiesDispatch();

  const tryIncrementAbility = (ability: string): void => {
    // if (availablePoints <= 0 || abilitiesMap.get(ability) >= ABILITIES_UPPER_BOUND) {
    //   return
    // }
    setAvailablePoints(availablePoints - 1)
    dispatch({
      type: 'abilities/increment',
      payload: ability
    })
  }

  const tryDecrementAbility = (ability: string): void => {
    // //  if (abilitiesMap.get(ability) <= ABILITIES_LOWER_BOUND) {
    // //    return
    // //  }
    setAvailablePoints(availablePoints + 1)
    dispatch({
      type: 'abilities/decrement',
      payload: ability
    })
  }

  // TODO: eventually move text styling into its own doc
  return (
    <div className='abilities-creator'>
      <div className='standard-text'>{ABILITIES_TEXT}</div>
      <AbilitiesTable 
        availablePoints={availablePoints}
        triggerDecrementAbility={tryDecrementAbility}
        triggerIncrementAbility={tryIncrementAbility}
      ></AbilitiesTable>
      <AvailablePoints
        availablePoints={availablePoints}
      ></AvailablePoints>
    </div>
  )
}
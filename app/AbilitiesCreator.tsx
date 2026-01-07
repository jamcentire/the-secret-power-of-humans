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

const ABILITIES_TEXT = `
Abilities represent your character's innate capacity for physical, mental and emotional feats. Choose your starting scores here. Scores range from -2 (terrible) to 4 (exceptional).

These scores represent the abilities of normal people, which you will be playing! Albert Einstein would probably have an Intelligence of 6, and Hafthor Bjornson
would have a strength of 6. For your case, the max score of 4 represents a strong enough ability that you don't know anybody who's better than you at this.
`

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
      <div className='standard-text'>{ABILITIES_TEXT}</div>
      <div>
        <AvailablePoints
          availablePoints={availablePoints}
        ></AvailablePoints>
        <AbilitiesTable
          availablePoints={availablePoints}
          triggerDecrementAbility={tryDecrementAbility}
          triggerIncrementAbility={tryIncrementAbility}
        ></AbilitiesTable>
      </div>
    </div>
  )
}
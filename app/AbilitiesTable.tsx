'use client'

import './AbilitiesTable.css';

import { CircleMinus, CirclePlus } from 'lucide-react';

import { useAbilitiesContext, useAbilitiesDispatch } from './AbilitiesContext';
import { useState } from 'react';
import {
  ABILITIES_LOWER_BOUND,
  ABILITIES_UPPER_BOUND,
  ABILITIES_STARTING_POINTS
} from './constants';

interface AbilitiesCellProps {
  ability: string;
  value: number;
  increment: () => void;
  decrement: () => void;
}

const AbilitiesCell = (props: AbilitiesCellProps) => {
  return (
    <div className='abilities-cell'>
      <div>{props.ability}</div>
      <CircleMinus onClick={props.decrement}/>
      <div>{props.value}</div>
      <CirclePlus onClick={props.increment}/>
    </div>
  )
}

export const AbilitiesTable = () => {
  const [availablePoints, setAvailablePoints] = useState(ABILITIES_STARTING_POINTS)

  const abilitiesMap = useAbilitiesContext()
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
      <div className='abilities-table'>
        {[...abilitiesMap].map((entry) => {
          return <div key={`${entry[0]}-${entry[1]}`}>
            <AbilitiesCell
              ability={entry[0]}
              value={entry[1]}
              increment={() => tryIncrementAbility(entry[0])}
              decrement={() => tryDecrementAbility(entry[0])}
            ></AbilitiesCell>
          </div>
        })}
      </div>
      <div>{availablePoints}</div>
    </>
  )
}
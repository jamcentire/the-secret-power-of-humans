'use client'

import './AspectsCreator.css'

import {
  ASPECTS_STARTING_POINTS,
  ASPECTS_LOWER_BOUND,
  ASPECTS_UPPER_BOUND
} from './constants'

import { useState } from 'react';
import { useCharacterCreatorContext, useCharacterCreatorDispatch } from './CharacterCreatorContext';
import { AvailablePoints } from './AvailablePoints';
import { NumberInceDec } from './NumberIncDec';

const ABILITIES_TEXT = `
Aspects are your life experiences and the hella cool shit you can do
`

interface AspectRowProps {
  name: string
  level: number
}

const AspectRow = (props: AspectRowProps) => {
  return (
    <div className='aspect-row'>
      <>
        {props.name}: {props.level}
      </>
      <NumberInceDec
        value={props.level}
        triggerIncrement={() => {}}
        triggerDecrement={() => {}}
      ></NumberInceDec>
    </div>
  )
}

export const AspectsCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ASPECTS_STARTING_POINTS)
  const aspectsList = useCharacterCreatorContext().aspects;
  const dispatch = useCharacterCreatorDispatch();

  // TODO remove and replace with actual state
  const dummyAspects = new Map<string, number>([
    ['fightin', 5],
    ['eatin', 4]
  ])

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

  // TODO: eventually move text styling into its own doc to avoid duplication
  return (
    <div className='aspects-creator'>
      <div className='standard-text'>{ABILITIES_TEXT}</div>
      <div style={{display: 'grid', flexDirection: 'column'}}>
        {Array.from(dummyAspects.entries()).map((aspect) => {
          return (<AspectRow name={aspect[0]} level={aspect[1]}/>)
        })}
      </div>
      {dummyAspects}
      <AvailablePoints
        availablePoints={availablePoints}
      ></AvailablePoints>
    </div>
  )
}
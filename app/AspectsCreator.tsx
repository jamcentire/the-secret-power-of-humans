'use client'

import { Trash } from 'lucide-react';

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

interface AspectRowProps {
  name: string
  level: number
  triggerIncrement: () => void
  triggerDecrement: () => void
  triggerDelete: () => void
}

const AspectRow = (props: AspectRowProps) => {
  return (
    <div className='aspect-row'>
      <div>
        {props.name}
      </div>
      <NumberInceDec
        value={props.level}
        triggerIncrement={props.triggerIncrement}
        triggerDecrement={props.triggerDecrement}
      ></NumberInceDec>
      <Trash onClick={props.triggerDelete}>
      </Trash>
    </div>
  )
}

export const AspectsCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ASPECTS_STARTING_POINTS);
  const [newAspect, setNewAspect] = useState('');
  const aspects = useCharacterCreatorContext().aspects;
  const dispatch = useCharacterCreatorDispatch();

  const tryIncrementAspect = (aspect: string): void => {
    // TODO check if aspect exists first?
    if (availablePoints <= 0 || (aspects.get(aspect) >= ASPECTS_UPPER_BOUND)) {
      return
    }
    setAvailablePoints(availablePoints - 1)
    dispatch({
      type: 'aspects/increment',
      payload: {name: aspect}
    })
  }

  const tryDecrementAspect = (aspect: string): void => {
    if ((aspects.get(aspect) <= ASPECTS_LOWER_BOUND)) {
      return
    }
    setAvailablePoints(availablePoints + 1)
    dispatch({
      type: 'aspects/decrement',
      payload: {name: aspect}
    })
  }

  const createNewAspect = () => {
    if (aspects.has(newAspect) || (availablePoints <= 0)) {
      return
    }
    setAvailablePoints(availablePoints - 1)
    dispatch({
      type: 'aspects/create',
      payload: {name: newAspect}
    })
  }

  const deleteAspect = (name: string) => {
    setAvailablePoints(availablePoints + aspects.get(name))
    dispatch({
      type: 'aspects/delete',
      payload: {name: name}
    })
  }

  // TODO: eventually move text styling into its own doc to avoid duplication
  return (
    <div className='aspects-creator'>
      <div className='aspects-table'>
        <AvailablePoints
          availablePoints={availablePoints}
        ></AvailablePoints>
        <div>
          <div className='aspect-input-row'>
            <input type='text' onChange={(e) => setNewAspect(e.target.value)}></input>
            <div onClick={createNewAspect}>CREATE</div>
          </div>
          {Array.from(aspects.entries()).map((aspect) => {
            return (<AspectRow
              name={aspect[0]}
              level={aspect[1]}
              triggerIncrement={() => tryIncrementAspect(aspect[0])}
              triggerDecrement={() => tryDecrementAspect(aspect[0])}
              triggerDelete={() => deleteAspect(aspect[0])}
              key={`${aspect[0]} - ${aspect[1]}`}
            ></AspectRow>)
          })}
        </div>
      </div>
    </div>
  )
}
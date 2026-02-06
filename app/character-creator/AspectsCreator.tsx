'use client'

import { Trash } from 'lucide-react';

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
  name: string;
  level: number;
  triggerIncrement: () => void;
  triggerDecrement: () => void;
  triggerDelete: () => void;
}

const AspectRow = (props: AspectRowProps) => {
  return (
    <div className="flex items-center w-1/2 h-[1.8em] border-2 border-black px-2.5 py-[0.1em]">
      {/* Name */}
      <div className="flex-1">{props.name}</div>

      {/* Inc/dec component */}
      <div className="w-[6em]">
        <NumberInceDec
          value={props.level}
          triggerIncrement={props.triggerIncrement}
          triggerDecrement={props.triggerDecrement}
        />
      </div>

      {/* Delete button */}
      <div
        className="w-[3em] hover:cursor-pointer flex items-center justify-center"
        onClick={props.triggerDelete}
      >
        <Trash />
      </div>
    </div>
  )
}

export const AspectsCreator = () => {
  const [availablePoints, setAvailablePoints] = useState(ASPECTS_STARTING_POINTS);
  const [newAspect, setNewAspect] = useState('');
  const aspects = useCharacterCreatorContext().aspects;
  const dispatch = useCharacterCreatorDispatch();

  const tryIncrementAspect = (aspect: string) => {
    if (availablePoints <= 0 || ((aspects.get(aspect) ?? ASPECTS_UPPER_BOUND + 1) >= ASPECTS_UPPER_BOUND)) {
      return;
    }
    setAvailablePoints(availablePoints - 1);
    dispatch({
      type: 'aspects/increment',
      payload: { name: aspect }
    });
  }

  const tryDecrementAspect = (aspect: string) => {
    if (((aspects.get(aspect) ?? ASPECTS_LOWER_BOUND - 1) <= ASPECTS_LOWER_BOUND)) {
      return;
    }
    setAvailablePoints(availablePoints + 1);
    dispatch({
      type: 'aspects/decrement',
      payload: { name: aspect }
    });
  }

  const createNewAspect = () => {
    if (aspects.has(newAspect) || availablePoints <= 0 || newAspect.length === 0) {
      return;
    }
    setAvailablePoints(availablePoints - 1);
    dispatch({
      type: 'aspects/create',
      payload: { name: newAspect }
    });
  }

  const deleteAspect = (name: string) => {
    setAvailablePoints(availablePoints + (aspects.get(name) ?? 0));
    dispatch({
      type: 'aspects/delete',
      payload: { name: name }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Available points display */}
      <AvailablePoints availablePoints={availablePoints} />

      {/* Aspects table */}
      <div className="flex flex-col gap-2">
        {/* Input row */}
        <div className="flex w-[20em] gap-4 mb-4 pl-4">
          <input
            type="text"
            placeholder="Enter your aspect here!"
            className="flex-1 p-2"
            onChange={(e) => setNewAspect(e.target.value)}
          />
          <button className="flex-2 p-2" onClick={createNewAspect}>
            Add aspect
          </button>
        </div>

        {/* Existing aspects */}
        {Array.from(aspects.entries()).map(([name, level]) => (
          <AspectRow
            key={`${name}-${level}`}
            name={name}
            level={level}
            triggerIncrement={() => tryIncrementAspect(name)}
            triggerDecrement={() => tryDecrementAspect(name)}
            triggerDelete={() => deleteAspect(name)}
          />
        ))}
      </div>
    </div>
  )
}

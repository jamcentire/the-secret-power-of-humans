import './AbilitiesTable.css';

import { CircleMinus, CirclePlus } from 'lucide-react';

import { useAbilitiesContext } from './AbilitiesContext';

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
  const context = useAbilitiesContext()
  const abilitiesMap = context.state;
  const dispatch = context.dispatch;

  const incrementAbility = (ability: string): void => {
    dispatch({
      type: 'abilities/increment',
      payload: ability
    })
  }
  const decrementAbility = (ability: string): void => {
    dispatch({
      type: 'abilities/decrement',
      payload: ability
    })
  }


  return (
    <div className='abilities-table'>
      {[...abilitiesMap].map((entry) => {
        return <div key={`${entry[0]}-${entry[1]}`}>
          <AbilitiesCell
            ability={entry[0]}
            value={entry[1]}
            increment={() => incrementAbility(entry[0])}
            decrement={() => decrementAbility(entry[0])}
          ></AbilitiesCell>
        </div>
      })}
    </div>
  )
}
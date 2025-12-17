'use client'

import './AbilitiesTable.css';

import { CircleMinus, CirclePlus } from 'lucide-react';

import { useAbilitiesContext } from './AbilitiesContext';

interface AbilitiesCellProps {
  ability: string;
  value: number;
  triggerIncrement: () => void;
  triggerDecrement: () => void;
}

const AbilitiesCell = (props: AbilitiesCellProps) => {
  // TODO: move the inc/dec toggle into its own component, to be reused by Aspects
  return (
    <div className='abilities-cell'>
      <div>{props.ability}</div>
      <CircleMinus onClick={props.triggerDecrement}/>
      <div>{props.value}</div>
      <CirclePlus onClick={props.triggerIncrement}/>
    </div>
  )
}

// inc/dec shouldn't really be props of the table, since the non-creation table doesn't have them,
// but idfk what do with this right now. Problem for future Jacob (you got this, brother)
interface AbilitiesTableProps {
  availablePoints: number;
  triggerDecrementAbility: (ability: string) => void;
  triggerIncrementAbility: (ability: string) => void;
}

export const AbilitiesTable = ( props: AbilitiesTableProps ) => {
  const abilitiesMap = useAbilitiesContext();

  return (
    <>
      <div className='abilities-table'>
        {[...abilitiesMap].map((entry) => {
          return <div key={`${entry[0]}-${entry[1]}`}>
            <AbilitiesCell
              ability={entry[0]}
              value={entry[1]}
              triggerIncrement={() => props.triggerIncrementAbility(entry[0])}
              triggerDecrement={() => props.triggerDecrementAbility(entry[0])}
            ></AbilitiesCell>
          </div>
        })}
      </div>
    </>
  )
}
'use client'

import './AbilitiesTable.css';

import { CircleMinus, CirclePlus } from 'lucide-react';

import { ABILITIES } from './constants';
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

const ABILITIES_IN_TABLE_ORDER = [
  // Physical
  ABILITIES.STRENGTH,
  ABILITIES.COORDINATION,
  ABILITIES.HEALTH,
  // Mental
  ABILITIES.INTELLIGENCE,
  ABILITIES.WITS,
  ABILITIES.FOCUS,
  // Emotional
  ABILITIES.PRESENCE,
  ABILITIES.EMPATHY,
  ABILITIES.DETERMINATION,
]

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
    <div className='abilities-table'>
      {[...ABILITIES_IN_TABLE_ORDER].map((ability) => {
        return <div key={`${ability}-${abilitiesMap.get(ability)}`}>
          <AbilitiesCell
            ability={ability}
            value={abilitiesMap.get(ability)}
            triggerIncrement={() => props.triggerIncrementAbility(ability)}
            triggerDecrement={() => props.triggerDecrementAbility(ability)}
          ></AbilitiesCell>
        </div>
      })}
    </div>
  )
}
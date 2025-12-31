'use client'

import './AbilitiesTable.css';


import { ABILITIES } from './constants';
import { useCharacterCreatorContext } from './CharacterCreatorContext';
import { NumberInceDec } from './NumberIncDec';

interface AbilitiesCellProps {
  ability: string;
  level: number;
  triggerIncrement: () => void;
  triggerDecrement: () => void;
}

const AbilitiesCell = (props: AbilitiesCellProps) => {
  // TODO: move the inc/dec toggle into its own component, to be reused by Aspects
  return (
    <div className='abilities-cell'>
      <div>{props.ability}</div>
      <NumberInceDec
        value={props.level} // TODO props drilling smell
        triggerIncrement={props.triggerIncrement}
        triggerDecrement={props.triggerDecrement}
      />
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
  const characterState = useCharacterCreatorContext();

  return (
    <div className='abilities-table'>
      {[...ABILITIES_IN_TABLE_ORDER].map((ability) => {
        return <div key={`${ability}-${characterState.abilities.get(ability)}`}>
          <AbilitiesCell
            ability={ability}
            level={characterState.abilities.get(ability) ?? 0}
            triggerIncrement={() => props.triggerIncrementAbility(ability)}
            triggerDecrement={() => props.triggerDecrementAbility(ability)}
          ></AbilitiesCell>
        </div>
      })}
    </div>
  )
}
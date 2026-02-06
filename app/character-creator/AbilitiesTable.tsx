'use client'

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
  return (
    <div className="flex">
      {/* Ability name */}
      <div className="flex-[7]">{props.ability}</div>

      {/* Inc/dec component */}
      <div className="flex-[5]">
        <NumberInceDec
          value={props.level}
          triggerIncrement={props.triggerIncrement}
          triggerDecrement={props.triggerDecrement}
        />
      </div>
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

interface AbilitiesTableProps {
  availablePoints: number;
  triggerDecrementAbility: (ability: string) => void;
  triggerIncrementAbility: (ability: string) => void;
}

export const AbilitiesTable = (props: AbilitiesTableProps) => {
  const characterState = useCharacterCreatorContext();

  return (
    <div
      className="grid"
      style={{
        fontSize: '17px',
        gridTemplateColumns: 'repeat(3, 12em)',
        gridTemplateRows: 'repeat(3, 3em)',
        width: 'fit-content',
      }}
    >
      {ABILITIES_IN_TABLE_ORDER.map((ability) => (
        <div key={`${ability}-${characterState.abilities.get(ability)}`}>
          <AbilitiesCell
            ability={ability}
            level={characterState.abilities.get(ability) ?? 0}
            triggerIncrement={() => props.triggerIncrementAbility(ability)}
            triggerDecrement={() => props.triggerDecrementAbility(ability)}
          />
        </div>
      ))}
    </div>
  )
}

import './AbilitiesTable.css';

import { CircleMinus, CirclePlus } from 'lucide-react';

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

export interface AbilitiesTableProps {
  AbilitiesMap: Map<string, number>;
  // Is this level of detail in fn signature required/expected? What's best practice?
  incrementAbility: (ability: string) => void;
  decrementAbility: (ability: string) => void;
}

export const AbilitiesTable = (props: AbilitiesTableProps) => {
  const abilitiesMap = props.AbilitiesMap

  return (
    <div className='abilities-table'>
      {[...abilitiesMap].map((entry) => {
        return <div key={`${entry[0]}-${entry[1]}`}>
          <AbilitiesCell
            ability={entry[0]} value={entry[1]}
            increment={() => props.incrementAbility(entry[0])}
            decrement={() => props.decrementAbility(entry[0])}
          ></AbilitiesCell>
        </div>
      })}
    </div>
  )
}
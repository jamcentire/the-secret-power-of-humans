import './AbilitiesTable.css';

interface AbilitiesCellProps {
  ability: string,
  value: number
}

const AbilitiesCell = (props: AbilitiesCellProps) => {
  return (
    <div className='abilities-cell'>
      <div>{props.ability}</div>
      <div>{props.value}</div>
    </div>
  )
}

export interface AbilitiesTableProps {
  AbilitiesMap: Map<string, number>;
}

export const AbilitiesTable = (props: AbilitiesTableProps) => {
  const abilitiesMap = props.AbilitiesMap

  return (
    <div className='abilities-table'>
      {[...abilitiesMap].map((entry) => {
        return <div key={`${entry[0]}-${entry[1]}`}>
          <AbilitiesCell ability={entry[0]} value={entry[1]}></AbilitiesCell>
        </div>
      })}
    </div>
  )
}
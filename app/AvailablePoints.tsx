'use client'

import './AvailablePoints.css'

interface AvailablePointsProps {
  availablePoints: number
}

export const AvailablePoints = (props: AvailablePointsProps) => {
  return (
    <div className='available-points-container'>
      <div className='available-points-text'>Points to spend:</div>
      <div className='available-points-value'>{props.availablePoints}</div>
    </div>
  )
}

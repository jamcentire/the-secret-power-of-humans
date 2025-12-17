'use client'

import './AvailablePoints.css'

interface AvailablePointsProps {
  availablePoints: number
}

export const AvailablePoints = (props: AvailablePointsProps) => {
  return (
    <div className='available-points-box'>{props.availablePoints}</div>
  )
}

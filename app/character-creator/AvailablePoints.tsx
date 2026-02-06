'use client'

interface AvailablePointsProps {
  availablePoints: number
}

export const AvailablePoints = (props: AvailablePointsProps) => {
  return (
    <div className="flex items-center gap-[1.2em]">
      <div className="text-[1.8em]">Points remaining:</div>
      <div
        className="inline-flex items-center w-fit h-[0.6em] border-[0.12em] border-black text-[1.8em] rounded-[40%] p-[0.4em]"
      >
        {props.availablePoints}
      </div>
    </div>
  )
}

import { CircleMinus, CirclePlus } from 'lucide-react';

interface NumberIncDecProps {
  value: number;
  triggerIncrement: () => void;
  triggerDecrement: () => void;
}

export const NumberInceDec = (props: NumberIncDecProps) => {
  // TODO: move the inc/dec toggle into its own component, to be reused by Aspects
  return (
    <div className='flex flex-row items-center'>
      <CircleMinus
        className='basis-md hover:cursor-pointer'
        onClick={props.triggerDecrement}
      />
      <div className='basis-sm text-2xl text-center'
      >{props.value}</div>
      <CirclePlus
        className='basis-md hover:cursor-pointer'
        onClick={props.triggerIncrement}
      />
    </div>
  )
}


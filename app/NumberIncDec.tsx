import { CircleMinus, CirclePlus } from 'lucide-react';
import './NumberIncDec.css';

interface NumberIncDecProps {
  value: number;
  triggerIncrement: () => void;
  triggerDecrement: () => void;
}

export const NumberInceDec = (props: NumberIncDecProps) => {
  // TODO: move the inc/dec toggle into its own component, to be reused by Aspects
  return (
    <div className='number-inc-dec-cell'>
      <CircleMinus onClick={props.triggerDecrement}/>
      <div>{props.value}</div>
      <CirclePlus onClick={props.triggerIncrement}/>
    </div>
  )
}


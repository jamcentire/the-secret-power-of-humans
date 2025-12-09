'use client'

import React, { useState } from 'react';

import { ABILITIES } from './constants'

import './globals.css';
import './page.css';

import { AbilitiesTable, AbilitiesTableProps } from './AbilitiesTable'

export default function Home() {
  var defaultAbilitiesMap = new Map<string, number>(
    Object.values(ABILITIES).map((ability) => [ability, 0])
  )

  const [abilitiesMap, setAbilitiesMap] = useState(defaultAbilitiesMap)

  const incrementAbility = (ability: string): void => {
    console.log(`++${ability}`);
  }
  const decrementAbility = (ability: string): void => {
    console.log(`--${ability}`);
  }


  // Inefficient: currently causes rerender of whole table on every single ability update
  return (
    <>
      <h1 className='page-title'>Welcome to The Secret Power of Humans!</h1>
      <h2 className='page-subtitle'>A game about kicking ass and taking names</h2>
      <AbilitiesTable
        AbilitiesMap={abilitiesMap}
        incrementAbility={incrementAbility}
        decrementAbility={decrementAbility}
      ></AbilitiesTable>
    </>
  );
}

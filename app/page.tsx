'use client'

import './globals.css';
import './page.css';

import { AbilitiesCreator } from './AbilitiesCreator'
import { AspectsCreator } from './AspectsCreator'
import { CharacterCreatorContextProvider } from './CharacterCreatorContext';

export default function Home() {
  return (
    <>
      <h1 className='page-title'>Welcome to The Secret Power of Humans!</h1>
      <h2 className='page-subtitle'>A game about kicking ass and taking names</h2>
      <CharacterCreatorContextProvider children={
        <>
          <AbilitiesCreator></AbilitiesCreator>
          <AspectsCreator></AspectsCreator>
        </>
      }
      ></CharacterCreatorContextProvider>
    </>
  );
}

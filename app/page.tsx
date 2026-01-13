'use client'

import './globals.css';
import './page.css';

import { CharacterCreatorContextProvider } from './CharacterCreatorContext';
import { CharacterCreator } from './CharacterCreator';

export default function Home() {
  return (
    <>
      <h1 className='page-title'>Welcome to The Secret Power of Humans!</h1>
      <h2 className='page-subtitle'>A game about what ordinary people are capable of in extraordinary circumstances</h2>
      <CharacterCreatorContextProvider children={
        <CharacterCreator/>
      }
      ></CharacterCreatorContextProvider>
    </>
  );
}

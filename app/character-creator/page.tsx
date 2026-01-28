'use client'

import './page.css';

import { CharacterCreatorContextProvider } from './CharacterCreatorContext';
import { CharacterCreator } from './CharacterCreator';

// TODO Change CharacterCreation name to CharacterCreator (and refactor other instances
// of CharacterCreator)
export default function CharacterCreation() {
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

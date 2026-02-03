'use client'

import './page.css';

import { CharacterCreatorContextProvider } from './CharacterCreatorContext';
import { CharacterCreator } from './CharacterCreator';

// TODO Change CharacterCreation name to CharacterCreator (and refactor other instances
// of CharacterCreator)
export default function CharacterCreation() {
  return (
    <>
      <h1 className='page-title'>Create your character</h1>
      <CharacterCreatorContextProvider children={
        <CharacterCreator/>
      }
      ></CharacterCreatorContextProvider>
    </>
  );
}

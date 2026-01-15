import './globals.css';
import './CharacterCreator.css';

import { useState } from 'react';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

import { useCharacterCreatorContext, useCharacterCreatorDispatch } from './CharacterCreatorContext';
import { AbilitiesCreator } from './AbilitiesCreator'
import { AspectsCreator } from './AspectsCreator'
import { CharacterCreatorSection } from './CharacterCreatorSection'

interface ExplainerTextProps {
  title: string
  body: string
}

const ExplainerText = (props: ExplainerTextProps) => {
  return (
    <div className='explainer-text'>
      <div className='title'>
        {props.title}
      </div>
      <div className='body'>
        {props.body}
      </div>
    </div>
  )
}

interface NameInputProps {
  onNameChange: (newName: string) => void;
}

const NameInput = (props: NameInputProps) => {
  return (
    <div className='name-input'>
      <text>And what is this brave soul's name?</text>
      <input onChange={(e) => props.onNameChange(e.target.value)}/>
    </div>
  )
}

const createCharacter = async () => {
  const response = await fetch('/characters', { method: 'POST' })
  console.log(await response.text())
}

const fetchCharacters = async () => {
  const response = await fetch('/characters', { method: 'GET' })
  console.log(await response.text())
}

export const CharacterCreator = () => {
  const dispatch = useCharacterCreatorDispatch();
  const name = useCharacterCreatorContext().name;
  const [characterName, setCharacterName] = useState('');

  const createCharacter = () => {
    // TODO add checks for all points spent
    // TODO add alert modal (or other) for failed character creation attempt
    if (characterName.length === 0) {
      return
    }
    dispatch({
      type: 'name/create',
      payload: {name: characterName}
    })
    createCharacter();
  }

  return (
    <div className='character-creator'>
      <CharacterCreatorSection
        titleText={'Abilities'}
        bodyText={ABILITIES_TEXT}
        creator={<AbilitiesCreator/>}
      ></CharacterCreatorSection>
      <CharacterCreatorSection
        titleText={'Aspects'}
        bodyText={ASPECTS_TEXT}
        creator={<AspectsCreator/>}
      ></CharacterCreatorSection>
      <NameInput onNameChange={setCharacterName}/>
      <div className='create-character-button-container'>
        <button
          className='create-character-button'
          onClick={createCharacter}
        >Create Character!</button>
      </div>
      <div className='create-character-button-container'>
        <button
          className='get-characters-button'
          onClick={fetchCharacters}
        >Fetch Characters!</button>
      </div>

    </div>
  )
}

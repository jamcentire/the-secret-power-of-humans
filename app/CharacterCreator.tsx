import './globals.css';
import './CharacterCreator.css';

import { useEffect, useState } from 'react';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

import { supabase } from '@/lib/supabase/client';

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

const fetchSupaData = async (setData: any) => {
  const { data, error } = await supabase.from('characters').select()
  setData(data || {});
}


export const CharacterCreator = () => {
  const dispatch = useCharacterCreatorDispatch();
  const name = useCharacterCreatorContext().name;
  const [characterName, setCharacterName] = useState('');
  const [supaData, setSupaData] = useState({});

  // useEffect(() => {
  //   console.log('herp')
  //   fetchSupaData(setSupaData)
  // })

  const logSupaData = () => {
    console.log(supaData)
  }

  const triggerCreateCharacter = () => {
    // TODO add checks for all points spent
    // TODO add alert modal (or other) for failed character creation attempt

    // if (characterName.length === 0) {
    //   return
    // }
    // dispatch({
    //   type: 'name/create',
    //   payload: {name: characterName}
    // })
    // createCharacter();

    console.log(supaData)
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
          onClick={() => fetchSupaData(setSupaData)}
        >Create Character!</button>
      </div>
      <div className='create-character-button-container'>
        <button
          className='get-characters-button'
          onClick={logSupaData}
        >Fetch Characters!</button>
      </div>

    </div>
  )
}

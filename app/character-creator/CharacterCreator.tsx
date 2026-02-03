import './CharacterCreator.css';

import { useEffect, useState } from 'react';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

import { supabase } from '@/lib/supabase/client';
import { CharacterData } from './CharacterCreatorContext';

import { useCharacterCreatorContext, useCharacterCreatorDispatch } from './CharacterCreatorContext';
import { AbilitiesCreator } from './AbilitiesCreator'
import { AspectsCreator } from './AspectsCreator'
import { CharacterCreatorSection } from './CharacterCreatorSection'


interface NameInputProps {
  onNameChange: (newName: string) => void;
}

const NameInput = (props: NameInputProps) => {
  return (
    <div className='name-input'>
      <div>And what is this brave soul's name?</div>
      <input onChange={(e) => props.onNameChange(e.target.value)}/>
    </div>
  )
}


const fetchCharacterData = async (setCharacterData: any) => {
  // TODO: this should be part of a parent function that also plugs characters into local state somewhere
  //       (or maybe should just have a separate component that automatically renders chars in state)
  // TODO: This should eventually run automatically on initial page load. It should eventually eventually
  //       be accessible through a different "My Characters" tab/page
  console.log('Dummy character data fetch (from db)!');
  // const { data, error } = await supabase.from('characters').select()
  // setCharacterData(data || {});
}


export const CharacterCreator = () => {
  const dispatch = useCharacterCreatorDispatch();
  const charData = useCharacterCreatorContext();
  const [characterName, setCharacterName] = useState('');

  // TODO Eventually move this to helper file (?)
  const convertCharacterDataToObject = () => {
    return {
      name: charData.name,
      abilities: Object.fromEntries(charData.abilities),
      aspects: Object.fromEntries(charData.aspects),
      archetype: null
    }
  }

  const saveCharacterToDb = async () => {
    console.log('Dummy character save (to db)!')
    // const {error} = await supabase.from('characters').insert({
    //   'id': 8,
    //   'name': 'test send data name',
    //   'player_id': 664,
    //   'data': convertCharacterDataToObject()
    // })
    // console.log(error)
  }

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

    saveCharacterToDb()
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
          onClick={() => fetchCharacterData(() => {})}
        >Fetch Characters!</button>
      </div>

    </div>
  )
}

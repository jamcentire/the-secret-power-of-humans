import { useEffect, useState } from 'react';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

import { supabase } from '@/lib/supabase/client';
import { CharacterData } from './CharacterCreatorContext';

import { useCharacterCreatorContext, useCharacterCreatorDispatch } from './CharacterCreatorContext';
import { AbilitiesCreator } from './AbilitiesCreator';
import { AspectsCreator } from './AspectsCreator';
import { CharacterCreatorSection } from './CharacterCreatorSection';

interface NameInputProps {
  onNameChange: (newName: string) => void;
}

const NameInput = (props: NameInputProps) => {
  return (
    <div className="flex items-center gap-[5%] w-1/2 pl-[5%] text-lg">
      <div>And what is this brave soul's name?</div>
      <input
        className="p-2" // 0.5em ≈ 2 tailwind padding units
        onChange={(e) => props.onNameChange(e.target.value)}
      />
    </div>
  );
};

const fetchCharacterData = async (setCharacterData: any) => {
  console.log('Dummy character data fetch (from db)!');
  // const { data, error } = await supabase.from('characters').select()
  // setCharacterData(data || {});
};

export const CharacterCreator = () => {
  const dispatch = useCharacterCreatorDispatch();
  const charData = useCharacterCreatorContext();
  const [characterName, setCharacterName] = useState('');

  const convertCharacterDataToObject = () => {
    return {
      name: charData.name,
      abilities: Object.fromEntries(charData.abilities),
      aspects: Object.fromEntries(charData.aspects),
      archetype: null,
    };
  };

  const saveCharacterToDb = async () => {
    console.log('Dummy character save (to db)!');
    // const {error} = await supabase.from('characters').insert({
    //   'id': 8,
    //   'name': 'test send data name',
    //   'player_id': 664,
    //   'data': convertCharacterDataToObject()
    // })
    // console.log(error)
  };

  const createCharacter = () => {
    if (characterName.length === 0) return;

    dispatch({
      type: 'name/create',
      payload: { name: characterName },
    });

    saveCharacterToDb();
  };

  return (
    <div className="flex flex-col gap-[10em] w-[65%] mx-auto pt-16 pb-[10em]">
      {/* Abilities Section */}
      <CharacterCreatorSection
        titleText="Abilities"
        bodyText={ABILITIES_TEXT}
        creator={<AbilitiesCreator />}
      />

      {/* Aspects Section */}
      <CharacterCreatorSection
        titleText="Aspects"
        bodyText={ASPECTS_TEXT}
        creator={<AspectsCreator />}
      />

      {/* Name Input */}
      <NameInput onNameChange={setCharacterName} />

      {/* Buttons */}
      <div className="flex justify-center">
        <button
          className="w-1/5 text-lg p-2"
          onClick={createCharacter}
        >
          Create Character!
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className="w-1/5 text-lg p-2"
          onClick={() => fetchCharacterData(() => {})}
        >
          Fetch Characters!
        </button>
      </div>
    </div>
  );
};

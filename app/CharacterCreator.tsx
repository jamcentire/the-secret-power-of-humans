import './globals.css';
import './CharacterCreator.css';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

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

export const CharacterCreator = () => {
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
    </div>
  )
}

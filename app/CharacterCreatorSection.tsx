import './globals.css';
import './CharacterCreatorSection.css';

import { ASPECTS_TEXT, ABILITIES_TEXT } from './Text';

import { AbilitiesCreator } from './AbilitiesCreator'
import { AspectsCreator } from './AspectsCreator'

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

interface CharacterCreatorSectionProps {
  titleText: string
  bodyText: string
  creator: React.ReactNode
}

export const CharacterCreatorSection = (props: CharacterCreatorSectionProps) => {
  return (
    <div className='character-creator-section'>
      <ExplainerText title={props.titleText} body={props.bodyText}/>
      <div>{props.creator}</div>
    </div>
  );
}


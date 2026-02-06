interface ExplainerTextProps {
  title: string;
  body: string;
}

const ExplainerText = (props: ExplainerTextProps) => {
  return (
    <div className="flex flex-col text-left px-8 whitespace-pre-wrap gap-4">
      <div className="text-4xl">{props.title}</div>
      <div className="text-base">{props.body}</div>
    </div>
  );
};

interface CharacterCreatorSectionProps {
  titleText: string;
  bodyText: string;
  creator: React.ReactNode;
}

export const CharacterCreatorSection = (props: CharacterCreatorSectionProps) => {
  return (
    <div className="flex justify-center gap-[5%]">
      {/* Explainer Text */}
      <div className="flex-1">
        <ExplainerText title={props.titleText} body={props.bodyText} />
      </div>

      {/* Creator component */}
      <div className="flex-2">
        {props.creator}
      </div>
    </div>
  );
};

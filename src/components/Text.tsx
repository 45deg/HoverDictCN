
import React, { useState } from 'react';
import EntryPopover from './EntryPopover';
import expandWord from '../util/expandWord';
import CEDict from '../CEDict';

type Props = React.TextareaHTMLAttributes<HTMLDivElement> & {
  text: string
};

const Text: React.FC<Props> = (props) => {
  const [char, setChar] = useState(undefined as HTMLElement | undefined);

  return <>
    <div {...props}
      className="textview border mt-3 p-3"
      onMouseOver={e => {
        let target = e.target as HTMLElement;
        if (target.tagName === 'SPAN') {
          setChar(target);
        }
      }}
      onMouseOut={() => setChar(undefined)}
    >
      {
        props.text.split('').map((c, i) => {
          let attr = { 'data-index': i };
          if (c === '\n')
            return <br />
          else
            return <span {...attr}>{c}</span>;
        })
      }
    </div>
    <CEDict.Context.Consumer>{db =>
      <EntryPopover
        target={char}
        db={db}
        words={
          char ?
            expandWord(props.text, parseInt(char.dataset.index!), 5)
            : []} />
    }</CEDict.Context.Consumer>
  </>;
}

export default Text;

import React, { useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

type Props = React.TextareaHTMLAttributes<HTMLDivElement> & {
  text: string
};

const Text: React.FC<Props> = (props) => {
  const [char, setChar] = useState(undefined as HTMLElement | undefined);
  const [showTooltip, setShowTooltip] = useState(false);

  return <>
    <div {...props}
      className="textview border mt-3 p-3"
      onMouseOver={e => {
        let target = e.target as HTMLElement;
        if (target.tagName === 'SPAN') {
          setChar(target);
          setShowTooltip(true);
        }
      }}
      onMouseOut={() => setShowTooltip(false)}
    >
      {
        props.text.split('').map(c => {
          if (c === '\n')
            return <br />
          else
            return <span>{c}</span>;
        })
      }
    </div>
    <Overlay
      target={char} show={showTooltip}
      placement="bottom">
      <Popover id="overlay-example">
        {char ? char.textContent : ''}
      </Popover>
    </Overlay>
  </>;
}

export default Text;
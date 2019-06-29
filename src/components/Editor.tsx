
import React, { useEffect, useRef } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  text: string
};

const Editor: React.FC<Props> = (props) => {
  let textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return <textarea {...props}
    rows={props.text.split('\n').length}
    ref={textareaRef}
    value={props.text}
    className="form-control mt-3 p-3" />;
}

export default Editor;
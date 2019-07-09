
import React, { useEffect, useRef } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  text: string
};

const Editor: React.FC<Props> = ({ text, ...props }) => {
  let textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return <textarea {...props}
    rows={text.split('\n').length}
    ref={textareaRef}
    value={text}
    className="texteditor" />;
}

export default Editor;
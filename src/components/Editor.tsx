
import React, { useEffect, useRef } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  text: string,
  focus?: number
};

const Editor: React.FC<Props> = ({ text, focus, ...props }) => {
  let textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (focus !== undefined && textareaRef.current) {
      textareaRef.current.setSelectionRange(focus, focus);
    }
  }, [focus]);

  return <textarea {...props}
    rows={text.split('\n').length}
    ref={textareaRef}
    value={text}
    className="texteditor" />;
}

export default Editor;
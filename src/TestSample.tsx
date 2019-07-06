

import React, { useState, useRef } from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import { debounce } from 'lodash';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
const ANNOTATION_TYPE = 'character';

type JaggedText = string[][];

const TestSample: React.FC = () => {
  const [value, setValue] = useState(Plain.deserialize(''));
  const editorRef = useRef<Editor>(null);
  const [text, setText] = useState<JaggedText>([]);
  const [char, setChar] = useState<HTMLElement | undefined>();

  const addAnnotations = debounce(() => {
    const editor = editorRef.current;
    const { document, annotations } = editor.value;

    let jaggedText: JaggedText = [];
    editor.withoutSaving(() => {
      for (let ann of annotations.values()) {
        if (ann.get('type') === ANNOTATION_TYPE) {
          editor.removeAnnotation(ann)
        }
      }

      let line = 0;
      for (const [node, path] of document.texts()) {
        const { key, text } = node;
        const parts = text.split('');

        let col = 0;
        for (let part of parts) {
          editor.addAnnotation({
            key: `${line}:${col}-${part}`,
            type: ANNOTATION_TYPE,
            anchor: { path, key, offset: col },
            focus: { path, key, offset: col + 1 },
            data: { line, col }
          });
          col++;
        }

        jaggedText.push(parts);
        line++;
      }

      setValue(editor.value);
      setText(jaggedText);
    });
  }, 1000);

  const renderAnnotation = (props, editor, next) => {
    const { children, annotation, attributes, text } = props;
    const { type, data } = annotation;

    if (type === ANNOTATION_TYPE && text !== '') {
      return (
        <span {...attributes}
          className="char" data-pos={`${data.get('line')}:${data.get('col')}`}>
          {children}
        </span>
      )
    } else {
      return next()
    }
  };


  return <>
    <div
      onMouseOver={e => {
        let target = e.target as HTMLElement;
        let parent = target.parentNode as HTMLElement;
        if (parent && parent.className === 'char') {
          setChar(parent);
        }
      }}
      onMouseOut={() => setChar(undefined)}>
      <Editor ref={editorRef} value={value}
        renderAnnotation={renderAnnotation}
        onChange={({ value }) => { addAnnotations(); setValue(value) }}
        spellCheck={false}
      ></Editor>
    </div>
    <Overlay target={char} show={char !== undefined} placement="bottom">
      {props => {
        if (!char || !char.dataset) return <></>;
        let [l, c] = char.dataset.pos!.split(':').map(e => parseInt(e));
        return <Tooltip id="overlay-example" {...props}>
          {text[l].slice(c - 2, c + 2)}
        </Tooltip>
      }}
    </Overlay>
  </>;
};

export default TestSample;

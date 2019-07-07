

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Editor as Slate } from 'slate-react';
import { Annotation } from 'slate';
import { Map as IMap } from 'immutable';
import Plain from 'slate-plain-serializer';
import { throttle } from 'lodash';

const ANNOTATION_TYPE = 'character';
const HIGHLIGHT_TYPE = 'highlight';

export type JaggedText = string[][];

export type CharPosition = {
  line: number,
  column: number
}

export type OnChangeArgument = {
  target: HTMLElement,
  text: JaggedText
} & CharPosition | null;

type Props = {
  onChange?: (e: OnChangeArgument) => void,
  highlight?: [CharPosition, CharPosition] | null
};

const Editor: React.FC<Props> = ({ onChange, highlight, ...props }) => {
  const [value, setValue] = useState(Plain.deserialize(''));
  const editorRef = useRef<Slate>(null);
  const [text, setText] = useState<JaggedText>([]);
  const [char, setChar] = useState<HTMLElement | undefined>();

  useEffect(() => {
    if (onChange) {
      if (!char || !char.dataset.pos) {
        onChange(null);
      } else {
        let m = char.dataset.pos.match(/(\d+):(\d+)/)!;
        let line = parseInt(m[1]);
        let column = parseInt(m[2]);
        onChange({ text: text, target: char, line, column });
      }
    }
  }, [text, char]);

  useEffect(() => {
    if (!highlight) return;
    const { document } = value;
    const [begin, end] = highlight;
    const [node, path] = [...document.texts()][begin.line];

    let annotation = Annotation.create({
      key: HIGHLIGHT_TYPE,
      type: HIGHLIGHT_TYPE,
      anchor: { path, key: node.key, offset: begin.column },
      focus: { path, key: node.key, offset: end.column + 1 },
    });

    let annotations = value.get('annotations').set(HIGHLIGHT_TYPE, annotation);
    setValue(value.set('annotations', annotations));
  }, [highlight]);

  const handleChange = ({ value }) => {
    const { document } = value;

    let jaggedText: JaggedText = [];
    let line = 0;
    let annotationsProp: any = [];

    for (const [node, path] of document.texts()) {
      const { key, text } = node;
      const parts = text.split('');

      let col = 0;
      for (let part of parts) {
        annotationsProp.push({
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

    let annotations = IMap(
      annotationsProp.map(e => [e.key, Annotation.create(e)]));
    value = value.set('annotations', annotations);

    setText(jaggedText);
    setValue(value);
  };

  const renderAnnotation = (props, editor, next) => {
    const { children, annotation, attributes, text } = props;
    const { type, data } = annotation;

    if (type === ANNOTATION_TYPE && text !== '') {
      return (
        <span {...attributes}
          className="char" data-pos={`${data.get('line')}:${data.get('col')}`}>
          {children}
        </span>
      );
    } else if (type === HIGHLIGHT_TYPE) {
      return <span {...attributes}
        className="highlight">
        {children}
      </span>;
    } else {
      return next()
    }
  };

  const handleMouseOver = throttle((target: HTMLElement) => {
    let parent = target.parentNode as HTMLElement;
    if (parent && parent.className === 'char') {
      setChar(parent);
    }
  }, 100);

  return <div lang="zh-CN" className="editor p-3" {...props}
    onMouseOver={useCallback(e => handleMouseOver(e.target), [])}
    onMouseOut={() => setChar(undefined)}>
    <Slate ref={editorRef} value={value}
      renderAnnotation={renderAnnotation}
      onChange={handleChange}
      spellCheck={false}
    />
  </div>;
};

export default Editor;

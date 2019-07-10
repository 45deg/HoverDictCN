
import React, { useState, useEffect } from 'react';
import EntryPopover from './EntryPopover';
import expandWord, { WordsWithIndex } from '../util/expandWord';
import CEDict, { Entry } from '../CEDict';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  text: string,
  onCharFocus?: (index: number | undefined) => any
};

const TextWithContext: React.FC<Props & { db: CEDict }> = ({ db, text, onCharFocus, ...props }) => {
  const [char, setChar] = useState(undefined as HTMLElement | undefined);
  const [entries, setEntries] = useState([] as (Entry & WordsWithIndex)[]);
  const [highlight, setHighlight] = useState(undefined as WordsWithIndex | undefined);

  const index = (char && char.dataset.index !== undefined) ? parseInt(char.dataset.index) : undefined;

  useEffect(() => {
    const query = async () => {
      let ents = [] as (Entry & WordsWithIndex)[];

      if (typeof index !== 'number') return;
      let words = expandWord(text, index, 8);
      for (let w of words) {
        let results =
          await db.entries.where('word').equals(w.word).toArray();
        let resultsWithIndex = results.map(e => ({ ...e, ...w }));
        ents = [...ents, ...resultsWithIndex];
      }
      ents = ents.sort((a, b) => b.word.length - a.word.length);
      setHighlight(ents[0]);
      setEntries(ents);
    };
    query();
    return () => { };
  }, [db, text, char, index]);

  return <>
    <div {...props}
      className="textview"
      onMouseOver={e => {
        let target = e.target as HTMLElement;
        if (target.tagName === 'SPAN') {
          setChar(target);
        }
      }}
      onMouseOut={() => setChar(undefined)}
      onClick={e => {
        onCharFocus && onCharFocus(index);
        props.onClick && props.onClick(e);
      }}
    >
      {
        text.split('').map((c, i) => {
          let attr = { 'data-index': i, className: '' };

          if (highlight && highlight.begin <= i && i <= highlight.end) {
            attr.className = 'highlight';
          }

          if (c === '\n')
            return <br key={c + i} />;
          else
            return <span {...attr} key={c + i}>{c}</span>;
        })
      }
    </div>
    <EntryPopover
      target={char}
      entries={entries} />
  </>;
}

const Text: React.FC<Props> = (props) => {
  return <CEDict.Context.Consumer>{db =>
    <TextWithContext {...props} db={db} />
  }</CEDict.Context.Consumer>;
};

export default Text;
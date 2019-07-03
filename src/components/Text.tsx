
import React, { useState, useEffect } from 'react';
import EntryPopover from './EntryPopover';
import expandWord, { WordsWithIndex } from '../util/expandWord';
import CEDict, { Entry } from '../CEDict';

type Props = React.TextareaHTMLAttributes<HTMLDivElement> & {
  text: string
};

const TextWithContext: React.FC<Props & { db: CEDict }> = ({ db, text }, props) => {
  const [char, setChar] = useState(undefined as HTMLElement | undefined);
  const [entries, setEntries] = useState([] as (Entry & WordsWithIndex)[]);
  const [highlight, setHighlight] = useState(undefined as WordsWithIndex | undefined);

  useEffect(() => {
    const query = async () => {
      let ents = [] as (Entry & WordsWithIndex)[];

      if (char === undefined || char.dataset.index === undefined) return;
      let index = parseInt(char.dataset.index);
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
  }, [text, char]);

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
        text.split('').map((c, i) => {
          let attr = { 'data-index': i, className: '' };

          if (highlight && highlight.begin <= i && i <= highlight.end) {
            attr.className = 'highlight';
          }

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
        entries={entries} />
    }</CEDict.Context.Consumer>
  </>;
}

const Text: React.FC<Props> = (props) => {
  return <CEDict.Context.Consumer>{db =>
    <TextWithContext {...props} db={db} />
  }</CEDict.Context.Consumer>;
};

export default Text;
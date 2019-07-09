
import React, { useState } from 'react';
import EntryPopover from './EntryPopover';
import expandWord, { WordsWithIndex } from '../util/expandWord';
import CEDict, { Entry } from '../CEDict';
import Editor, { OnChangeArgument, CharPosition } from './Editor';

type Props = React.TextareaHTMLAttributes<HTMLDivElement>;

const TextWithContext: React.FC<Props & { db: CEDict }> = ({ db }, props) => {
  const [char, setChar] = useState<HTMLElement | undefined>(undefined);
  const [entries, setEntries] = useState<(Entry & WordsWithIndex)[]>([]);
  const [highlight, setHighlight] = useState<[CharPosition, CharPosition] | null>(null);

  const handleChange = (e: OnChangeArgument) => {
    if (!e) return;
    let { text, target, line, column } = e;
    const query = async () => {
      let ents = [] as (Entry & WordsWithIndex)[];
      let words = expandWord(text[line].join(''), column, 8);
      for (let w of words) {
        let results =
          await db.entries.where('word').equals(w.word).toArray();
        let resultsWithIndex = results.map(e => ({ ...e, ...w }));
        ents = [...ents, ...resultsWithIndex];
      }
      ents = ents.sort((a, b) => b.word.length - a.word.length);
      let first = ents[0];
      if (first) {
        setHighlight([{ line, column: first.begin }, { line, column: first.end }]);
      } else {
        setHighlight(null);
      }
      setEntries(ents);
      setChar(target);
    };
    query();
  };

  return <>
    <Editor onChange={handleChange} highlight={highlight} />
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
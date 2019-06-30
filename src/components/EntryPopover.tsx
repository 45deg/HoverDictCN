import React, { useEffect, useState } from 'react';

import Overlay, { OverlayProps } from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';
import CEDict, { Entry } from '../CEDict';

import './EntryPopover.css';

type Props = OverlayProps & {
  words: string[],
  db: CEDict
};

const EntryPopover: React.FC<Props> = ({ words, db, ...props }) => {
  const [entries, setEntries] = useState([] as Entry[]);

  useEffect(() => {
    const query = async () => {
      let ents = [] as Entry[];
      for (let w of words) {
        let result =
          await db.entries.where('word').equals(w).toArray();
        ents = [...ents, ...result];
      }
      setEntries(ents);
    };
    query();
  }, [words]);

  return <Overlay {...props}
    show={entries.length > 0}
    placement="bottom">
    <Popover id="popover">
      <Table striped bordered size="sm"><tbody>
        {entries.sort((a, b) => b.word.length - a.word.length).map(e =>
          <tr>
            <td>
              <ruby>
                {e.word}<rt>{e.pinyin}</rt>
              </ruby>
            </td>
            <td>
              <div className="description">{e.description}</div>
            </td>
          </tr>
        )}
      </tbody></Table>
    </Popover>
  </Overlay >
}

export default EntryPopover;
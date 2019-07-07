import React from 'react';

import Overlay, { OverlayProps } from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';
import { Entry } from '../CEDict';

import './EntryPopover.css';
import Pinyin from './Pinyin';
import Description from './Description';

type Props = OverlayProps & {
  entries: Entry[]
};

const EntryPopover: React.FC<Props> = ({ entries, ...props }) => {
  return <Overlay {...props}
    show={entries.length > 0}
    transition={false}
    placement="bottom">
    <Popover id="popover">
      <Table bordered size="sm"><tbody>
        {entries.map((e, i) =>
          <tr className={i === 0 ? 'highlight' : ''}>
            <td><Pinyin hanzi={e.word} pinyin={e.pinyin} /></td>
            <td><Description text={e.description} /></td>
          </tr>
        )}
      </tbody></Table>
    </Popover>
  </Overlay >
}

export default EntryPopover;
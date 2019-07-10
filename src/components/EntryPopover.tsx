import React from 'react';

import Overlay, { OverlayProps } from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Table from 'react-bootstrap/Table';
import isTouchDevice from 'is-touch-device';
import { Entry } from '../CEDict';

import './EntryPopover.css';
import Pinyin from './Pinyin';
import Description from './Description';

type Props = OverlayProps & {
  entries: Entry[]
};

const TargetPopover: React.FC<Props> = ({ entries, ...props }) => {
  return (<Overlay {...props}
    show={entries.length > 0}
    placement="bottom"
    popperConfig={{ modifiers: { preventOverflow: { enabled: false }, hide: { enabled: false } } }}>
    <Popover id="popover">
      {props.children}
    </Popover>
  </Overlay>);
};

const FixedPopover: React.FC<Props> = ({ entries, ...props }) => {
  return <div className="fixed-popover">
    {props.children}
  </div>;
};

const EntryPopover: React.FC<Props> = ({ entries, ...props }) => {

  const EntryWrapper = isTouchDevice() ? FixedPopover : TargetPopover;

  return <EntryWrapper entries={entries} {...props}>
    <Table size="sm" className="m-0"><tbody>
      {entries.map((e, i) =>
        <tr className={i === 0 ? 'highlight' : ''} key={`${i}:${e}`}>
          <th lang="cn"><Pinyin hanzi={e.word} pinyin={e.pinyin} /></th>
          <td><Description text={e.description} /></td>
        </tr>
      )}
    </tbody></Table>
  </EntryWrapper>;
}

export default EntryPopover;
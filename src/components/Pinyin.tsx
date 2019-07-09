import React, { Fragment } from 'react';
import pinyinify from '../util/pinyinify';

type Props = React.HTMLAttributes<HTMLElement> & {
  hanzi?: string,
  pinyin: string
};

const Pinyin: React.FC<Props> = ({ hanzi, pinyin, ...props }) => {
  if (hanzi) {
    let hs = hanzi.split('');
    let ps = pinyin.split(' ');
    return <ruby {...props}>
      {hs.map((h, i) =>
        <Fragment key={`${i}:${h}`}>{h}<rt>{pinyinify(ps[i])}</rt></Fragment>
      )}
    </ruby>;
  } else {
    return <>{pinyinify(pinyin)}</>;
  }
};

export default Pinyin;
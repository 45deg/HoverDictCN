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
    return <ruby {...props} lang="zh">
      {hs.map((h, i) =>
        <>{h}<rt>{pinyinify(ps[i])}</rt></>
      )}
    </ruby>;
  } else {
    return <>{pinyinify(pinyin)}</>;
  }
};

export default Pinyin;
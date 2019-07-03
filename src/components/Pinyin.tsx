import React from 'react';
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
        <>{h}<rt key={h + ps[i]}>{pinyinify(ps[i])}</rt></>
      )}
    </ruby>;
  } else {
    return <>pinyinify(pinyin)</>;
  }
};

export default Pinyin;
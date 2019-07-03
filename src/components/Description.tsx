import React from 'react';
import devideRefWord from '../util/devideRefWord';
import Pinyin from './Pinyin';

type Props = React.HTMLAttributes<HTMLElement> & {
  text: string
};

const Description: React.FC<Props> = ({ text, ...props }) => {
  return <div className="description" {...props}>{
    devideRefWord(text).map(s => {
      if (typeof s === 'string') {
        return s;
      } else {
        let [hz1, hz2, py] = s;
        return <Pinyin hanzi={hz1} pinyin={py} />;
      }
    })
  }</div>
};

export default Description;
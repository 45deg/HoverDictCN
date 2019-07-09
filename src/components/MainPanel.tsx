import React, { useState } from 'react';
import Editor from './Editor';
import Text from './Text';

const initialText = [
  'Welcome to ヨォドォバァシィカァメェラ。', // debug for non-chinese chars
  '亲爱的顾客朋友、你们好。',
  '衷心欢迎您光临友都八喜。友都­八喜是日本著名的大型购物中心。',
  '精明商品将近一百万种、数码相机、摄像机、名牌手表、­化妆品、电子游戏、名牌箱包等应有尽有。',
  '最新的款式、最优惠的价格、最优质的服务。'
].join('\n');

enum Mode {
  Edit = 1,
  Show
}

const MainPanel: React.FC = () => {

  const [mode, setMode] = useState(Mode.Show);
  const [text, setText] = useState(initialText);
  const [index, setIndex] = useState<number | undefined>(undefined);

  if (mode === Mode.Edit) {
    return <>
      <Editor lang="zh"
        onChange={e => setText(e.target.value)}
        onBlur={e => { setMode(Mode.Show) }}
        text={text}
        focus={index} />
    </>;
  } else {
    return <>
      <Text lang="zh" onClick={e => { setMode(Mode.Edit) }} text={text}
        onCharFocus={i => setIndex(i)} />
    </>;
  }
}

export default MainPanel;

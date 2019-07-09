import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CEDict from './CEDict';
import DBStatus from './components/DBStatus';
import Text from './components/Text';
import Editor from './components/Editor';

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

const MODE_LABEL = {
  [Mode.Edit]: "OK",
  [Mode.Show]: "Edit"
}

const App: React.FC = () => {
  const [mode, setMode] = useState(Mode.Show);
  const [text, setText] = useState(initialText);
  const [index, setIndex] = useState<number | undefined>(undefined);

  let toggleMode = () => {
    if (mode === Mode.Show) {
      setMode(Mode.Edit);
    } else {
      setMode(Mode.Show);
    }
  }

  return <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">HoverDictCN</Navbar.Brand>
      <DBStatus />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {
            <Button variant="outline-light" onMouseDown={toggleMode}>{MODE_LABEL[mode]}</Button>
          }
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Container>
      <CEDict.Context.Provider value={new CEDict()}>
        {(mode === Mode.Edit) ? <Editor lang="zh"
          onChange={e => setText(e.target.value)}
          onBlur={e => { setMode(Mode.Show); }}
          text={text}
          focus={index} />
          : <Text lang="zh" onClick={e => { setMode(Mode.Edit) }} text={text}
            onCharFocus={i => setIndex(i)} />}
      </CEDict.Context.Provider>
    </Container>
  </>;
}

export default App;

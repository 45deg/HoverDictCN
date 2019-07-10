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
  '输入中文', '',
  '知天之所为,知人之所为者,至矣。',
  '知天之所为者,天而生也；知人之所为者,以其知之所知以养其知之所不知,终其天年而不中道夭者:是知之盛也。'
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

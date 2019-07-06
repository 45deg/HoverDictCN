import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import MainPanel from './components/MainPanel';

import CEDict from './CEDict';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InitDBModal from './components/InitDBModal';
import TestSample from './TestSample';

const App: React.FC = () => {

  return <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">HoverDictCN</Navbar.Brand>
    </Navbar>
    <Container>
      {/*<CEDict.Context.Provider value={new CEDict()}>
        <InitDBModal />
        <MainPanel />
      </CEDict.Context.Provider>*/
      }
      <TestSample></TestSample>
    </Container>
  </>;
}

export default App;

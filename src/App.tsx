import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import MainPanel from './components/MainPanel';

import CEDict from './CEDict';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InitDBModal from './components/InitDBModal';

const App: React.FC = () => {

  return <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">HoverDictCN</Navbar.Brand>
    </Navbar>
    <Container className="p-0">
      <CEDict.Context.Provider value={new CEDict()}>
        <InitDBModal />
        <MainPanel />
      </CEDict.Context.Provider>
    </Container>
  </>;
}

export default App;

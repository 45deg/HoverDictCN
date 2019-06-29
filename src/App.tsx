import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import MainPanel from './components/MainPanel';

import Dexie from 'dexie';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {

  return <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">HoverDictCN</Navbar.Brand>
    </Navbar>
    <Container>
      <MainPanel />
    </Container>
  </>;
}

export default App;

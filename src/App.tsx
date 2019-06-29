import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Editor from './components/Editor';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">HoverDictCN</Navbar.Brand>
    </Navbar>
    <Container>
      <Editor />
    </Container>
  </>;
}

export default App;

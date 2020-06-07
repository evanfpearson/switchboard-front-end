import React from 'react';
import './App.css';
import SwitchboardRouter from "./Router";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

function App() {
  return (
      <>
        <Navbar bg="light">
          <Navbar.Brand href="#home">Switchboard</Navbar.Brand>
        </Navbar>
        <br/>
        <Container fluid>
          <Row>
            <Col/>
            <Col>
              <SwitchboardRouter/>
            </Col>
            <Col/>
          </Row>
        </Container>
      </>
  );
}

export default App;

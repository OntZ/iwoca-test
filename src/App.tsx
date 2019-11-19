import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled  from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title>Styled components works</Title>
      </header>
    </div>
  );
}

export default App;

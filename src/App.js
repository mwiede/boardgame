import React from 'react';
import logo from './logo.svg';
import './App.css';
import Spiel from './Spiel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />   
      </header>
      <main>
        <h1>Feuerwehrmann Sam</h1>
        <Spiel/>      
      </main>
    </div>
  );
}

export default App;

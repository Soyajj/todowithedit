import React from 'react';
import './App.css';
import './components/Mainpage.css'
import Mainpage from './components/Mainpage';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Mainpage />
    </div>
  );
}

export default App;

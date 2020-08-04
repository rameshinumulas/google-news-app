import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewsApi } from './components/Googleapi';

function App() {
  return (
    <div className="App">
  <NewsApi />
    </div>
  );
}

export default App;

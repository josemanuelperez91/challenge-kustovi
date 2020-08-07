import React from 'react';
import Editor from '../components/Editor/Editor';
import Grids from '../components/Grids/Grids';

import './App.css';

function App() {
  return (
    <div className="App">
      <Editor />
      <hr></hr>
      <Grids />
    </div>
  );
}

export default App;

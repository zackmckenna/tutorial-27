import React, { useEffect } from 'react';
import logo from './mintbean.png';
import './styles/index.css';

import CameraFeed from './components/CameraFeed'
import MintNav from './components/MintNav'

const App = () => {

  return (
    <>
    <MintNav />
    <div className="App">
      Camera Browser API Tutorial
      <CameraFeed />
    </div>
    </>
  );
}

export default App;

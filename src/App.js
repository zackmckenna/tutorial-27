import React, { useEffect } from 'react';
import logo from './mintbean.png';
import './styles/index.css';
import CameraFeed from './components/CameraFeed'

const App = () => {

  return (
    <div className="App">
          <h1>Image capture test</h1>
          <CameraFeed />
    </div>
  );
}

export default App;

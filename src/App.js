import React from 'react'
import './styles/index.css'

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
  )
}

export default App

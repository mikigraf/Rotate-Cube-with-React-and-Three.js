import React from 'react';
import logo from './logo.svg';
import './App.css';
import Shape from './components/Shape'

import 'aframe'
import { Scene } from 'react-aframe-ar'
function App() {
  return (
    <Scene>
      <Shape />
    </Scene>
  );
}

export default App;

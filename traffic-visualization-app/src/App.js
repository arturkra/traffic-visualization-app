import './App.css';
import React from 'react';
import Map from './Components/Map';
import {VechicleArrayContextProvider } from './Components/Context/VechicleArrayContext';



function App() {

  return (
    <VechicleArrayContextProvider>
      <Map/>
    </VechicleArrayContextProvider>
  );
}

export default App;

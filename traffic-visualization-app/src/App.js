import './App.css';
import React from 'react';
import Map from './Components/Map';
import {VechicleArrayContextProvider } from './Components/Context/VechicleArrayContext';
import OptionsBar from './Components/optionsBar';
import { DisplayedVechiclesContextProvider } from './Components/Context/DisplayedVechiclesContext';



function App() {

  return (
    <VechicleArrayContextProvider>
      <DisplayedVechiclesContextProvider>
        <OptionsBar/>
        <Map/>
      </DisplayedVechiclesContextProvider>
    </VechicleArrayContextProvider>
  );
}

export default App;

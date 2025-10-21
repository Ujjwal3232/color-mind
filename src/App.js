import React, { Component } from 'react';
import { Route, Routes, useParams } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

// ✅ Wrapper functional component to access useParams
const PaletteWithParams = () => {
  const { id } = useParams();
  
  const findPalette = (id) => {
    return seedColors.find(palette => palette.id === id);
  };

  return (
    <Palette 
      palette={generatePalette(findPalette(id))}
    />
  );
};

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PaletteList palettes={seedColors}/>} />
        <Route path="/palette/:id" element={<PaletteWithParams />} />
      </Routes>
    );
  }
}

export default App;
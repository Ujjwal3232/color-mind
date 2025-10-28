import React, { Component } from 'react';
import { Route, Routes, useParams } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

// ✅ Wrapper for /palette/:id
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

// ✅ Wrapper for /palette/:paletteId/:colorId
const SingleColorPaletteWrapper = () => {
  const { paletteId, colorId } = useParams();

  const findPalette = (id) => {
    return seedColors.find(palette => palette.id === id);
  };

  const palette = generatePalette(findPalette(paletteId));

  return (
    <SingleColorPalette
      palette={palette}
      colorId={colorId} // pass colorId to filter single color
    />
  );
};

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PaletteList palettes={seedColors} />} />
        <Route path="/palette/:id" element={<PaletteWithParams />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPaletteWrapper />}
        />
      </Routes>
    );
  }
}

export default App;

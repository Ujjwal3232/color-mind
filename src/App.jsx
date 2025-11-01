import React, { Component } from 'react';
import { Route, Routes, useParams } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

// ✅ Wrapper for /palette/:id
const PaletteWithParams = () => {
  const { id } = useParams();
  const findPalette = (id) => seedColors.find(palette => palette.id === id);

  return <Palette palette={generatePalette(findPalette(id))} />;
};

// ✅ Wrapper for /palette/:paletteId/:colorId
const SingleColorPaletteWrapper = () => {
  const { paletteId, colorId } = useParams();
  const findPalette = (id) => seedColors.find(palette => palette.id === id);
  const palette = generatePalette(findPalette(paletteId));

  return <SingleColorPalette palette={palette} colorId={colorId} />;
};

class App extends Component {
  render() {
    return (
      <Routes>
        {/* ✅ New Palette Form Route */}
        <Route path="/palette/new" element={<NewPaletteForm />} />
{/*its order matter in v5 not in  v6 */}

        {/* Existing Routes */}
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

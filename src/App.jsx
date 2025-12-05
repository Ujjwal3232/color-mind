import React, { Component } from 'react';
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

// Wrapper for /palette/new
const NewPaletteFormWrapper = ({ palettes, handleSubmit }) => {
  const navigate = useNavigate();
  return (
    <NewPaletteForm
      palettes={palettes}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
};

// Wrapper for /palette/:id
const PaletteWithParams = ({ findPalette }) => {
  const { id } = useParams();
  const palette = findPalette(id);

  if (!palette) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>Palette not found!</h2>;
  }

  return <Palette palette={generatePalette(palette)} />;
};

// Wrapper for /palette/:paletteId/:colorId
const SingleColorPaletteWrapper = ({ findPalette }) => {
  const { paletteId, colorId } = useParams();
  const palette = findPalette(paletteId);

  if (!palette) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>Palette not found!</h2>;
  }

  const generatedPalette = generatePalette(palette);
  return <SingleColorPalette palette={generatedPalette} colorId={colorId} />;
};

class App extends Component {
  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

    this.state = {
      palettes: savedPalettes || seedColors
    };

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);   // ✅ ADDED
  }

  // Save palette
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  // Delete palette
  deletePalette(id) {
    this.setState(
      {
        palettes: this.state.palettes.filter(p => p.id !== id)
      },
      this.syncLocalStorage
    );
  }

  // Sync with localStorage
  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  // Find palette
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id);
  }

  render() {
    return (
      <Routes>
        {/* New Palette */}
        <Route
          path="/palette/new"
          element={
            <NewPaletteFormWrapper
              palettes={this.state.palettes}
              handleSubmit={this.savePalette}
            />
          }
        />

        {/* Home: Palette List */}
        <Route
          path="/"
          element={
            <PaletteList
              palettes={this.state.palettes}
              deletePalette={this.deletePalette}   // ✅ FIXED
            />
          }
        />

        {/* Full Palette */}
        <Route
          path="/palette/:id"
          element={<PaletteWithParams findPalette={this.findPalette} />}
        />

        {/* Single Color Palette */}
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPaletteWrapper findPalette={this.findPalette} />}
        />
      </Routes>
    );
  }
}

export default App;

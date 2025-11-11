import React, { Component } from 'react';
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

// ✅ Wrapper for /palette/new to inject navigate (no `this` usage here)
const NewPaletteFormWrapper = ({ palettes, handleSubmit }) => {
  const navigate = useNavigate();
  return <NewPaletteForm palettes={palettes} handleSubmit={handleSubmit} navigate={navigate} />;
};

// ✅ Wrapper for /palette/:id (fetch palette by id)
const PaletteWithParams = ({ findPalette }) => {
  const { id } = useParams();
  const palette = findPalette(id);

  // 🛡 Safety check: handle invalid IDs gracefully
  if (!palette) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>Palette not found!</h2>;
  }

  return <Palette palette={generatePalette(palette)} />;
};

// ✅ Wrapper for /palette/:paletteId/:colorId (fetch color from palette)
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
    this.state = { palettes: seedColors };

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  // ✅ Save new palette to state
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }

  // ✅ Find palette by id
  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }

  render() {
    return (
      <Routes>
        {/* ✅ New Palette Form Route */}
        <Route
          path="/palette/new"
          element={
            <NewPaletteFormWrapper
              palettes={this.state.palettes}
              handleSubmit={this.savePalette}
            />
          }
        />

        {/* ✅ Palette List Route */}
        <Route
          path="/"
          element={<PaletteList palettes={this.state.palettes} />}
        />

        {/* ✅ Palette View Route */}
        <Route
          path="/palette/:id"
          element={<PaletteWithParams findPalette={this.findPalette} />}
        />

        {/* ✅ Single Color Palette Route */}
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPaletteWrapper findPalette={this.findPalette} />}
        />
      </Routes>
    );
  }
}

export default App;

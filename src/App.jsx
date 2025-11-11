import React, { Component } from 'react';
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

// ✅ Wrapper for /palette/new to inject navigate
const NewPaletteFormWrapper = (props) => {
  const navigate = useNavigate();
  return <NewPaletteForm {...props} navigate={navigate} />;
};

// ✅ Wrapper for /palette/:id (fetch palette by id)
const PaletteWithParams = ({ findPalette }) => {
  const { id } = useParams();
  const palette = findPalette(id);
  return <Palette palette={generatePalette(palette)} />;
};

// ✅ Wrapper for /palette/:paletteId/:colorId (fetch color from palette)
const SingleColorPaletteWrapper = ({ findPalette }) => {
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(findPalette(paletteId));
  return <SingleColorPalette palette={palette} colorId={colorId} />;
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
          element={<NewPaletteFormWrapper handleSubmit={this.savePalette} />}
        />

        {/* its order matter in v5 not in v6 */}

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

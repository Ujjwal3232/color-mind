// src/App.jsx
import React, { Component } from 'react';  
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import Register from './Register';
import Login from './Login';
import Navbar from './Navbar';
import * as paletteService from './api/paletteService';

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

  if (!palette) return <h2 style={{ color: 'red', textAlign: 'center' }}>Palette not found!</h2>;

  return <Palette palette={generatePalette(palette)} />;
};

// Wrapper for /palette/:paletteId/:colorId
const SingleColorPaletteWrapper = ({ findPalette }) => {
  const { paletteId, colorId } = useParams();
  const palette = findPalette(paletteId);

  if (!palette) return <h2 style={{ color: 'red', textAlign: 'center' }}>Palette not found!</h2>;

  return <SingleColorPalette palette={generatePalette(palette)} colorId={colorId} />;
};

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: [],               // palettes from MongoDB
      isLoggedIn: !!localStorage.getItem("token"),
    };

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.fetchPalettes = this.fetchPalettes.bind(this);
  }

  componentDidMount() {
    if (this.state.isLoggedIn) this.fetchPalettes();
  }

  // Fetch all palettes from MongoDB
  async fetchPalettes() {
    try {
      const palettes = await paletteService.fetchPalettes();
      console.debug('fetchPalettes -> loaded', palettes.length, 'palettes');
      this.setState({ palettes });
    } catch (err) {
      console.error("Failed to fetch palettes from server", err);
      this.setState({ palettes: [] });
    }
  }

  // Save new palette to MongoDB
  async savePalette(newPalette) {
    try {
      const savedPalette = await paletteService.createPalette(newPalette);
      console.debug('savePalette -> saved', savedPalette);
      this.setState({ palettes: [...this.state.palettes, savedPalette] });
    } catch (err) {
      console.error("Failed to save palette", err);
    }
  }

  // Delete palette
  async deletePalette(id) {
    try {
      await paletteService.deletePalette(id);
      this.setState({ palettes: this.state.palettes.filter(p => p.id !== id && p._id !== id) });
    } catch (err) {
      console.error("Failed to delete palette", err);
    }
  }

  // Find palette by ID
  findPalette(id) {
    const found = this.state.palettes.find((p) => p.id === id || p._id === id);
    if (!found) console.debug('findPalette -> not found', id, this.state.palettes.length, 'palettes');
    return found;
  }

  handleLogin(token) {
    localStorage.setItem("token", token);
    this.setState({ isLoggedIn: true }, this.fetchPalettes);
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false, palettes: [] });
  }

  render() {
    const location = window.location.pathname;
    // Only show Navbar on palette view pages: /palette/:id and /palette/:paletteId/:colorId
    // Exclude /palette/new
    const isPaletteView = /^\/palette\/(?!new)(.+)/.test(location);
    const showNavbar = this.state.isLoggedIn && isPaletteView;

    return (
      <>
        {showNavbar && <Navbar handleLogout={this.handleLogout} />}

        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={this.handleLogin} />} />

          {/* Protected Routes */}
          <Route
            path="/palette/new"
            element={
              <PrivateRoute>
                <NewPaletteFormWrapper
                  palettes={this.state.palettes}
                  handleSubmit={this.savePalette}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PaletteList
                  palettes={this.state.palettes}
                  deletePalette={this.deletePalette}
                  handleLogout={this.handleLogout}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <PrivateRoute>
                <PaletteWithParams findPalette={this.findPalette} />
              </PrivateRoute>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <PrivateRoute>
                <SingleColorPaletteWrapper findPalette={this.findPalette} />
              </PrivateRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }
}

export default App;

// src/PaletteList.jsx
import React, { Component } from 'react';  
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import { useNavigate, Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  // Navigate to the selected palette
  goToPalette(id) {
    this.props.navigate(`/palette/${id}`);
  }

  render() {
    const { palettes, classes, deletePalette, handleLogout } = this.props;
    console.debug('PaletteList -> palettes count:', palettes && palettes.length, palettes && palettes.slice(0,2));

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Your Palettes</h1>

            {/* Buttons container */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              
              {/* Logout button */}
              {handleLogout && (
                <button
                  onClick={() => {
                    handleLogout();                 // Call App's logout handler
                    this.props.navigate("/login");  // Redirect to login page
                  }}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Logout
                </button>
              )}

              {/* Create New Palette button */}
              <Link
                to="/palette/new"
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px"
                }}
              >
                Create New
              </Link>

            </div>
          </nav>

          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette._id || palette.id}   // MongoDB _id or fallback to id
                id={palette._id || palette.id}
                paletteName={palette.paletteName}
                emoji={palette.emoji}
                colors={palette.colors}
                handleClick={() => this.goToPalette(palette._id || palette.id)}
                deletePalette={deletePalette}      // Calls App.jsx deletePalette
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// Wrapper to inject navigate
const PaletteListWithNavigate = (props) => {
  const navigate = useNavigate();
  return <PaletteList {...props} navigate={navigate} />;
};

export default withStyles(styles)(PaletteListWithNavigate);

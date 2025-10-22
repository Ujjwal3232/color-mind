import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from "react-router-dom";
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    
  },

  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },

  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    marginBottom: "1rem"  // ✅ adds spacing between title and palettes
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  },
};

class PaletteList extends Component {
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {/* ✅ Title stays on top */}
          <nav className={classes.nav}>
            <h1>Your Palettes</h1>
          </nav>

          {/* ✅ Palettes grid below the title */}
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette} // passes paletteName, emoji, colors, etc.
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);

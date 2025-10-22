import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

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
    marginBottom: "1rem"
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
  goToPalette(id) {
    this.props.navigate(`/palette/${id}`); // ✅ works in v6
  }

  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Your Palettes</h1>
          </nav>

          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// ✅ Wrapper function to pass `navigate` prop to class component
const PaletteListWithNavigate = (props) => {
  const navigate = useNavigate();
  return <PaletteList {...props} navigate={navigate} />;
};

export default withStyles(styles)(PaletteListWithNavigate);

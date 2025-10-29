import React, { Component } from "react";
import ColorBox from "./ColorBox";
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@mui/styles';
import "rc-slider/assets/index.css";
import "./Palette.css";
import Navbar from "./Navbar";

const styles={
   Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  PaletteColors: {
    height: "90%",
  },

  PaletteFooter: {
    backgroundColor: "white",
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },

  emoji: {
    fontSize: "1.5rem",
    margin: "0 1rem",
  },
  
}

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 , format:"hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(val) {
    this.setState({ format : val});
  }
  render() {
    const { colors,paletteName,emoji,id} = this.props.palette;
     const {classes}=this.props;
    const { level ,format } = this.state;
    const colorBoxes = colors[level].map((color) => (
    <ColorBox 
      background={color[format]} 
      name={color.name} 
      key={color.id} 
      id={color.id}
      paletteId={id}
      showingFullPalette={true}   // show "More"
    />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors 
        />
        {/* Navbar goes here */}
        <div className={classes.PaletteColors}>
          {colorBoxes}
          {/* Bunch of colors boxes */}
        </div>
        {/* footer */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);

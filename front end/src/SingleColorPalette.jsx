import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import { withStyles } from '@mui/styles';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import styles from "./styles/PaletteStyles"



 class SingleColorPalette extends Component {
  constructor(props){
          super(props);
          this._shades= this.gatherShades(this.props.palette,this.props.colorId);
          this.state = {  format:"hex" };
          this.changeFormat = this.changeFormat.bind(this);
        
  }
  gatherShades(palette,colorToFilterBy){
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
     
      shades= shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    //return all shades of the color
    return shades.slice(1);
  }

  changeFormat(val) {
    this.setState({ format : val});
  }
  render() {
    const {format} = this.state;
    const {paletteName,emoji,id}= this.props.palette;
    const {classes}=this.props;
    const ColorBoxes = this._shades.map(color=> (
        <ColorBox 
         key={color.name}  
         name={color.name}  
         background={color[format]}
         showingFullPalette={false}   // hide "More"
         />
      ));
    return (
      
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors ={false} />
        <h1> {this.props.colorId.toUpperCase()} Shades 😎 </h1>
        <div className={classes.PaletteColors}>
          {ColorBoxes}
        <div className={classes.goBack}>
           <Link to={`/palette/${id}`} >Go Back</Link>
        </div>  
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);

import React from 'react';
import { withStyles } from '@mui/styles';
import { borderRadius, color, display, height, margin, width } from '@mui/system';
import styles from "./styles/MiniPaletteStyles"



function MiniPalette(props) {
  const { classes, paletteName, emoji ,colors} = props; // ✅ use paletteName instead of name
  const miniColorBoxes = colors.map(color=>(
     <div 
     className={classes.miniColor}
     style={{backgroundColor: color.color}}
     key={color.name}
     />
  )) ; 

  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
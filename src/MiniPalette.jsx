import React from 'react';
import { withStyles } from '@mui/styles';
import styles from "./styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { 
    classes, 
    paletteName, 
    emoji, 
    colors, 
    id, 
    deletePalette, 
    handleClick 
  } = props;

  const handleDelete = (e) => {
    e.stopPropagation();      // ❌ prevents navigation
    deletePalette(id);        // 🗑️ delete palette
  };

  const miniColorBoxes = colors.map(color => (
    <div 
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      
      {/* 🔴 DELETE BUTTON */}
      <div className={classes.delete} onClick={handleDelete}>
        <div className={classes.trash}>
          <div className={classes.lid}></div>
          <div className={classes.can}></div>
        </div>
      </div>

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

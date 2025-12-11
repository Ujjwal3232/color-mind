import React from 'react'; 
import { withStyles } from '@mui/styles';
import styles from "./styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { 
    classes, 
    paletteName, 
    emoji, 
    colors = [],  // ✅ default to empty array
    id, 
    deletePalette, 
    handleClick 
  } = props;

  // Debug: log incoming colors to help diagnose rendering issues
  console.debug('MiniPalette', id, 'colors:', colors && colors.length);

  // Normalize color items so component tolerates different shapes
  const normalizedColors = (colors || []).map((c, idx) => {
    if (typeof c === 'string') return { name: `color-${idx}`, color: c };
    if (c && (c.color || c.hex || c.value)) {
      return { name: c.name || c.color || `color-${idx}`, color: c.color || c.hex || c.value };
    }
    return { name: c && c.name ? c.name : `color-${idx}`, color: c && c.color ? c.color : '' };
  });
  console.debug('MiniPalette normalizedColors sample ->', normalizedColors.slice(0, 6));

  const handleDelete = (e) => {
    e.stopPropagation();      // prevents navigation
    deletePalette(id);        // delete palette
  };

  const miniColorBoxes = normalizedColors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      {/* DELETE BUTTON */}
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

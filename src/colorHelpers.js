import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };

  // Initialize color levels
  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  // Generate color scales for each base color
  for (let color of starterPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();

    for (let i in scale) {
      // Format RGB and RGBA properly with commas
      const rgb = chroma(scale[i])
        .css()
        .replaceAll(" ", ", ");

      const rgba = chroma(scale[i])
        .css()
        .replace("rgb(", "rgba(")
        .replace(")", ", 1.0)")
        .replaceAll(" ", ", ");

      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb,
        rgba
      });
    }
  }

  return newPalette;
}

// This returns [darker shade → original color → white]
function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

// Generate 10 gradient shades between darkened → base → white
function generateScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette };

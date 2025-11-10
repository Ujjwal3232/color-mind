import React from 'react';
import { styled } from '@mui/material/styles';

const Box = styled('div')(({ theme, color }) => ({
  backgroundColor: color,
  width: "20%",
  height: "25%",
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-3.5px",
}));

export default function DraggableColorBox({ color }) {
  return <Box color={color}>{color}</Box>;
}

// DraggableColorBox.jsx
import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ------------------  STYLING (adjusted so Box fills wrapper)  ------------------
const Box = styled("div")(({ theme, color }) => ({
  backgroundColor: color,
  width: "100%",      // fill wrapper width
  height: "100%",     // fill wrapper height
  margin: "0 auto",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  marginBottom: "-3.5px",
  color: "black",
}));

const BoxContent = styled("div")({
  position: "absolute",
  padding: "10px",
  width: "100%",
  left: "0px",
  bottom: "0px",
  color: "rgba(0,0,0,0.5)",
  letterSpacing: "1px",
  textTransform: "uppercase",
  fontSize: "12px",
  display: "flex",
  justifyContent: "space-between",
});

const StyledDeleteIcon = styled(DeleteRoundedIcon)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    color: "white",
    opacity: "0.7",
    transform: "scale(1.5)",
  },
}));

// ------------------  FUNCTION WRAPPER FOR DND-KIT  ------------------
function DraggableWrapper(props) {
  // useSortable needs a unique id — using color name (same as before)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.name });

  const wrapperStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    display: "inline-block",   // preserve original inline-block flow
    verticalAlign: "top",      // align rows correctly
    width: "20%",              // same as original intended size
    height: "25%",             // same as original intended size
  };

  // Note: attributes/listeners are attached to wrapper; delete icon stops propagation.
  return (
    <div ref={setNodeRef} style={wrapperStyle} {...attributes} {...listeners}>
      <DraggableColorBox {...props} />
    </div>
  );
}

// ------------------  ORIGINAL CLASS COMPONENT  ------------------
class DraggableColorBox extends Component {
  render() {
    const { color, name, handleClick } = this.props;
    return (
      <Box color={color}>
        <BoxContent>
          <span>{name}</span>

          {/* Prevent drag start / bubbling and then run delete */}
          <StyledDeleteIcon
            onPointerDown={(e) => {
              // prevents dnd-kit from starting a drag when user presses the icon
              e.stopPropagation();
            }}
            onClick={(e) => {
              // prevent click bubble reaching dnd-kit listeners and then call handler
              e.stopPropagation();
              handleClick && handleClick();
            }}
          />
        </BoxContent>
      </Box>
    );
  }
}

export default DraggableWrapper;

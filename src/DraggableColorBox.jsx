import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Box = styled("div")(({ theme, color }) => ({
  backgroundColor: color,
  width: "20%",
  height: "25%",
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
       display:"flex",
       justifyContent:"space-between"
});

const StyledDeleteIcon = styled(DeleteRoundedIcon)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    color: "white",
    opacity:"0.7",
    transform: "scale(1.5)",
  },
}));





class DraggableColorBox extends Component {
  

  render() {
    const { color, name } = this.props;
    return (
      <Box color={color}>
        <BoxContent>
          <span>{name}</span>
          <span><StyledDeleteIcon /></span>
        </BoxContent>
      </Box>
    );
  }
}

export default DraggableColorBox;

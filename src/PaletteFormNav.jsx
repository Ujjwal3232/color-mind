import React, { Component } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PaletteIcon from "@mui/icons-material/Palette";
import BrushIcon from "@mui/icons-material/Brush";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { DRAWER_WIDTH } from "./styles/constants";

const drawerWidth = DRAWER_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  // Replace the old submitLocal method with this
   submitLocal = (paletteData) => {
     // paletteData is an object: { paletteName: "...", emoji: "..." }
     this.props.handleSubmit(paletteData);
   };


  render() {
    const { open, handleDrawerOpen } = this.props;

    return (
      <div>
        <CssBaseline />

        <AppBar
        position="fixed"
        open={open}
        sx={{
        backgroundColor: "#562156",
        border: "1px solid #A9DEA9",
        borderRadius: "0 0 10px 10px",
        opacity: 0.95,
         }}
        >

          <Toolbar>

            {/* Drawer Button */}
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(open && { display: "none" }),
                "& svg": {
                  color: "#A9DEA9", // sky blue icon
                  filter: `
                    drop-shadow(0 0 4px #000000)
                    drop-shadow(0 0 8px #A9DEA9)
                  `,
                },
              }}
            >
              <PaletteIcon sx={{ fontSize: 26 }} />
             <BrushIcon sx={{ fontSize: 16, ml: -1, mt: 1 }} />
            </IconButton>

            {/* Left Heading */}
            <Typography variant="h6" noWrap component="div">
              New Palette
            </Typography>

            {/* FLEX SPACE — pushes buttons to the right */}
            <div style={{ flexGrow: 1 }} />

            {/* RIGHT BUTTON GROUP */}
            <div style={{ display: "flex", gap: "10px", width: "260px" }}>
              <PaletteMetaForm handleSubmitPalette={this.submitLocal} />

              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/"
                style={{ textDecoration: "none", color: "white", flex: 1 }}
              >
                Go Home
              </Button>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

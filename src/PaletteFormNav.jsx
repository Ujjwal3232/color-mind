import React, { Component } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 400;

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

  submitLocal(name) {
    this.props.handleSubmit(name);
  }


  render() {
    const { open, handleDrawerOpen } = this.props;

    return (
      <div>
        <CssBaseline />

        <AppBar position="fixed" open={open} color="default">
          <Toolbar>

            {/* Drawer Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
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

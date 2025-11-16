import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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

  submitLocal() {
    this.props.handleSubmit(this.state.newPaletteName);
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

            <Typography variant="h6" noWrap component="div">
              New Palette
            </Typography>

            {/* Palette Name + Save */}
            <ValidatorForm
              onSubmit={this.submitLocal}
              style={{ marginLeft: "auto", display: "flex", gap: "10px" }}
            >
              <TextValidator
                name="newPaletteName"
                label="Palette Name"
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />

              <Button variant="contained" color="success" type="submit" size="small">
                Save Palette
              </Button>

             <Button
               variant="contained"
               color="secondary"
               component={Link}
               to="/"
               style={{ textDecoration: "none", color: "white" }}
             >
               Go Home
             </Button>


            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

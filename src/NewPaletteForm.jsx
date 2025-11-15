import React, { Component } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList";
import { ChromePicker } from 'react-color';

const drawerWidth = 400;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  height: "100vh",
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// 🌈 Converted functional logic to class-based
export default class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      direction: 'ltr', // manually manage theme direction
      currentColor: 'teal',
      newColorName: "",
      colors: [],
      newPaletteName: ""
    };

    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);

  }

  componentDidMount() {
    // ✅ Rule for unique color name
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    // ✅ Rule for unique color value
    ValidatorForm.addValidationRule('isColorUnique', () =>
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );

    // ✅ Rule for unique palette name
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  addNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({ colors: [...this.state.colors, newColor] });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit() {
    let newName = this.state.newPaletteName;

    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };

    this.props.handleSubmit(newPalette);
    this.props.navigate("/");
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }
  onSortEnd = (newColors) => {
  this.setState({ colors: newColors });
};
  render() {
    const { open, direction } = this.state;
    const theme = createTheme({ direction });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppBar position="fixed" open={open} color="default">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" noWrap component="div">
                New Palette Form
              </Typography>

              <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator
                  name="newPaletteName"
                  label="Palette Name"
                  value={this.state.newPaletteName}
                  onChange={this.handleChange}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['Enter Palette Name', 'Name already used']}
                />

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  type="submit"
                >
                  Save Palette
                </Button>
              </ValidatorForm>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>

            <Divider />

            <Typography variant="h4">
              Design Your Palette
            </Typography>

            <div>
              <Button variant="contained" color="secondary">
                Clear Palette
              </Button>
              <Button variant="contained" color="primary">
                Random Color
              </Button>
            </div>

            <ChromePicker
              color={this.state.currentColor}
              onChangeComplete={this.updateCurrentColor}
            />

            <ValidatorForm onSubmit={this.addNewColor}>
              <TextValidator
                value={this.state.newColorName || ""}
                name="newColorName"
                onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={[
                  '⚠️ This field is required',
                  'Color name must be unique 🤐',
                  'Color already used 😬'
                ]}
              />

              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: this.state.currentColor }}
                type="submit"
              >
                Add Color
              </Button>
            </ValidatorForm>
          </Drawer>

          <Main open={open}>
            <DrawerHeader />

            <DraggableColorList
             colors={this.state.colors}
             removeColor={this.removeColor}
             onSortEnd={this.onSortEnd}
            />
          </Main>
        </Box>
      </ThemeProvider>
    );
  }
}

import React, { Component } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList";


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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 50
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      direction: 'ltr',
      currentColor: 'teal',
      newColorName: "",
      colors: this.props.palettes[0].colors,
      newPaletteName: ""
    };

    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  componentDidMount() {

    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule('isColorUnique', () =>
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );

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
    this.setState({ [evt.target.name]: evt.target.value });
  }

  clearColors() {
    this.setState({ colors: [] });
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor] });
  }

  handleSubmit(paletteNameFromNav) {
    const finalName = paletteNameFromNav;
    const newPalette = {
      paletteName: finalName,
      id: finalName.toLowerCase().replace(/ /g, "-"),
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
    const { open, direction, colors } = this.state;
    const { maxColors } = this.props;
    const theme = createTheme({ direction });
    const paletteFull = colors.length >= maxColors;

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          {/* FIXED — Props passed correctly */}
          <PaletteFormNav
            open={open}
            palettes={this.props.palettes}
            handleDrawerOpen={this.handleDrawerOpen}
            handleSubmit={this.handleSubmit}
          />

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
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
              >
                Clear Palette
              </Button>

              <Button
                variant="contained"
                color={paletteFull ? "grey" : "primary"}
                onClick={this.addRandomColor}
                disabled={paletteFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteFull={paletteFull}
              currentColor={this.state.currentColor}
              addNewColor={this.addNewColor}
              updateCurrentColor={this.updateCurrentColor}
              newColorName={this.state.newColorName}
              handleChange={this.handleChange}
            />

            
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

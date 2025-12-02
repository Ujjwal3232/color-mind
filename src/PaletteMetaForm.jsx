import React, { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";



export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newPaletteName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return this.props.palettes.every(
        (palette) =>
          palette.paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit() {
    this.props.handleSubmitPalette(this.state.newPaletteName);
    this.handleClose();
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open, newPaletteName } = this.state;

    return (
      <>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Save Palette
        </Button>

        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Choose a Palette Name</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter a unique name for your new color palette.
            </DialogContentText>
            <Picker data={data} onEmojiSelect={(emoji) => console.log(emoji)} />


            {/* VALIDATION FORM */}
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                fullWidth
                margin="normal"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />

              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button variant="contained" color="success" type="submit">
                  Save Palette
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

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
      stage: "", // "", "form", "emoji"
      newPaletteName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleClickOpen = () => {
    this.setState({ stage: "form" });
  };

  closeAll = () => {
    this.setState({ stage: "" });
  };

  showEmojiPicker = () => {
    this.setState({ stage: "emoji" });
  };

  savePalette(emojiObj) {
    const newPalette = {
      paletteName: this.state.newPaletteName.trim(),
      emoji: emojiObj.native,
    };

    // ⬇️ Send full object upward
    this.props.handleSubmitPalette(newPalette);

    this.closeAll();
  }

  render() {
    const { newPaletteName, stage } = this.state;

    return (
      <>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Save Palette
        </Button>

        {/* NAME ENTRY DIALOG */}
        <Dialog open={stage === "form"} onClose={this.closeAll}>
          <DialogTitle>Choose a Palette Name</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter a unique name for your new color palette.
            </DialogContentText>

            <ValidatorForm onSubmit={this.showEmojiPicker}>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                fullWidth
                margin="normal"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Name already used",
                ]}
              />

              <DialogActions>
                <Button onClick={this.closeAll}>Cancel</Button>
                <Button variant="contained" color="success" type="submit">
                  Next
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>

        {/* EMOJI PICKER DIALOG */}
        <Dialog open={stage === "emoji"} onClose={this.closeAll}>
          <DialogTitle>Choose an Emoji</DialogTitle>
          <Picker data={data} onEmojiSelect={this.savePalette} />
        </Dialog>
      </>
    );
  }
}

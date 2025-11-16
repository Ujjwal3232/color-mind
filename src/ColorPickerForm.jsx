import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';

export default class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: this.props.currentColor,
      newColorName: ""
    };

    this.updateColor = this.updateColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateColor(newColor) {
    this.setState({ currentColor: newColor.hex });
    this.props.updateCurrentColor(newColor);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    this.props.handleChange(evt);
  }

  handleSubmit() {
    this.props.addNewColor({
      color: this.state.currentColor,
      name: this.state.newColorName
    });
    this.setState({ newColorName: "" });
  }

  render() {
    const { paletteFull } = this.props;

    return (
      <div style={{ padding: "1rem" , alignItems:"center",justifyContent:"center"}}>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.updateColor}
        />

        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            value={this.state.newColorName}
            name="newColorName"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color already used'
            ]}
            style={{ width: "100%", marginTop: "1rem" }}
            placeholder="Color Name"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={paletteFull}
            style={{
              backgroundColor: paletteFull ? "grey" : this.state.currentColor,
              width: "100%",
              marginTop: "1rem"
            }}
          >
            {paletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

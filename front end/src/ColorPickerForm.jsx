import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// ⭐ New styled TextValidator
const InputField = styled(TextValidator)(({ theme }) => ({
  width: "100%",
  height: "70px",
  marginTop: theme.spacing(2)
}));

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
      <div style={{ padding: "1rem", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateColor}
          />
        </div>


        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <InputField
            value={this.state.newColorName}
            name="newColorName"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color already used'
            ]}
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
